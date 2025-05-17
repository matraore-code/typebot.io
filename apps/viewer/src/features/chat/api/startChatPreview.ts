/*import { publicProcedure } from "@/helpers/server/trpc";
import { startChatPreview as startChatPreviewFn } from "@typebot.io/bot-engine/apiHandlers/startChatPreview";
import {
  startPreviewChatInputSchema,
  startPreviewChatResponseSchema,
} from "@typebot.io/chat-api/schemas";

export const startChatPreview = publicProcedure
  .meta({
    openapi: {
      method: "POST",
      path: "/v1/typebots/{typebotId}/preview/startChat",
      summary: "Start preview chat",
      description:
        'Use this endpoint to test your bot. The answers will not be saved. And some blocks like "Send email" will be skipped.',
    },
  })
  .input(startPreviewChatInputSchema)
  .output(startPreviewChatResponseSchema)
  .mutation(
    async ({
      input: {
        message,
        isOnlyRegistering,
        isStreamEnabled,
        startFrom,
        typebotId,
        typebot: startTypebot,
        prefilledVariables,
        sessionId,
        textBubbleContentFormat,
      },
      ctx: { user },
    }) =>
      startChatPreviewFn({
        message,
        isOnlyRegistering,
        isStreamEnabled,
        startFrom,
        typebotId,
        typebot: startTypebot,
        userId: user?.id,
        prefilledVariables,
        sessionId,
        textBubbleContentFormat,
      }),
  );*/

import { publicProcedure } from "@/helpers/server/trpc";
import { startChatPreview as startChatPreviewFn } from "@typebot.io/bot-engine/apiHandlers/startChatPreview";
import {
  startPreviewChatInputSchema,
  startPreviewChatResponseSchema,
} from "@typebot.io/chat-api/schemas";

export const startChatPreview = publicProcedure
  .meta({
    openapi: {
      method: "POST",
      path: "/v1/typebots/{typebotId}/preview/startChat",
      summary: "Start preview chat",
      description:
        'Use this endpoint to test your bot. The answers will not be saved. And some blocks like "Send email" will be skipped.',
    },
  })
  .input(startPreviewChatInputSchema)
  .output(startPreviewChatResponseSchema)
  .mutation(
    async ({
      input: {
        message,
        isOnlyRegistering,
        isStreamEnabled,
        startFrom,
        typebotId,
        typebot: startTypebot,
        prefilledVariables,
        sessionId,
        textBubbleContentFormat,
      },
      ctx,
    }) => {
      // ✅ Injecte les headers CORS ici

      if (ctx.req?.method === "OPTIONS") {
        ctx.res?.setHeader("Access-Control-Allow-Origin", "https://builder.linformel.cloud");
        ctx.res?.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        ctx.res?.setHeader("Access-Control-Allow-Headers", "Content-Type");
        ctx.res?.status(200).end();
        return null;
      }
      if (ctx?.res) {
        ctx.res.setHeader("Access-Control-Allow-Origin", "https://builder.linformel.cloud");
        ctx.res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        ctx.res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      }

      return startChatPreviewFn({
        message,
        isOnlyRegistering,
        isStreamEnabled,
        startFrom,
        typebotId,
        typebot: startTypebot,
        userId: ctx.user?.id,
        prefilledVariables,
        sessionId,
        textBubbleContentFormat,
      });
    }
  );

