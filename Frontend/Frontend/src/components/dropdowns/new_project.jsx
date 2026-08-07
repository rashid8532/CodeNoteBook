import {Button, Modal} from "@heroui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate,useSearchParams} from "react-router-dom";

export function Create_new_project() {

  const token = localStorage.getItem("token")

    const [formData,setFormData] = useState(
        {
            project_name : "",
            description : ""
        }
    )

    const handleChange = (e) =>{
        setFormData((prve) =>({
            ...prve,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = async (e) =>{
      e.preventDefault();

      try{
        const token = localStorage.getItem("token")
        const response = await axios.post(
          "http://127.0.0.1:8000/new_project",
          formData,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          },
        )
        console.log(response.formData)
        alert("Project Created Successfuly")
      }
      catch (error){
        alert("something went wrong this cant be save")
        console.error(error)
      }
    }

  return (
    <Modal>
        <div className='flex items-center justify-center h-20 w-32'>
            <Button className={"bg-taupe-900 rounded-xl h-10 text-blue-400 font-medium"}>new Projects</Button>
        </div>

      <Modal.Backdrop>
        <Modal.Container>
            <Modal.Dialog className="sm:max-w-90 bg-black">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading className="text-amber-50">Create New Project</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
               <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label htmlFor="project_name" className="block text-sm/6 font-medium text-gray-100">
                Project Name
              </label>
              <div className="mt-2">
                <input
                  id="project_name"
                  name="project_name"
                  type="text"
                  value={formData.project_name}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="description" className="block text-sm/6 font-medium text-gray-100">
                  Description
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
            </div>

            <Button className="w-full" slot="close" type="submit">
                Continue
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