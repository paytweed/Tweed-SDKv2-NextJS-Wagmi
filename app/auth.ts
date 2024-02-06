"use server";
import { AuthenticationClient } from "auth0";

const createAuthenticator = (options: {
  apiKey: string;
  apiSecret: string;
  domain: string;
}): AuthenticationClient => {
  const { apiKey, apiSecret, domain } = options;
  return new AuthenticationClient({
    clientId: apiKey,
    clientSecret: apiSecret,
    domain,
  });
};

const requestNewToken = async (options: {
  apiKey: string;
  apiSecret: string;
  audience: string;
  domain: string;
}): Promise<any> => {
  const { apiKey, apiSecret, audience, domain } = options;
  const auth0 = createAuthenticator({ apiKey, apiSecret, domain });
  const token = await auth0.oauth.clientCredentialsGrant({ audience });
  return token;
};

// const refreshToken = async (options: {
//   apiKey: string;
//   apiSecret: string;
//   domain: string;
//   refresh_token: string;
// }): Promise<any> => {
//   const { apiKey, apiSecret, domain, refresh_token } = options;
//   const auth0 = createAuthenticator({ apiKey, apiSecret, domain });
//   return auth0.oauth.refreshTokenGrant({ refresh_token });
// };

const getAccessToken = async (options: {
  apiKey: string;
  apiSecret: string;
  audience: string;
  domain: string;
}): Promise<string> => {
  const { apiKey, apiSecret, audience, domain } = options;

  try {
    const token = await requestNewToken({
      apiKey,
      apiSecret,
      audience,
      domain,
    });

    console.log("Tweed Backend SDK: Auth0: Access token received", token);

    return token.data.access_token;
  } catch (error) {
    console.error(
      "Tweed Backend SDK: Auth0: Error on requesting an access token",
      error
    );
    throw error;
  }
};

export { getAccessToken };
