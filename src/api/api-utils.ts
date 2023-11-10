// when testing on expo choose computer's ip instead of localhost
import { AuthenticationService } from "../services/AuthenticationService";
import { logout, refreshAccessToken } from "./authentication-api-utils";
import { navigateToLogInPage } from "../utils/RootNavigation";

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

let isRefreshing = false;

const fetchApi = async (
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
  }
};

export const fetchApiWithRefresh = async (
  endpoint: string,
  method: Method = Method.GET,
  body: any = null,
  isAuthorized: boolean = true,
  queryParams: Record<string, any> = {},
): Promise<Response> => {
  try {
    let response = await fetchApi(
      endpoint,
      method,
      body,
      isAuthorized,
      queryParams,
    );
    if (response.status === 403 && isAuthorized && !isRefreshing) {
      console.log("403 -> Refreshing TOKEN");
      isRefreshing = true;
      try {
        await AuthenticationService.getRefreshToken()
          .then(refreshAccessToken)
          .then(AuthenticationService.authenticate);
        response = await fetchApi(endpoint, method, body, true, queryParams);
        if (response.status === 403 && isAuthorized) {
          alert("Your session has expired. Please log in again.");
          await logout().then((loggedOut) => {
            if (loggedOut) {
              console.log("Logged out");
            } else {
              console.error("Error during logging out");
            }
          });
          AuthenticationService.logout().then(() => {
            navigateToLogInPage();
          });
        } else {
          return response;
        }
      } catch (refreshedError) {
        return refreshedError;
      } finally {
        isRefreshing = false;
      }
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const getImageUrl = (imageId: string, filename: string): string => {
  return `${baseUrl}/images/${imageId}/${filename}`;
};
