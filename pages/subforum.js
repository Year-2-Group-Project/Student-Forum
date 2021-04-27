import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, View, Button } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";

export default function SubforumPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authenticate = () => {
    axios
      .get("https://group-project-sql.herokuapp.com/subforum", {
        headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
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

      <Button title="Log In" onPress={authenticate} />
      <Button title="Signup" onPress={() => navigation.navigate("Signup")} />
      <StatusBar style="auto" />
    </View>
  );
}
