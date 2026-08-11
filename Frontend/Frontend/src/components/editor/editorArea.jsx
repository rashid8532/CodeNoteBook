import { useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import axios from 'axios'
// import getFileContent from './loadFileContent';

function EditorArea({FileName}) {
    const [content,setcontent] = useState("") 


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
    
    
    
    const editorRef = useRef(null);

    function handleEditorDimount(editor,monaco){
        editorRef.current = editor
    }
    

    function showValue(){
        alert(editorRef.current.getValue())
    }


  return (
    <><button onClick={showValue}> showValue </button>
    <Editor
    height="50vh"
    defaultLanguage='javascript'
    value= {content}
    onMount={handleEditorDimount}
    />
    </>
    
  )
}

export default EditorArea