import { createUploadthing } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  schoolImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(({ file }) => {
      console.log("✔ Uploaded:", file.url)
      return { url: file.url }
    }),
}
