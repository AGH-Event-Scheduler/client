import { baseApiUrl, fetchApiWithRefresh, Method } from "./api-utils";
import { AuthenticationService } from "../services/AuthenticationService";
import { UserWithRole } from "./types";

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<Boolean> => {
  const url = "/authentication/register";
  const body = { email, password, firstName, lastName };

  try {
    const response = await fetchApiWithRefresh({
      url: url,
      method: Method.POST,
      body: body,
      isAuthorized: false,
    });

    if (response.ok) {
      return true;
    } else {
      console.error("Registration failed");
      return false;
    }
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const authenticate = async (
  email: string,
  password: string,
): Promise<AuthenticationResponse | null> => {
  const url = "/authentication/authenticate";
  const body = { email, password };

  try {
    const response = await fetchApiWithRefresh({
      url: url,
      method: Method.POST,
      body: body,
      isAuthorized: false,
    });
    const data = await response.json();
    if (response.ok) {
      console.log("OK LOGGED");
      return data as AuthenticationResponse;
    } else {
      console.error("Authentication failed:", data);
      return null;
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    throw error;
  }
};

export const logout = async () => {
  const url = "/authentication/logout";

  try {
    let refreshToken = await AuthenticationService.getRefreshToken();
    const response = await fetchApiWithRefresh({
      url: url,
      method: Method.POST,
      isAuthorized: false,
      queryParams: {
        refreshToken: refreshToken,
      },
    });

    if (response.ok) {
      console.log("OK LOGGED OUT");
      return true;
    } else {
      console.error("Logging out failed:");
      return false;
    }
  } catch (error) {
    console.error("Error during logging out :", error);
    throw error;
  }
};

export const refreshAccessToken = async (
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

    const response = await fetch(urlWithParams, options);
    const data = await response.json();

    if (response.ok) {
      return data as AuthenticationResponse;
    } else {
      console.log("Access token refresh failed:", data);
      return null;
    }
  } catch (error) {
    console.log("Error refreshing access token:", error);
    return null;
  }
};

export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
}
