import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, View, Button } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";

var saved = "";

export default function LoginPage({ navigation }) {
  const [username, setUsername] = useState("");
  var [password, setPassword] = useState("");

  const authenticate = () => {
    const bcrypt = require("bcryptjs");
    
    axios
    .post("https://group-project-sql.herokuapp.com/fetch", {
      username: username,
      headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
    })
    .then((res) => {
      console.log(res.data[0]);
      saved = (res.data[0]["Password"]);
      console.log(saved);
      if (bcrypt.compareSync(password, saved)){
        navigation.navigate("Home");
      }else{
        console.log("Password/Username is incorrect")
      }
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
