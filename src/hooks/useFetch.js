import { useState, useEffect } from "react";

let failCount = 0;
const useFetch=(url, interval=null)=>{
    const [mails, setMails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    const fetchData = async()=>{
        try{
            const res =await fetch(url);
            if(!res.ok) throw new Error("Network response was not ok");
            const data = await res.json();
            setMails(data);
            failCount = 0;
        }catch(error){
            failCount++
            setError(error.message);
            if(failCount>=7)clearInterval(id);
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchData();
        if(interval){
            const id = setInterval(fetchData, interval);
            return ()=> clearInterval(id);
        }
    }, [url]);

    return {mails, loading, error, refetch:fetchData};
}

export default  useFetch;