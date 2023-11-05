import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationResponse } from "../api/authentication-api-utils";

const TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export class AuthenticationService {
  static async authenticate(
    response: AuthenticationResponse,
  ): Promise<boolean> {
    if (response) {
      await AsyncStorage.setItem(TOKEN_KEY, response.accessToken);
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
      return true;
    }
    return false;
  }

  static async logout(): Promise<boolean> {
    try {
      // Remove tokens
      await AuthenticationService.removeAuthToken();
      await AuthenticationService.removeRefreshToken();

      // Return a boolean indicating success/failure if needed
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  }

  static async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error retrieving authentication token:", error);
      return null;
    }
  }

  static async getRefreshToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error("Error retrieving refresh token:", error);
      return null;
    }
  }

  private static async removeAuthToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error removing authentication token:", error);
      throw error;
    }
  }

  private static async removeRefreshToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error("Error removing refresh token:", error);
      throw error;
    }
  }
}
