"use server";
import { TweedBackendSDK } from "@paytweed/backend-sdk";

export const tweed = async (message: string) => {
    console.log("send message to tweed", message);
    console.log("stringify", JSON.stringify({ message }));

    const tweed = await TweedBackendSDK.setup({
      apiKey: process.env.TWEED_API_KEY as string,
      apiSecret: process.env.TWEED_API_SECRET as string,
      defaultBlockchainIds: ["ethereumSepolia"],
    });

  const answer = await tweed.handleMessageFromFrontend(
    JSON.stringify(message),
    "1",
    "a@a.com"
  );

  console.log("answer", answer);

  return answer;
};
