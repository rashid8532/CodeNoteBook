import { useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import axios from 'axios'
import EditorBar from './editorbar'
// import getFileContent from './loadFileContent';

function EditorArea({
    FileName,
    editorRef,
    selectedLanguage,
    setSelectedLanguage 
}) {
    const [content,setcontent] = useState("") 
    // this selectedLnaguage is using prop drilling 

    const getFileContent = async (FileName) => {
    const token = localStorage.getItem("token")

    const response = await axios.get(
        "http://127.0.0.1:8000/get_files_byname",
        {
            params: {
                file_name: FileName
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}


    useEffect(() => {
    const loadContent = async () => {
        if (FileName) {
            const data = await getFileContent(FileName);
            setcontent(data.file_content);
        }
    };

    loadContent();
}, [FileName]);    
    
    
    

    function handleEditorDimount(editor,monaco){
        editorRef.current = editor
    }


    const saveFileContent = async()=>{

        const filecontent = editorRef.current.getValue()
        console.log(filecontent,"filecontent")
        console.log(FileName,"filename")
        const token = localStorage.getItem("token")


        const response = await axios.put(
            "http://127.0.0.1:8000/update_file_content",
            null,
            {
                params:{
                    file_name:FileName,
                    file_updated_content : filecontent
                },
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        alert("data is saved now")
        return response.data;
    }

    function showValue(){
        alert(editorRef.current.getValue())
    }


  return (
    <>
    <EditorBar savefile={saveFileContent}FileName={FileName}selectedLanguage={selectedLanguage}setSelectedLanguage={setSelectedLanguage}/>
    <Editor
    theme='hc-black'
    height="50vh"
    language={selectedLanguage}
    value= {content}
    onMount={handleEditorDimount}
    />
    </>
    
  )
}

export default EditorArea