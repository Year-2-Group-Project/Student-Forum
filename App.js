import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupPage from "./Signup";
import styles from "./style";
import axios from "axios";
import { useState } from "react";

function LoginPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authenticate = () => {
    axios
      .post("https://group-project-sql.herokuapp.com/create", {
        username: username,
        password: password,
        headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
      })
      .then(() => {
        console.log("success");
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

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            headerTitleStyle: { alignSelf: "center" },
            title: "Log In To Your Account chariton",
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupPage}
          options={{
            headerTitleStyle: { alignSelf: "center" },
            title: "Sign Up",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
