import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar/navbar";
import {Create_new_project} from "../../components/dropdowns/new_project";
import Sidebar from "../../components/sidebar/sidebar";
import EditorArea from "../../components/editor/editorArea";
import fileContext from "../../context/FileContext";


export default function Editor(){
    const [FileName,setFileName] = useState("")

    // Currently selected file
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() =>{
        const fetchdata = async () =>{
            const token = localStorage.getItem("token")

            const response = await axios.get(
                console.log("Enter in axios block"),

                "http://127.0.0.1:8000/protected",
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                },
            )
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


    <fileContext.Provider
    value={
        {
        FileName,
        setFileName,
        selectedFile,
        setSelectedFile
        }
        }>
        <div className="flex h-screen">

      <Sidebar />

      <main className="flex-1 bg-[#252526]">
            <EditorArea FileName={FileName}/>

      </main>

    </div>
    </fileContext.Provider>

    
        </>
    )
}