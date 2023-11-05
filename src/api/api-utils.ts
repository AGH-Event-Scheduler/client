// when testing on expo choose computer's ip instead of localhost
import { AuthenticationService } from "../services/AuthenticationService";
import { AuthenticationResponse } from "./authentication-api-utils";

export const baseUrl = "http://localhost:8080";
export const baseApiUrl = `${baseUrl}/api`;

export enum Language {
  PL = "pl",
  ENG = "eng",
}

export interface MultiLanguageText {
  pl: string;
  eng: string;
}

export interface FormDataFileUpload {
  type: string;
  uri: string;
  name: string;
}

export enum Method {
  GET = "GET",
  PATCH = "PATCH",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

let refreshed = false; // TODO jak pozbyć się tej flagi bez dodawania kolejnych parametrów ? ma ktoś pomysł?

export const fetchApi = async (
  endpoint: string,
  method: Method = Method.GET,
  body: any = null,
  isAuthorized: boolean = true,
  queryParams: Record<string, any> = {},
): Promise<Response> => {
  let options: RequestInit = { method: method.toString() };

  if (isAuthorized) {
    const token = await AuthenticationService.getAuthToken();
    console.log(`Token ${token}`);
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  if (method !== Method.GET) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type":
          body instanceof FormData ? "multipart/form-data" : "application/json",
      },
      body: body instanceof FormData ? body : JSON.stringify(body),
    };
  }

  const queryString = Object.keys(queryParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`,
    )
    .join("&");

  const urlWithParams = queryString
    ? `${baseApiUrl}${endpoint}?${queryString}`
    : `${baseApiUrl}${endpoint}`;

  console.log(`${method} ${urlWithParams}`);

  try {
    let response = await fetch(urlWithParams, options);

    if (response.status === 403 && isAuthorized && !refreshed) {
      refreshed = true;
      response = await tryRefreshAndRetry(endpoint, method, body, queryParams);
    } else {
      refreshed = false;
    }
    return response;
  } catch (reason) {
    console.log(`Error while fetching ${urlWithParams}. Reason: ${reason}`);
    throw reason;
  }
};

export const getImageUrl = (imageId: string, filename: string): string => {
  return `${baseUrl}/images/${imageId}/${filename}`;
};

const tryRefreshAndRetry = async (
  endpoint: string,
  method: Method,
  body: any,
  queryParams: Record<string, any>,
): Promise<Response> => {
  try {
    console.log("403 -> Refreshing TOKEN");
    await AuthenticationService.getRefreshToken()
      .then(refreshAccessToken)
      .then(AuthenticationService.authenticate);
    return await fetchApi(endpoint, method, body, true, queryParams);
  } catch (error) {
    alert("Your session has expired. Please log in again.");
    AuthenticationService.logout().then(() => {
      //TODO nie wiem jak zrobić tu nawigację do głównego ekranu
    });
  }
};

const refreshAccessToken = async (
  refreshToken: string,
): Promise<AuthenticationResponse | null> => {
  try {
    let options: RequestInit = { method: "POST" };

    options = {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    };

    const urlWithParams = `${baseApiUrl}/authentication/refresh`;
    console.log(`${urlWithParams}`);

    const response = await fetch(urlWithParams, options);
    const data = await response.json();

    if (response.ok) {
      return data as AuthenticationResponse;
    } else {
      console.error("Access token refresh failed:", data);
      return null;
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};
