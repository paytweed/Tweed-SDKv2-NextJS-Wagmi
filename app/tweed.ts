"use server";
import { TweedBackendSDK } from "@paytweed/backend-sdk";

export const tweed = async (message: string) => {
  const tweed = await TweedBackendSDK.setup({
    apiKey: "lTb8oCLxqtYb9plUrm08zrQxTMQozRXx",
    apiSecret:
      "4hlL4JLXLSD4MVNZHczebowo40pIqqD1TM5H94XLEvQbwFnfio-fqKQmZAJjIRmM",
    defaultBlockchainIds: ["ethereumSepolia"],
  });
  const answer = await tweed.handleMessageFromFrontend(message, "1", "a@a.com");

  return answer;
};
