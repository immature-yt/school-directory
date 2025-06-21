'use client'

import { UploadButton } from "@uploadthing/react"
import { useState } from "react"

export default function ImageUploader({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false)

  return (
    <div className="my-4">
      <UploadButton
        endpoint="schoolImage"
        onClientUploadComplete={(res) => {
          if (res && res[0]?.url) {
            onUploadComplete(res[0].url)
          }
        }}
        onUploadBegin={() => setUploading(true)}
        onUploadError={(error) => alert(`Upload failed: ${error.message}`)}
      />
      {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
    </div>
  )
}
