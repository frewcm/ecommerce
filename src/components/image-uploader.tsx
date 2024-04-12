"use client";

import { UploadButton } from "../utils/uploadthing";

export default function ImageUploader() {
  return (
    <div className="w-full flex justify-start pt-1">
      <UploadButton
        endpoint="productPicture"
        onClientUploadComplete={(res) => {
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
