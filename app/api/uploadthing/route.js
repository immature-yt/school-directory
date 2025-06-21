// app/api/uploadthing/route.js
import { createRouteHandler } from "uploadthing/next"
import { ourFileRouter } from "@/uploadthing.config" // if alias works

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
})
