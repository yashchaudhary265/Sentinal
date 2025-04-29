import { LucideUploadCloud } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";

interface FileDropProps {
    onFilesAdded: (files: File[]) => void;
}

const FileDrop: React.FC<FileDropProps> = ({ onFilesAdded }) => {
    const onDrop = (acceptedFiles: File[]) => {
        onFilesAdded(acceptedFiles);
        console.log(acceptedFiles)
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div
            {...getRootProps({
                className: "border-2 border-dashed border-primary rounded-lg p-4 flex items-center justify-center w-40 h-40 cursor-pointer transition-colors hover:bg-blue-100",
            })}
        >
            <input {...getInputProps()} />
            <div className=" flex flex-col text-center items-center justify-center gap-2">
                <div className="text-primary p-2 flex items-center justify-center">
                    <LucideUploadCloud size={36} />
                </div>
                <p>Drag & drop files here</p>
            </div>
        </div>
    );
};

export default FileDrop;