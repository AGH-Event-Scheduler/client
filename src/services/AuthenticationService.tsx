import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationResponse } from "../api/authentication-api-utils";

const TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const IS_LOGGED_AS_ADMIN = "admin";

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
      await AuthenticationService.removeAuthToken();
      await AuthenticationService.removeRefreshToken();
      await AuthenticationService.removeIsAdmin();
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

  static async getRefreshToken(): Promise<string> {
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

  static async setIsAdmin(admin: Boolean) {
    console.log(`IS ADMIN authser: ${admin}`);
    await AsyncStorage.setItem(IS_LOGGED_AS_ADMIN, String(admin));
  }

  static async getIsAdmin(): Promise<Boolean> {
    try {
      return (await AsyncStorage.getItem(IS_LOGGED_AS_ADMIN)) == "true";
    } catch (error) {
      console.error("Error retrieving if is logged as admin", error);
      return false;
    }
  }

  private static async removeIsAdmin(): Promise<void> {
    try {
      await AsyncStorage.removeItem(IS_LOGGED_AS_ADMIN);
    } catch (error) {
      console.error("Error removing is logged a s admin:", error);
      throw error;
    }
  }
}
