import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploadProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};
const FileUpload = ({ fieldChange, mediaUrl }: FileUploadProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
    fieldChange(acceptedFiles);
    setFileUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
        <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="uploaded image" className="file_uploader-img" />
        </div>
        <p className="file_uploader-label">Click or drag photo to replace current iamge</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img src="/assets/icons/file-upload.svg" width={95} height={75} />
          <h3 className="base-medium text-light-2 mt-5">Drag photo here</h3>
          <p className="text-light-4 small-regular mt-2 mb-6">SVG, PNG, JPG</p>
          <Button className="shad-button_dark_4">Upload File</Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
