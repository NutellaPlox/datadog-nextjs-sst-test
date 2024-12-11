// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import tracer from "dd-trace"

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const span = tracer.scope().active()
  span?.logEvent("error", { message: "Test error" })
  console.error("Test console error")
  throw new Error("Test error")
  res.status(200).json({ name: "John Doe" })
}
