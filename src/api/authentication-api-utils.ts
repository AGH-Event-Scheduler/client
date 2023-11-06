import { fetchApi, Method } from "./api-utils";
import { AuthenticationService } from "../services/AuthenticationService";

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<AuthenticationResponse | null> => {
  const endpoint = "/authentication/register";
  const body = { email, password, firstName, lastName };

  try {
    const response = await fetchApi(endpoint, Method.POST, body, false);
    const data = await response.json();

    if (response.ok) {
      return data as AuthenticationResponse;
    } else {
      console.error("Registration failed:", data);
      return null;
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
  const endpoint = "/authentication/authenticate";
  const body = { email, password };

  try {
    const response = await fetchApi(endpoint, Method.POST, body, false);
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
  const endpoint = "/authentication/logout";

  try {
    const response = await fetchApi(endpoint, Method.POST, null, false, {
      refreshToken: AuthenticationService.getRefreshToken(),
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

export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
}
