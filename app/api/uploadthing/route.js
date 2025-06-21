import { createRouteHandler } from "uploadthing/next"
import { ourFileRouter } from "@/uploadthing.config"

export const runtime = "edge" // ✅ or "nodejs" if edge fails

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    uploadthingSecret: process.env.UPLOADTHING_TOKEN,           // ✅ YOUR EXISTING TOKEN
    callbackUrl: "https://school-directory-theta.vercel.app/api/uploadthing", // ✅ ADD THIS
  },
})
