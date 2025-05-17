import { appRouter } from "@/helpers/server/appRouter";
import { createContext } from "@/helpers/server/context";
import { createOpenApiNextHandler } from "@typebot.io/trpc-openapi/adapters";
import type { NextApiRequest, NextApiResponse } from "next";
import cors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //await cors(req, res);

  await cors(req, res, {
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: 'https://builder.linformel.cloud',
    optionsSuccessStatus: 200,
  });

  return createOpenApiNextHandler({
    router: appRouter,
    createContext,
  })(req, res);
};

export default handler;
