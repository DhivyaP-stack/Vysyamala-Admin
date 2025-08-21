import React from 'react';

// Define the component's props
interface FileInputProps {
    label: string;
    files: File[];
    onFilesChange: (files: File[]) => void;
    accept: string;
    multiple: boolean;
}

export const FileInput: React.FC<FileInputProps> = ({
    label,
    files,
    onFilesChange,
    accept,
    multiple,
}) => {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            if (multiple) {
                // For multiple files, add them to the existing list
                onFilesChange([...files, ...selectedFiles]);
            } else {
                // For single file, replace the existing one
                onFilesChange(selectedFiles);
            }
        }
    };

    const handleRemoveFile = (indexToRemove: number) => {
        onFilesChange(files.filter((_, index) => index !== indexToRemove));
    };

    return (
    <div>
        {/* This div is now the main flex container for the label, input, and selected files */}
        <div className="flex items-center flex-wrap gap-2"> 
            <span className="w-50 font-semibold text-black">{label}</span>
            <input
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleFileChange}
                // Hiding the default file input text (like "diya.png")
                // because we are showing our custom styled tags instead.
                className="text-transparent" 
            />

            {/* MOVED THE FILE LIST LOGIC INSIDE THE FLEX CONTAINER */}
            {files.length > 0 && (
                <ul className="list-none flex flex-wrap gap-2">
                    {files.map((file, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-x-2 bg-white border border-gray-300 text-gray-600 text-sm pl-3 pr-2 py-1 rounded-md"
                        >
                            {/* File name */}
                            <span>
                                <strong>{file.name}</strong>
                            </span>

                            {/* Remove button */}
                            <button
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                                className="text-black hover:opacity-75 transition-opacity"
                                title="Remove file"
                            >
                                {/* A slightly larger 'x' symbol for better clicking */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
);
};