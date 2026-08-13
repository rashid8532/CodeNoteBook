import React from "react";
import { DocumentIcon } from "@heroicons/react/24/outline";
import LanguageSelector from "../console/language_selector";

function EditorBar({
  savefile,
  FileName,
  selectedLanguage,
  setSelectedLanguage,
}) {
  return (
    <nav className="flex h-14 items-center justify-between border-b border-gray-800 bg-[#0d1117] px-4 text-white">

      {/* Save */}
      <button
        onClick={savefile}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-500"
      >
        Save File
      </button>

      {/* Language */}
      <div className="flex items-center gap-2">
        <span className="hidden text-sm text-gray-500 sm:block">
          Language:
        </span>

        <LanguageSelector
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      </div>

      {/* File */}
      <div className="flex max-w-[35%] items-center gap-2 rounded-lg border border-gray-800 bg-[#11161d] px-3 py-2">
        <DocumentIcon className="h-4 w-4 text-blue-400" />

        <span className="truncate text-sm text-gray-300">
          {FileName || "No file selected"}
        </span>
      </div>

    </nav>
  );
}

export default EditorBar;