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

 const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const validateEmail = (inputEmail: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const handleLogin = () => {
    let valid = true;
    const tempErrors = { email: "", password: "" };

    if (!validateEmail(email)) {
      tempErrors.email = "Enter a valid email";
      valid = false;
    }

    if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(tempErrors);

    if (valid) {
      Alert.alert("Login Successful", `Welcome ${email}`);
    }
  };

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
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password ? (
        <Text style={styles.error}>{errors.password}</Text>
      ) : null}

      <TouchableOpacity
        style={[
          styles.button,
          !email || !password ? styles.disabledButton : null,
        ]}
        onPress={handleLogin}
        disabled={!email || !password}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.link}>Forgotten password?</Text>
      </TouchableOpacity>

      <View style={styles.separator} />

      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>Create New Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius: 75, 
    resizeMode: "cover",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
  },
  error: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 8,
    fontSize: 13,
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
    backgroundColor: "#7daaff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#1877f2",
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

// export default Login;

export { Login as FbLogin };
