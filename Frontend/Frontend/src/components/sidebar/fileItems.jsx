import { Delete_file } from "../dropdowns/delete_file";

export default function FileItem({
    file,
    projectId,
    selectedFile,
    setSelectedFile,
    setFileName
}) {

    return (

        <div className="flex">


            {/* File */}
            <button
                onClick={() => {
                    setSelectedFile(file.id),
                    setFileName(file.file_name)}}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left rounded-md transition

                ${
                    selectedFile === file.id
                        ? "bg-blue-600 text-white"
                        : "hover:bg-[#2d2d2d]"
                }`}
            >

                <span>
                    📄
                </span>

                <span>
                    {file.file_name}
                </span>

            </button>


            {/* Delete button */}
            <div className="flex justify-center items-center hover:bg-[#2d2d2d] transition h-15 w-20">

                <Delete_file
                    FileName={file.file_name}
                    projectId={projectId}
                />


            </div>

        </div>
    );
}