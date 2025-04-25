// import React, { useState, ChangeEvent, useEffect } from "react";
// import fileUploadIcon from "../assets/icons/fileUploadIcon.svg";
// import { Text } from "@radix-ui/themes";

// interface FileUploaderProps {
//   maxSizeMB: number;
//   acceptFormats: string[];
//   onFileUpload: (file: File) => void;
//   defaultFile?: string;
// }

// const FileUploader: React.FC<FileUploaderProps> = ({
//   maxSizeMB,
//   acceptFormats,
//   onFileUpload,
//   defaultFile,
// }) => {
//   const [preview, setPreview] = useState<string | null>(null);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     // Set initial preview for edit mode
//     if (defaultFile) {
//       setPreview(defaultFile);
//     }
//   }, [defaultFile]);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const fileSizeMB = file.size / (1024 * 1024);
//       const fileExtension = file.name.split(".").pop()?.toLowerCase();

//       if (fileSizeMB > maxSizeMB) {
//         setError(`File size exceeds ${maxSizeMB} MB`);
//         setPreview(null);
//         return;
//       }

//       if (fileExtension && !acceptFormats.includes(fileExtension)) {
//         setError(
//           `File format not supported! Please upload a ${acceptFormats.join(
//             ", "
//           )} file`
//         );
//         setPreview(null);
//         return;
//       }

//       setError("");
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//       onFileUpload(file);
//     }
//   };

//   return (
//     <div className="flex items-center">
//       <label
//         htmlFor="dropzone-file"
//         className="flex flex-col items-center rounded-[4px] cursor-pointer bg-alpha_3"
//       >
//         <div className="flex items-center py-2 px-3">
//           {preview ? (
//             <img
//               src={preview}
//               alt="Preview"
//               width={128}
//               height={128}
//               className="object-cover"
//             />
//           ) : (
//             <>
//               <img src={fileUploadIcon} className="w-4 h-4" />
//               <Text
//                 as="p"
//                 weight="medium"
//                 size="2"
//                 className="text-accent_alpha_11 pl-2"
//               >
//                 Upload
//               </Text>
//             </>
//           )}
//         </div>
//         <input
//           id="dropzone-file"
//           type="file"
//           className="hidden"
//           onChange={handleFileChange}
//           accept={acceptFormats.map((ext) => `.${ext}`).join(",")}
//         />
//       </label>
//       {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
//     </div>
//   );
// };

// export default FileUploader;

import React, { useState, ChangeEvent, useEffect } from "react";
import fileUploadIcon from "../assets/icons/fileUploadIcon.svg";
import { Text } from "@radix-ui/themes";
import { BiX } from "react-icons/bi";

interface FileUploaderProps {
  maxSizeMB: number;
  acceptFormats: string[];
  onFileUpload: (files: File[]) => void;
  defaultFiles?: string[];
}

const FileUploader: React.FC<FileUploaderProps> = ({
  maxSizeMB,
  acceptFormats,
  onFileUpload,
  defaultFiles,
}) => {
  const [previews, setPreviews] = useState<
    Array<{ url: string; name: string }>
  >([]);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Set initial previews for edit mode
    if (defaultFiles && defaultFiles.length > 0) {
      setPreviews(
        defaultFiles.map((url) => ({
          url,
          name: url.split("/").pop() || "file",
        }))
      );
    }
  }, [defaultFiles]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    if (newFiles.length === 0) return;

    const validFiles: File[] = [];
    let errorMessage = "";

    newFiles.forEach((file) => {
      const fileSizeMB = file.size / (1024 * 1024);
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (fileSizeMB > maxSizeMB) {
        errorMessage = `Some files exceed ${maxSizeMB} MB limit`;
        return;
      }

      if (fileExtension && !acceptFormats.includes(fileExtension)) {
        errorMessage = `Some files have unsupported format. Accepted: ${acceptFormats.join(
          ", "
        )}`;
        return;
      }

      validFiles.push(file);
    });

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError("");

    // Create previews for valid files
    const newPreviews = validFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setPreviews([...previews, ...newPreviews]);
    setFiles([...files, ...validFiles]);
    onFileUpload([...files, ...validFiles]);
  };

  const removeFile = (index: number) => {
    const newPreviews = [...previews];
    const newFiles = [...files];

    // Revoke object URL if it's not a default file
    if (!defaultFiles?.includes(newPreviews[index].url)) {
      URL.revokeObjectURL(newPreviews[index].url);
    }

    newPreviews.splice(index, 1);
    newFiles.splice(index, 1);

    setPreviews(newPreviews);
    setFiles(newFiles);
    onFileUpload(newFiles);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center rounded-[4px] cursor-pointer bg-alpha_3"
        >
          <div className="flex items-center py-2 px-3">
            <img src={fileUploadIcon} className="w-4 h-4" />
            <Text
              as="p"
              weight="medium"
              size="2"
              className="text-accent_alpha_11 pl-2"
            >
              Upload
            </Text>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={acceptFormats.map((ext) => `.${ext}`).join(",")}
            multiple
          />
        </label>
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      {/* Files overview */}
      {previews.length > 0 && (
        <div className="mt-2 space-y-2">
          {previews?.map((preview, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-100 rounded"
            >
              <div className="flex items-center">
                {preview.url.startsWith("data:image") ||
                preview.url.match(/\.(jpeg|jpg|gif|png)$/) ? (
                  <img
                    src={preview?.url}
                    alt="Preview"
                    className="w-8 h-8 object-cover mr-2"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-200 flex items-center justify-center mr-2">
                    <Text size="1">{preview?.name.split(".").pop()}</Text>
                  </div>
                )}
                <Text size="2" className="truncate max-w-xs">
                  {preview?.name}
                </Text>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-gray-500 hover:text-red-500"
              >
                <BiX />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
