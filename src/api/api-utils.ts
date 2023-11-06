// when testing on expo choose computer's ip instead of localhost
import { AuthenticationService } from "../services/AuthenticationService";

export const baseUrl = "http://192.168.0.103:8080";
export const baseApiUrl = `${baseUrl}/api`;

export enum Language {
  PL = "PL",
  EN = "EN",
}

export interface MultiLanguageText {
  PL: string;
  EN: string;
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
    return await fetch(urlWithParams, options);
  } catch (reason) {
    console.log(`Error while fetching ${urlWithParams}. Reason: ${reason}`);
    throw reason;
  }
};

export const getImageUrl = (imageId: string, filename: string): string => {
  return `${baseUrl}/images/${imageId}/${filename}`;
};
