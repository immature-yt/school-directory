'use client'

import { UploadButton } from '@uploadthing/react'
import { useState } from 'react'
import { ourFileRouter } from '@/uploadthing.config'

export default function ImageUploader({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false)

  return (
    <div className="my-4">
      <UploadButton
        endpoint="schoolImage"
        onUploadBegin={() => setUploading(true)}
        onClientUploadComplete={(res) => {
          setUploading(false)
          if (res && res[0]?.url) {
            onUploadComplete(res[0].url)
          }
        }}
        onUploadError={(error) => {
          console.error(error)
          alert('Upload failed.')
        }}
      />
      {uploading && <p className="text-gray-400 mt-2">Uploading...</p>}
    </div>
  )
}
