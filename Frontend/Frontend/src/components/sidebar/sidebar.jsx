import { Description } from "@heroui/react";
import axios from "axios";
import { useState,useEffect} from "react";
import { Create_new_file } from "../dropdowns/new_file";
import { Delete_file } from "../dropdowns/delete_file";
export default function Sidebar() {

  const [projects, setProjects] = useState([
    {
      id: 1,
      project_name: "Frontend",
      Description : "",
      open: true,
      files:[]
    },
  ]);

    
    useEffect(()=>{
        const fetchprojects = async()=>{
            const token = localStorage.getItem("token")
            const response = await axios.get(
                "http://127.0.0.1:8000/get_projects",
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )

            const projectswithstates = response.data.map((project) =>({
              ...project,
              open:false,
              files:[]
            }))

            setProjects(projectswithstates)
            console.log(projectswithstates);
            
        }

        fetchprojects()
        
    },[])
    



  const [selectedFile, setSelectedFile] = useState(null);

  const toggleProject = async (id) => {
    const project = projects.find(
      (project) => project.id == id,
    )

    if (project.open){
      setProjects((prev) =>
      prev.map(project=>
        project.id === id 
        ?{...project, open:false}
        : project
      ))
      return;
    }
    try{
      const token = localStorage.getItem("token")
      const response = await axios.get(
        `http://127.0.0.1:8000/get_files?project_id=${id}`,
        {
          headers:{
          Authorization:`Bearer ${token}`
          }
        }
    )   
    setProjects((prev)=>
    prev.map((project)=>project.id ===id
        ?{
          ...project,
          open:true,
          files : response.data
        }
        :project
      ))
    }
    catch(error){
      console.log(error)
    }
}

  return (
    <aside className="w-72 h-screen bg-[#1e1e1e] border-r border-gray-800 text-gray-300 flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800">

        <h2 className="font-semibold uppercase tracking-wider text-sm">
          Explorer
        </h2>

        <button
          className="w-8 h-8 rounded hover:bg-gray-700 text-xl"
          title="New Project"
        >
          +
        </button>

      </div>

      {/* Projects */}
      <div className="flex-1 overflow-y-auto">

        {projects.map((project) => (
          <div key={project.id}>

            {/* Project Header */}
            <div className="w-full flex">
                 <button
              onClick={() => toggleProject(project.id)}
              className=" w-full flex items-center gap-2 px-4 py-2 hover:bg-[#2d2d2d] transition"
            >

              <span className="text-xs">
                {project.open ? "▼" : "▶"}
              </span>

              <span>📁</span>

              <span className="font-medium">
                {project.project_name}
              </span>

              
            </button>
            <div className="flex justify-center items-center hover:bg-[#2d2d2d] transition h-15 w-20">
              <Create_new_file projectId={project.id}/>
            </div>
 

            </div>
            
            {/* Files */}
            {project.open && (

              <div className="ml-8">

                {project.files.map((file) => (

                  <div className="flex"
                  key={file.id}>
                    <button
                    
                    onClick={() => setSelectedFile(file.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-left rounded-md transition

                    ${
                      selectedFile === file.id
                        ? "bg-blue-600 text-white"
                        : "hover:bg-[#2d2d2d]"
                    }`}
                  >

                    <span>📄</span>

                    <span>{file.file_name}</span>
                  </button>

                  <div className="flex justify-center items-center hover:bg-[#2d2d2d] transition h-15 w-20">
                    <Delete_file FileName={file.file_name}/>
                    {console.log(file.file_name)}
                  </div>
                  </div>

                ))}
              </div>
              

            )}

          </div>
        ))}

      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 p-3 text-xs text-gray-500">

        Projects: {projects.length}

      </div>

    </aside>
  );
}