import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const [serverError, setServerError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    const actualData = {
      email: data?.Email,
      password: data?.password,
    };
    console.log(actualData);

    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/api/user/login/",
        actualData
      );

      console.log("API response:", response.data);

      const { msg, token: { access, refresh } } = response.data;
    //   console.log(access)
    //   console.log(refresh)

      if (typeof msg === "string") {
        // Store tokens in AsyncStorage if they are valid
        storeToken({ access, refresh });
        Toast.show({
          type: "success",
          text1: msg,
          position: "top",
          visibilityTime: 2000,
        });
        navigation.navigate("Home");
      } else {
        throw new Error("Unexpected message format");
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleErrors = (error) => {
    if (error.response) {
      const { errors, non_field_errors } = error.response.data;
      setServerError(errors || {});

      if (non_field_errors) {
        Toast.show({
          type: "error",
          text1: non_field_errors[0],
          position: "top",
          visibilityTime: 3000,
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "An error occurred. Please try again.",
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login</Text>
      <Text>Email</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="Email"
      />
      {serverError?.email && (
        <Text style={styles.error}>{serverError.email[0]}</Text>
      )}

      <Text>Password</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {serverError?.password && (
        <Text style={styles.error}>{serverError.password[0]}</Text>
      )}
      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 200, // Adjust width based on your design needs
    height: 100, // Adjust height based on your design needs
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

// Function to store tokens in local storage
const storeToken = async (value) => {
  if (value) {
    const { access, refresh } = value;

    // Check if access or refresh tokens are valid before storing
    if (access) {
      await AsyncStorage.setItem("access_token", access);
    } else {
      console.warn("Access token is undefined or null");
    }

    if (refresh) {
      await AsyncStorage.setItem("refresh_token", refresh);
    } else {
      console.warn("Refresh token is undefined or null");
    }
  }
};

export default LoginScreen;
