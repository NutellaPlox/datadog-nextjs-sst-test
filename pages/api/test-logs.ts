// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import tracer from "dd-trace"

type Data = {
  success: boolean
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.headers)
  const span = tracer.scope().active()
  span?.setTag("test", "test")
  res.status(200).json({ success: true })
}
