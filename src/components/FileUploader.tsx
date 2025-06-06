import React, { useState, useRef } from 'react';
import { Upload, X, FileIcon } from 'lucide-react';

interface FileUploaderProps {
  acceptedFileTypes: string;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  title: string;
  subtitle: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  acceptedFileTypes, 
  multiple = false, 
  onFilesSelected,
  title,
  subtitle
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const uploadedFiles = multiple 
        ? Array.from(e.dataTransfer.files)
        : [e.dataTransfer.files[0]];
      
      setFiles(uploadedFiles);
      onFilesSelected(uploadedFiles);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFiles = multiple 
        ? Array.from(e.target.files)
        : [e.target.files[0]];
      
      setFiles(uploadedFiles);
      onFilesSelected(uploadedFiles);
    }
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={acceptedFileTypes}
          onChange={handleChange}
        />
        
        <div className="flex flex-col items-center justify-center py-4">
          <Upload size={40} className="text-blue-500 mb-2" />
          <h3 className="text-lg font-medium mb-1">{title}</h3>
          <p className="text-gray-500 mb-4">{subtitle}</p>
          <button
            type="button"
            onClick={handleButtonClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            ファイルを選択
          </button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">アップロードされたファイル</h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <div className="flex items-center">
                  <FileIcon size={20} className="text-gray-500 mr-2" />
                  <span className="truncate max-w-xs">{file.name}</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <X size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;