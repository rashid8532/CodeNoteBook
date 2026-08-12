import React from 'react'
import LanguageSelector from '../console/language_selector'

function EditorBar({savefile,FileName,selectedLanguage,setSelectedLanguage}) {
  return (
    <nav className='bg-black text-white h-15 w-full flex justify-center items-center border-blue-400 border-2'>
        <ul className='flex justify-around w-full items-center'>
            <li>
                <button onClick={savefile}>Save File</button>
            </li>
            <li className='flex justify-center items-center'> Languages : <LanguageSelector selectedLanguage={selectedLanguage}setSelectedLanguage={setSelectedLanguage}/></li>
            <li>Current Project is {localStorage.getItem("project_name")}</li>
            <li>Current File is:  <span className='text-blue-500'>{FileName}</span> </li>
        </ul>
    </nav>
  )
}

export default EditorBar