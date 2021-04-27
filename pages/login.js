import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, View, Button } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";

export default function LoginPage({ navigation }) {
  const [username, setUsername] = useState("");
  var [password, setPassword] = useState("");

  const authenticate = () => {
    const bcrypt = require("bcryptjs");
    var salt = bcrypt.genSaltSync(10);
    var hashedPW = bcrypt.hashSync(password, salt);

    console.log(username);
    console.log(password);
    console.log(hashedPW);

    axios
    .post("https://group-project-sql.herokuapp.com/fetch", {
      username: username,
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
