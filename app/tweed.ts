"use server";
import { TweedBackendSDK } from "@paytweed/backend-sdk";

export const tweed = async (message: string) => {
  const tweed = await TweedBackendSDK.setup({
    apiKey: process.env.TWEED_API_KEY as string,
    apiSecret: process.env.TWEED_API_SECRET as string,
    defaultBlockchainIds: ["ethereumSepolia"],
  });
  const answer = await tweed.handleMessageFromFrontend(message, "1", "a@a.com");

  return answer;
};
