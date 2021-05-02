import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, View, Button } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";

var userID;

export default function LoginPage({ navigation }) {
  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  axios.defaults.withCredentials = true;

  const authenticate = () => {
    axios
      .post("http://localhost:19007/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.message) {
          setLoginStatus(res.data.message);
        } else {
          // Logged in as loginStatus
          setLoginStatus(res.data[0].Username);
          navigation.navigate("Home");
        }
      });
  };

  React.useEffect(() => {
    axios
    .get("http://localhost:19007/login").then((res) => {
      if (res.data["loggedIn"] == true) {
          navigation.navigate("Home");
          console.log(res.data["user"]);
        }
    });
  }, []);

  // set user id
  axios
    .post("http://localhost:19007/getUserID", {
      cookieUsername: cookieUsername,
    })
    .then((res) => {
      if (cookieUsername) {
        userID = res.data[0]["Student_ID"];
        console.log("USER ID: " + res.data[0]["Student_ID"]);
      }
    });

  // console.log("yo: " + cookieUsername);

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

export { userID };
console.log("user id: " + userID);
