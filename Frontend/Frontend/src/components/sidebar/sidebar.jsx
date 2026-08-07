import { Description } from "@heroui/react";
import axios from "axios";
import { useState,useEffect} from "react";


export default function Sidebar() {

  const [projects, setProjects] = useState([
    {
      id: 1,
      project_name: "Frontend",
      Description : "",
      open: true,
      files: [
        { id: 1, file_name: "App.jsx" },
      ],
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
            setProjects((await response).data)
            console.log(response.data)
        }

        fetchprojects()
        
    },[])
    



  const [selectedFile, setSelectedFile] = useState(null);

  const toggleProject = (id) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? { ...project, open: !project.open }
          : project
      )
    );
  };

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
            <button
              onClick={() => toggleProject(project.id)}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#2d2d2d] transition"
            >

              <span className="text-xs">
                {project.open ? "▼" : "▶"}
              </span>

              <span>📁</span>

              <span className="font-medium">
                {project.project_name}
              </span>

            </button>

            {/* Files */}
            {/* {project.open && (

              <div className="ml-8">

                {project.files.map((file) => (

                  <button
                    key={file.id}
                    onClick={() => setSelectedFile(file.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-left rounded-md transition

                    ${
                      selectedFile === file.id
                        ? "bg-blue-600 text-white"
                        : "hover:bg-[#2d2d2d]"
                    }`}
                  >

                    <span>📄</span>

                    <span>{file.name}</span>

                  </button>

                ))}

              </div>

            )} */}

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