import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, View, Button, Alert } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";

export default function SignupPage({ navigation }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  axios.defaults.withCredentials = true;

  const authenticate = () => {
    // Hashing password
    const bcrypt = require("bcryptjs");
    var salt = bcrypt.genSaltSync(10);
    var hashedPW = bcrypt.hashSync(password, salt);

    axios
      .post("http://localhost:19007/signup", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: hashedPW,
        headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
      })
      .then(() => {
        console.log("Sign up successful");
        // navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text) => setFirstname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text) => setLastname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="CREATE ACCOUNT" onPress={authenticate} />
      <StatusBar style="auto" />
    </View>
  );
}
