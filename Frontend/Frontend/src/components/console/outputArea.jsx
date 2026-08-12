import React, { useState } from 'react'
import { executeCode } from './outputAPI';


function Output({editorRef,selectedLanguage}) {
    const [output,setoutput] = useState("")

    const runCode = async ()=>{

        const sourceCode = editorRef.current.getValue()
        if(!sourceCode)return;

        try{
            const result = await executeCode(selectedLanguage,sourceCode)
            setoutput(
                result.stdout ||
                result.stderr ||
                result.compile_output ||
                result.message ||
                ""
            )

        }
        catch{
            alert("this is not working ")
        }
    }

  return (
    <div className='h-76 bg-black text-green-500  border-2 border-blue-500'>
        <div className='flex justify-between mx-8 items-center '>
            <p className='my-2'>Output</p>
            <button className='bg-gray-800 px-4 py-2 m-4 font-bold rounded-2xl text-blue-300 border-2 border-white'
            onClick={runCode}>Run Code</button>
        </div>
        <div className='bg-gray-950 h-57 border-2 border-blue-500 whitespace-pre-wrap'>{output}</div>
    </div>
  )
}

export default Output