// uploadthing.config.js
import { createUploadthing } from "uploadthing/server"

const f = createUploadthing()

export const ourFileRouter = {
  schoolImage: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("✅ Uploaded image:", file.url)
    }),
}
