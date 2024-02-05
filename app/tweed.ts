"use server";
import { TweedBackendSDK } from "@paytweed/backend-sdk";
console.log(process.env.TWEED_API_KEY, process.env.TWEED_API_KEY);

export const tweed = async (message: string) => {
  

  const apiKey = "lTb8oCLxqtYb9plUrm08zrQxTMQozRXx";
  const apiSecret =
    "4hlL4JLXLSD4MVNZHczebowo40pIqqD1TM5H94XLEvQbwFnfio-fqKQmZAJjIRmM";

  console.log("apiKey", apiKey);
  console.log("apiSecret", apiSecret);

  const tweed = await TweedBackendSDK.setup({
    apiKey: apiKey!,
    apiSecret: apiSecret!,
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


