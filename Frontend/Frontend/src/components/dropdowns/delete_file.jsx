import {Button, Modal} from "@heroui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate,useSearchParams} from "react-router-dom";

export function Delete_file({FileName}) {

  const token = localStorage.getItem("token")
    console.log("rendering this ", FileName )
    const handleSubmit = async (e) =>{
      e.preventDefault();
      console.log(FileName)
      console.log("runing handleSubmit",FileName)

      try{
        const token = localStorage.getItem("token")
        console.log("enter at the try block to delete")
        console.log(token,"this is in delete file")
        const response = await axios.delete(
          "http://127.0.0.1:8000/delete_file",
          
          {
            params :{
                file_name:FileName
            },
            headers:{
              Authorization:`Bearer ${token}`
            }
          },
        )
        console.log("came out from the try block")
        alert(`file  Deleted Successfuly`)
      }
      catch (error){
        alert("something went wrong this cant be delete")
        console.error(error)
      }
    }

  
  return (
    <Modal>
        <div className='flex items-center justify-center '>
            <Button className={"bg-taupe-900 rounded-xl h-10 text-blue-400 font-bold"}>-</Button>
        </div>

      <Modal.Backdrop>
        <Modal.Container>
            <Modal.Dialog className="sm:max-w-90 bg-black">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading className="text-amber-50">Delete File</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
               <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label htmlFor="project_name" className="block text-sm/6 font-medium text-gray-100">
                File Name 
              </label>
              
            </div>

            <Button className="w-full" slot="close" type="submit">
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