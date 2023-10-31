// when testing on expo choose computer's ip instead of localhost
import { AuthenticationService } from "../services/AuthenticationService";

export const baseUrl = "http://192.168.232.58:8080/api";

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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }

  const queryString = Object.keys(queryParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`,
    )
    .join("&");

  const urlWithParams = queryString
    ? `${baseUrl}${endpoint}?${queryString}`
    : `${baseUrl}${endpoint}`;

  console.log(`${method} ${urlWithParams}`);

  try {
    return await fetch(urlWithParams, options);
  } catch (reason) {
    console.log(`Error while fetching ${urlWithParams}. Reason: ${reason}`);
    throw reason;
  }
};
