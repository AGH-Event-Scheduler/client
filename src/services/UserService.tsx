import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { signInUser } from "../api/authentication-api-utils";
import { User } from "../api/types";

export class UserService {
  static async loginUser(email, password) {
    let user: User;
    try {
      user = await signInUser(email, password);
      if (user != null) {
        console.log("User logged in:", user);
        await this.storeUser(user);
        await this.setLoginStatus(true);
        return true;
      }
    } catch (error) {
      console.error("Login error:", error.message);
      Alert.alert("Error", "An error occurred during login.");
    }
    return user != null;
  }

  static async logoutUser() {
    await this.removeUser();
    await this.setLoginStatus(false);
  }

  static async storeUser(user) {
    try {
      const userJson = JSON.stringify(user);
      await AsyncStorage.setItem("user", userJson);
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  }

  static async getUser() {
    try {
      const userJson = await AsyncStorage.getItem("user");
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error("Error retrieving user data:", error);
      return null;
    }
  }

  static async removeUser() {
    try {
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error("Error removing user data:", error);
    }
  }

  static async setLoginStatus(isLoggedIn) {
    try {
      await AsyncStorage.setItem("isLoggedIn", isLoggedIn.toString());
    } catch (error) {
      console.error("Error setting login status:", error);
    }
  }

  static async getLoginStatus() {
    try {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      return isLoggedIn ? JSON.parse(isLoggedIn) : false;
    } catch (error) {
      console.error("Error retrieving login status:", error);
      return false;
    }
  }
}
