import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Editor(){
    useEffect(() =>{
        const fetchdata = async () =>{
            const token = localStorage.getItem("token")

            const response = await axios.get(
                "http://127.0.0.1:8000/",
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
        }

        fetchdata()
    },[])


    const navigate = useNavigate()

    const logout = ()=>{
        localStorage.removeItem("token")
        navigate("/signin")
    }

    return(
        <>
        
        <h1>hay</h1>
        <h1>hay</h1>
        <h1>hay</h1>
        <h1>hay</h1>
        </>
    )
}