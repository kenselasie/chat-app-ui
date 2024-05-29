"use client";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { FileSpreadsheet, ImageIcon, UploadIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import UploadPhotoPlaceholder from "@/assets/upload_photo_placeholder.svg";

interface IUploadFiles {
  file: File;
  displayURL: string;
}

type UploaderType = {
  onChange?: any;
  multiple: boolean;
  fileType?: "Excel";
  name: string;
  text: string;
};
export default function Uploader({
  onChange,
  text,
  multiple,
  fileType,
}: UploaderType) {
  const [uploadFiles, setUploadFiles] = React.useState<IUploadFiles[]>();

  const getFilesFromFileStruct = (files: IUploadFiles[]) =>
    files.map((el) => el.file);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    multiple,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
        setUploadFiles((prevUploadFile: any) => {
          let finalData: IUploadFiles[];
          const transformedAcceptedFiles = acceptedFiles.map((el) => {
            return {
              file: el,
              displayURL: URL.createObjectURL(el),
            };
          });
          if (multiple) {
            finalData = Array.isArray(prevUploadFile)
              ? [...prevUploadFile, ...transformedAcceptedFiles]
              : transformedAcceptedFiles;
          } else {
            finalData = transformedAcceptedFiles;
          }
          if (onChange) {
            onChange({
              files: getFilesFromFileStruct(finalData),
            });
          }
          return finalData;
        });
      }
    },
  });

  const handleDelete = (uplFile: IUploadFiles) => {
    const newFiles = uploadFiles?.filter(
      (el) => el.displayURL !== uplFile.displayURL
    );
    setUploadFiles(newFiles);

    if (onChange) {
      onChange({ files: getFilesFromFileStruct(newFiles!) });
    }
  };
  const thumbs = uploadFiles?.map((uplFile, idx) => {
    if (uplFile.displayURL) {
      return (
        <div
          className="inline-flex flex-col overflow-hidden border border-border-200 rounded mt-2 me-2 relative"
          key={idx}
        >
          {fileType === "Excel" ? (
            <div className="flex items-center gap-2 p-4">
              <FileSpreadsheet />
              <p className="text-xs">{uplFile.displayURL}</p>
              <button
                className="size-4 flex items-center justify-center ml-4 rounded-full bg-red-500 text-xs absolute top-1 end-2 shadow-xl outline-none"
                onClick={() => handleDelete(uplFile)}
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden">
              <Image
                width={50}
                height={50}
                src={uplFile.displayURL}
                alt="thumbnail"
              />
              <button
                className="size-4 flex items-center justify-center ml-4 rounded-full bg-red-500 text-xs absolute top-1 end-2 shadow-xl outline-none"
                onClick={() => handleDelete(uplFile)}
              >
                <X size={12} />
              </button>
            </div>
          )}
          {multiple ? (
            <button
              className="w-4 h-4 flex items-center justify-center rounded-full bg-red-600 text-xs text-light absolute top-1 end-1 shadow-xl outline-none"
              onClick={() => handleDelete(uplFile)}
            >
              <X width={10} height={10} />
            </button>
          ) : null}
        </div>
      );
    }
  });

  return (
    <section className="upload flex flex-col justify-center items-center">
      <div
        {...getRootProps({
          className: "cursor-pointer w-fit",
        })}
      >
        <Input {...getInputProps()} />
        <Image
          src={UploadPhotoPlaceholder}
          width="200"
          height="200"
          className="p-3 rounded-full border z-10"
          alt={"uploadPhotoPlacehoder"}
        />
        <div className="flex absolute items-center w-[165px] ml-2 justify-center gap-2 rounded-3xl bg-white h-10 shadow-[0px_2px_16px_0px_#101C261F] text-sm mt-[-20px] z-20 text-center">
          <ImageIcon size={20} />
          <span className="font-semibold text-xs">{text}</span>
        </div>
      </div>

      {!!thumbs?.length && (
        <aside className="flex flex-wrap mt-2">
          {!!thumbs?.length && thumbs}
        </aside>
      )}
    </section>
  );
}
