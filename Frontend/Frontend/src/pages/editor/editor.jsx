import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar/navbar";
import {Create_new_project} from "../../components/dropdowns/new_project";
import Sidebar from "../../components/sidebar/sidebar";

export default function Editor(){
    useEffect(() =>{
        const fetchdata = async () =>{
            const token = localStorage.getItem("token")

            console.log("the token is saved")


            const response = await axios.get(
                console.log("Enter in axios block"),

                "http://127.0.0.1:8000/protected",
                console.log("called the api"),
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                },
                console.log("come out from the headers")
            )
            console.log("come out from the fetchdata function")

        }

        fetchdata()
    },[])


    const navigate = useNavigate()

    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")

        navigate("/signin")
    }

    const [open,setopen] = useState(false)

    return(
        <>
            <Navbar
            onNewproject={()=>{
                console.log(' i got clicked')
               return setopen(true)
            }
                }/>

            <div className="flex h-screen">

      <Sidebar />

      <main className="flex-1 bg-[#252526]">

        {/* Monaco Editor */}

      </main>

    </div>
        </>
    )
}