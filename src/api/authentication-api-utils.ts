import { fetchApi, Method } from "./api-utils";
import { User } from "./types";

interface LoginRequest {
  email: string;
  password: string;
}

export const signInUser = async (
  email: string,
  password: string,
): Promise<User | null> => {
  let loginRequest: LoginRequest = {
    email: email,
    password: password,
  };
  try {
    const response = await fetchApi(
      "/authentication/login",
      Method.POST,
      loginRequest,
    );

    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Network error:", error.message);
    return null;
  }
};
