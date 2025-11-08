import { useState } from "react";

const useMailApi = (baseUrl) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMail = async (path, data)=>{
        setLoading(true);
        try{
            const res  = await fetch(`${baseUrl}/${path}.json`,{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data),
            });
            if(!res.ok) throw new Error("Failed to send mail")

        }catch(error){
            setError(error.message);
            throw error
        }finally{
            setLoading(false);
        }
    };

    const markAsRead = async(path)=>{
        try{
            await fetch(`${baseUrl}/${path}.json`,{
                method:"PATCH",
                headers:{'Content-type':'application/json'},
                body: JSON.stringify({read:true}),
            });
        }catch(err){
            setError(err.message);
            console.error("Mark as Read Error:", err);
        }
    };
    return {sendMail, markAsRead, loading, error};
};

export default useMailApi;