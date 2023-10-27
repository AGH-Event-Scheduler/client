import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { TextInputContainer } from "../../components/TextInputContainer";
import { globalStyles } from "../../styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { AuthenticationService } from "../../services/AuthenticationService";

export const LoginPageView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@(student\.)?agh\.edu\.pl$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    } else {
      try {
        if (await AuthenticationService.authenticate(email, password)) {
          console.log("Login successful!");
          // @ts-ignore
          navigation.navigate("Main");
        } else {
          Alert.alert("Login Failed", "Please check your email and password."); // Handle unsuccessful login
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };

  const handleSignUp = () => {
    console.log("Sign up link pressed");
  };

  const handleForgotPassword = () => {
    console.log("Forgot password link pressed");
  };

  const handleUseAGHAccount = () => {
    console.log("Use AGH account button pressed");
  };

  const handleContinueAsGuest = () => {
    console.log("Continue as guest button pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titlePart1}>Welcome to</Text>
        <Text style={styles.titlePart2}> AGH Events Hub</Text>
      </View>

      <TextInputContainer
        label="Email"
        placeholder="email@agh.edu.pl"
        value={email}
        onChangeText={(text) => setEmail(text)}
        description="AGH domain email address"
      />
      <TextInputContainer
        label="Password"
        placeholder="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        description="minimum password length: 8"
        linkText="Forgot password?"
        onLinkPress={() => handleForgotPassword()}
        isPassword={true}
      />

      <View style={styles.dividerContainer}>
        <AppButton
          onPress={handleSignIn}
          type="primary"
          title={"\t\tSign in\t\t"}
          size="default"
        />
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Do not have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.dividerTextLink}>Sign up!</Text>
        </TouchableOpacity>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.dividerContainer}>
        <Text style={styles.dividerText}>or</Text>
      </View>

      <View style={styles.additionalMethodsContainer}>
        <AppButton
          onPress={handleUseAGHAccount}
          type="primary"
          title={"Use AGH account"}
          size="small"
        />
        <AppButton
          onPress={handleContinueAsGuest}
          type="gray"
          title={"Continue as guest"}
          size="small"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  titleContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "20%",
    marginTop: "10%",
  },
  titlePart1: {
    ...globalStyles.descriptionTitle,
    fontSize: 30,
  },
  titlePart2: {
    ...globalStyles.title,
    fontSize: 35,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
    marginHorizontal: 4,
  },
  dividerText: {
    color: "black",
  },
  dividerTextLink: {
    color: "#016531",
  },
  additionalMethodsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
});
