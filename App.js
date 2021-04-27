import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import SubforumPage from "./pages/subforum";
import createSubforumPage from "./pages/createSubforum";

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
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerTitleStyle: { alignSelf: "center" },
            title: "Home",
          }}
        />
        <Stack.Screen
          name="CreateSubforum"
          component={createSubforumPage}
          options={{
            headerTitleStyle: { alignSelf: "center" },
            title: "Create a Subforum",
          }}
        />
        <Stack.Screen
          name="Subforum"
          component={SubforumPage}
          options={{
            headerTitleStyle: { alignSelf: "center" },
            title: "Subforum",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
