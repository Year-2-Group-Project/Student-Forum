import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, View, Button } from "react-native";
import styles from "../styles/style";
import axios from "axios";

export default function userProfile({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Create Subforum"
        onPress={() => navigation.navigate("CreateSubforum")}
      />
      <StatusBar style="auto" />
    </View>
  );
}
