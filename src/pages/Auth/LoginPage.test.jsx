import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { afterEach, beforeEach, expect } from "vitest";
import '@testing-library/jest-dom'
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { MemoryRouter } from "react-router-dom";

beforeEach(()=>{
    global.fetch = vi.fn();
})
afterEach(()=>{
    vi.restoreAllMocks()
});

function renderComponent( ui ){
    return(render(<Provider store={store}>
                <MemoryRouter>
                    {ui}
                </MemoryRouter>
            </Provider>))
}
test("renders form inputs and button",()=>{
    renderComponent(<LoginPage/>);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button",{name:/login/i})).toBeInTheDocument();
});

test("Cannot proceed without filling the details",()=>{
    renderComponent(<LoginPage />);

    const button = screen.getByRole("button", { name: /login/i });
    fireEvent.click(button);

    expect(screen.queryByText(/login successful/i)).not.toBeInTheDocument();

    expect(screen.getByPlaceholderText(/enter your email/i)).toHaveValue("");
    expect(screen.getByPlaceholderText(/enter your password/i)).toHaveValue("");
})

test("Shows Error message for invalid credentials",async()=>{
    global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({
            error: { message: "INVALID_LOGIN_CREDENTIALS" },
        }),
    });

    renderComponent(<LoginPage/>);

    fireEvent.change(screen.getByLabelText(/email/i), {target:{value:"test@testcom"}});
    fireEvent.change(screen.getByLabelText(/password/i), {target:{value:"123456"}});
    fireEvent.click(screen.getByRole("button",{name:/login/i}));

    const errorElement = await screen.findByText(
        /The user has either entered wrong email or password/i
    );
    expect(errorElement).toBeInTheDocument();

})

test("Successfully login after entering correct credentials",async()=>{
    global.fetch.mockResolvedValueOnce({
        ok:true,
        json:async()=>({
            token: 'aBcDeFg1234567890', 
            userId: 'user-123',
        }),
    });

    renderComponent(<LoginPage/>);

    fireEvent.change(screen.getByLabelText(/email/i), {target:{value:"test@test.com"}});
    fireEvent.change(screen.getByLabelText(/password/i), {target:{value:"123456"}});
    fireEvent.click(screen.getByRole("button",{name:/login/i}));

    const successElement = await screen.findByText(
        /Login Successful/i 
    );
    expect(successElement).toBeInTheDocument();
})