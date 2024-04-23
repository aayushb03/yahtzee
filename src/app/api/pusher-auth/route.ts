import { nanoid } from "nanoid"

import { pusherServer } from "@/services/pusher/pusherServer"

/**
 * This is optional but highly recommended to prevent bad actors
 * from overloading your channel.
 * @param req 
 * @returns void
 */
// eslint-disable-next-line
export async function POST(req: Request) {
  const data = await req.text()

  /**
   * Extracting the socketId and channelName from the
   * search params when making an authorized request.
   */ 
  const [socketId, channelName] = data
    .split("&")
    .map((str) => str.split("=")[1])

  const id = nanoid()

  /**
   * Provide identity metadata for the request maker.
   */
  const presenceData = {
    // eslint-disable-next-line
    user_id: id,
    // eslint-disable-next-line
    user_data: { user_id: id },
  }


  /**
   * Authorize a given pusher channel for the current user who is making the socket connection.
   */
  const auth = pusherServer.authorizeChannel(
    socketId,
    channelName,
    presenceData
  )

  return new Response(JSON.stringify(auth))
}