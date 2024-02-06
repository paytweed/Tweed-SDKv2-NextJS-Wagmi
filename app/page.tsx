"use client";
import { useEffect } from "react";
import { getAccessToken } from "./auth";

export default function Home() {
  useEffect(() => {
    const get = async () => {
      const res = await getAccessToken({
        apiKey: "lTb8oCLxqtYb9plUrm08zrQxTMQozRXx",
        apiSecret:
          "4hlL4JLXLSD4MVNZHczebowo40pIqqD1TM5H94XLEvQbwFnfio-fqKQmZAJjIRmM",
        audience: "https://whitelabel.prod.paytweed.com",
        domain: "paytweed.us.auth0.com",
      });

      console.log(res);
    };
    get();
  }, []);

  return (
    <>
      <h1>TWEED</h1>
    </>
  );
}
