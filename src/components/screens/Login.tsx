import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface State {
  form: { email: string; password: string };
  errors: Partial<{ email: string; password: string }>;
  showPassword: boolean;
}

const FbLogin: React.FC = () => {
  const [state, setState] = useState<State>({
    form: { email: "", password: "" },
    errors: {},
    showPassword: false,
  });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateField = (name: keyof State["form"], value: string) => {
    let error = "";
    if (name === "email" && !validateEmail(value)) error = "Enter a valid email";
    if (name === "password" && value.length < 6)
      error = "Password must be at least 6 characters";

    setState((prev) => ({
      ...prev,
      errors: { ...prev.errors, [name]: error },
    }));
  };

  const handleInputChange = (name: keyof State["form"], value: string) => {
    setState((prev) => ({
      ...prev,
      form: { ...prev.form, [name]: value },
      errors: { ...prev.errors, [name]: "" }, // clear error while typing
    }));
  };

  const handleLogin = () => {
    validateField("email", state.form.email);
    validateField("password", state.form.password);

    if (
      state.form.email &&
      state.form.password &&
      validateEmail(state.form.email) &&
      state.form.password.length >= 6
    ) {
      Alert.alert("✅ Login Successful", `Welcome ${state.form.email}`);
      setState({
        form: { email: "", password: "" },
        errors: {},
        showPassword: false,
      });
    } else {
      Alert.alert("⚠️ Please fill correct details");
    }
  };

  const isDisabled =
    !state.form.email ||
    !state.form.password ||
    !validateEmail(state.form.email) ||
    state.form.password.length < 6;

  return (
    <View style={styles.container}>
      
      <Image
        source={{
          uri: "https://as2.ftcdn.net/v2/jpg/05/89/82/55/1000_F_589825542_quWl3JNZZgwlwi40s0aQUVHNbMYvtsnd.jpg",
        }}
        style={styles.logo}
      />

      <TextInput
        style={styles.input}
        placeholder="Email or Phone"
        value={state.form.email}
        onChangeText={(text) => handleInputChange("email", text)}
        onBlur={() => validateField("email", state.form.email)}
        keyboardType="email-address"
      />
      {state.errors.email ? (
        <Text style={styles.error}>{state.errors.email}</Text>
      ) : null}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!state.showPassword}
          value={state.form.password}
          onChangeText={(text) => handleInputChange("password", text)}
          onBlur={() => validateField("password", state.form.password)}
        />
        <TouchableOpacity
          onPress={() =>
            setState((prev) => ({ ...prev, showPassword: !prev.showPassword }))
          }
          style={styles.eyeButton}
        >
          <Ionicons
            name={state.showPassword ? "eye" : "eye-off"}
            size={24}
            color={state.showPassword ? "#0c0d0d" : "#555"}
          />
        </TouchableOpacity>
      </View>
      {state.errors.password ? (
        <Text style={styles.error}>{state.errors.password}</Text>
      ) : null}

      <TouchableOpacity
        style={[styles.button, isDisabled && styles.disabledButton]}
        onPress={handleLogin}
        disabled={isDisabled}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.link}>Forgotten password?</Text>
      </TouchableOpacity>

      <View style={styles.separator} />

      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}
        >Create New Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#2791F5",
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
  },
  eyeButton: {
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    fontSize: 13,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#1877f2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: "#cea71bff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#dbe1e8ff",
    fontSize: 16,
    marginVertical: 10,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 15,
  },
  createButton: {
    width: "80%",
    height: 45,
    backgroundColor: "#42b72a",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export { FbLogin };
