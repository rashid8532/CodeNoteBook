import { useContext, useState } from "react";
import axios from "axios";
import { Create_new_file } from "../dropdowns/new_file";
import FileItem from "./fileItems";
import fileContext from "../../context/FileContext";

export default function ProjectItem({
    project,
    selectedFile,
}) {
    const {setSelectedFile,setFileName} = useContext(fileContext)

    const [open, setOpen] = useState(false);

    const [files, setFiles] = useState([]);


    const toggleProject = async () => {

        // If project is already open,
        // simply close it.
        if (open) {

            setOpen(false);

            return;
        }


        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://127.0.0.1:8000/get_files?project_id=${project.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            setFiles(response.data);

            setOpen(true);


        } catch (error) {

            console.log(error);

        }
    };


    return (
        <div>

            {/* Project Header */}
            <div className="w-full flex">


                {/* Project button */}
                <button
                    onClick={toggleProject}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#2d2d2d] transition"
                >

                    <span className="text-xs">
                        {open ? "▼" : "▶"}
                    </span>

                    <span>
                        📁
                    </span>

                    <span className="font-medium">
                        {project.project_name}
                    </span>
                </button>


                {/* Create new file */}
                <div className="flex justify-center items-center hover:bg-[#2d2d2d] transition h-15 w-20">

                    <Create_new_file
                        projectId={project.id}
                    />

                </div>

            </div>


            {/* Files */}
            {open && (

                <div className="ml-8">

                    {files.map((file) => (

                        <FileItem
                            key={file.id}
                            file={file}
                            project_name={project.project_name}
                            projectId={project.id}
                            selectedFile={selectedFile}
                            setSelectedFile={setSelectedFile}
                            setFileName = {setFileName}
                        />

                    ))}

                </div>

            )}

        </div>
    );
}