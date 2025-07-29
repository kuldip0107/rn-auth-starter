import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validate()) {
     Alert.alert("Login Successful!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, 
    justifyContent: "center", 
    padding: 20
   },
  title: { fontSize: 26,
     fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center" 
    },
  input: { borderWidth: 1,
     padding: 10,
      marginBottom: 5,
      borderRadius: 5
     },
  error: { color: "red",
     marginBottom: 10
     },
  button: { backgroundColor: "blue",
     padding: 12, 
     borderRadius: 5,
      marginTop: 10 
    },
  buttonText: { color: "white",
     textAlign: "center",
      fontWeight: "bold"
    },
});

export default LoginScreen;
