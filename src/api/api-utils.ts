// when testing on expo choose computer's ip instead of localhost
export const baseUrl = "http://192.168.0.103:8080/api";

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
  body: any = null
): Promise<Response> => {
  var options: RequestInit = { method: method.toString() };
  if (method !== Method.GET) {
    options = {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }

  console.log(`${method} ${baseUrl}${endpoint}`);

  try {
    return await fetch(`${baseUrl}${endpoint}`, options);
  } catch (reason) {
    console.log(
      `Error while fetching ${baseUrl}${endpoint}. Reason: ${reason}`,
    );
    throw reason;
  }
};
