/*import { appRouter } from "@/helpers/server/appRouter";
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

export default handler;*/

import { createContext } from "@/helpers/server/context";
import { appRouter } from "@/helpers/server/appRouter";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ✅ Ajout des headers CORS
  res.setHeader("Access-Control-Allow-Origin", "https://builder.linformel.cloud");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // 🔁 Handler tRPC
  return createNextApiHandler({
    router: appRouter,
    createContext,
    batching: {
      enabled: true,
    },
  })(req, res);
}

