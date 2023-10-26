import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticate, register } from "../api/authentication-api-utils";

const TOKEN_KEY = "authToken";

export class AuthenticationService {
  static async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<boolean> {
    try {
      const response = await register(email, password, firstName, lastName);

      if (response) {
        await AsyncStorage.setItem(TOKEN_KEY, response.token);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  }

  static async getLoginStatus(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      return !!token;
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;
    }
  }

  static async authenticate(email: string, password: string): Promise<boolean> {
    try {
      const response = await authenticate(email, password);
      console.log(response);
      if (response) {
        await AsyncStorage.setItem(TOKEN_KEY, response.token);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error during authentication:", error);
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

  static async removeAuthToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error removing authentication token:", error);
      throw error;
    }
  }
}
