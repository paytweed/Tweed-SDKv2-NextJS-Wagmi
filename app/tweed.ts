"use server";
import { TweedBackendSDK } from "@paytweed/backend-sdk";

export const tweed = async (message: string) => {
  const apiKey =
    process.env.TWEED_API_KEY || "lTb8oCLxqtYb9plUrm08zrQxTMQozRXx";
  const apiSecret =
    process.env.TWEED_API_SECRET ||
    "4hlL4JLXLSD4MVNZHczebowo40pIqqD1TM5H94XLEvQbwFnfio-fqKQmZAJjIRmM";

  const tweed = await TweedBackendSDK.setup({
    apiKey: apiKey!,
    apiSecret: apiSecret!,
    defaultBlockchainIds: ["ethereumSepolia"],
  });

const answer = await tweed.handleMessageFromFrontend(message, "1", "a@a.com");
  console.log("answer", answer);

  return answer;
};


