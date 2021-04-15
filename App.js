import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";

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
            title: "login",
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
