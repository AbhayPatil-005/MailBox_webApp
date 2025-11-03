import {render, screen, fireEvent} from "@testing-library/react";
import SignUpPage from "./SignUpPage";
import { afterEach, beforeEach } from "vitest";

beforeEach(()=>{
    global.fetch = vi.fn();
});
afterEach(()=>{
    vi.restoreAllMocks();
});

test("renders form inputs and submit button", ()=>{
    render(<SignUpPage/>);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", {name:/submit/i})).toBeInTheDocument();
});


test("shows EMAIL_EXISTS error from API", async () => {
  global.fetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({
      error: { message: "EMAIL_EXISTS" },
    }),
  });

  render(<SignUpPage />);
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "existing@gmail.com" } });
  fireEvent.change(screen.getByPlaceholderText(/^password$/i), { target: { value: "123456" } });
  fireEvent.change(screen.getByPlaceholderText(/confirm password/i), { target: { value: "123456" } });
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(await screen.findByText(/already registered/i)).toBeInTheDocument();
});