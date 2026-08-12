import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProjectItem from "./projectItems"
import { Create_new_project } from "../dropdowns/new_project";
import fileContext from "../../context/FileContext";

export default function Sidebar() {

    // All projects
    const {projects,setProjects} = useContext(fileContext)
    const{selectedFile,setSelectedFile} = useContext(fileContext)

    // Get projects from backend
    useEffect(() => {

        const fetchProjects = async () => {

            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://127.0.0.1:8000/get_projects",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setProjects(response.data);

                console.log("Projects:", response.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchProjects();

    }, []);


    return (
        <aside className="flex flex-col h-full bg-black text-white w-70">

            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800">

                <h2 className="font-semibold uppercase tracking-wider text-sm">
                    Explorer
                </h2>

                 <Create_new_project/>

            </div>


            {/* Projects */}
            <div className="flex-1 overflow-y-auto">

                {projects.map((project) => (

                    <ProjectItem
                        key={project.id}
                        project={project}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                    />

                ))}

            </div>


            {/* Footer */}
            <div className="border-t border-gray-800 p-3 text-xs text-gray-500">

                Projects: {projects.length}

            </div>

        </aside>
    );
}