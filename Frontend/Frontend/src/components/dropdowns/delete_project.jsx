import {Button, Modal} from "@heroui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate,useSearchParams} from "react-router-dom";

export function Delete_project() {
    const [formData,setFormData] = useState({
        project_name:""
    })

  const token = localStorage.getItem("token")
  const handleChange = (e) =>{
    setFormData((prev) => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

    const handleSubmit = async (e) =>{
      e.preventDefault();

      try{
        const token = localStorage.getItem("token")
        const response = await axios.delete(
          "http://127.0.0.1:8000/delete_project",
          {
            params:{
                project_name : formData.project_name
            }, 
            headers:{
              Authorization:`Bearer ${token}`
            }
          },
        )
        console.log("came out from the try block")
        alert("Project Deleted Successfuly")
      }
      catch (error){
        if (error.response.status === 409) {
            alert("This project contains files and cannot be deleted.");
            return
        }
        alert("This Project does not exist")
        console.error(error)
      }
    }

  
  return (
    <Modal>
        <div className='flex items-center justify-center '>
            <Button className={"bg-taupe-900 rounded-xl h-10 text-blue-400 font-bold"}>Delete Project</Button>
        </div>

      <Modal.Backdrop>
        <Modal.Container>
            <Modal.Dialog className="sm:max-w-90 bg-black">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading className="text-amber-50">Delete Project </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
               <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-100">
                Project Name
              </label>
              <div className="mt-2">
                <input
                  id="project_name"
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleChange}
                  type="text"
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <Button className="w-full bg-red-700" slot="close" type="submit">
                Delete
              </Button>
          </form>
            </Modal.Body>
            <Modal.Footer>
              
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}