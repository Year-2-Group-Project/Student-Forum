import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, View, Button, Alert, Text } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";

// Validation function
function preg_match(regex, str) {
  return new RegExp(regex).test(str);
}

export default function SignupPage({ navigation }) {
  const [status, setStatus] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  var users = [];

  axios.defaults.withCredentials = true;

  React.useEffect(() => {
    axios
      .get("https://group-project-sql.herokuapp.com/checkUsers")
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          users.push(res.data[i].Username);
        }
      });
  });

  const authenticate = () => {
    var validLogin = true;
    setStatus("");

    // Check firstname
    if (preg_match(/[a-z-'\s]+/i, firstname)) {
      if (!preg_match(/[-][']|['][-]|[-][-]|['][']/, firstname)) {
        if (preg_match(/^[a-z']/i, firstname)) {
          if (preg_match(/[-]$/i, firstname)) {
            validLogin = false;
            setStatus("First name is invalid, it cannot end with a hyphen");
          }
        } else {
          validLogin = false;
          setStatus(
            "First name is invalid, it must start with a letter or apostrophe"
          );
        }
      } else {
        validLogin = false;
        setStatus(
          "First name is invalid, it cannot contain a combination of hyphen's or apostrophe's"
        );
      }
    } else {
      validLogin = false;
      setStatus("First name is invalid, please try again");
    }
    if (firstname.length > 30) {
      validLogin = false;
      setStatus(
        "First name is invalid, please enter a first name with less than 30 characters"
      );
    }

    // Check lastname
    if (preg_match(/[a-z-'\s]+/i, lastname)) {
      if (!preg_match(/[-][']|['][-]|[-][-]|['][']/, lastname)) {
        if (preg_match(/^[a-z']/i, lastname)) {
          if (preg_match(/[-]$/i, lastname)) {
            validLogin = false;
            setStatus("Last name is invalid, it cannot end with a hyphen");
          }
        } else {
          validLogin = false;
          setStatus(
            "Last name is invalid, it must start with a letter or apostrophe"
          );
        }
      } else {
        validLogin = false;
        setStatus(
          "Last name is invalid, it cannot contain a combination of hyphen's or apostrophe's"
        );
      }
    } else {
      validLogin = false;
      setStatus("Last name is invalid, please try again");
    }
    if (lastname.length > 30) {
      validLogin = false;
      setStatus(
        "Last name is invalid, please enter a last name with less than 30 characters"
      );
    }

    // Email check
    if (
      !(
        preg_match(/^[a-z\d.]+[^.][@]student.liverpool.ac.uk$/i, email) ||
        preg_match(/^[a-z\d.]+[^.][@]liverpool.ac.uk$/i, email)
      )
    ) {
      validLogin = false;
      setStatus("Email is invalid, please enter a valid student email");
    }
    if (email.length > 50) {
      validLogin = false;
      setStatus(
        "Email is invalid, please enter an email with less than 50 characters"
      );
    }

    // Username check
    if (username.length > 10) {
      validLogin = false;
      setStatus(
        "Username is invalid, please enter a username with less than 10 characters"
      );
    }
    if (!preg_match(/^[a-z-\d]+$/i, username)) {
      validLogin = false;
      setStatus(
        "Username is invalid, username must contain only letters, numbers and '-'"
      );
    }
    if (users.includes(username)) {
      validLogin = false;
      setStatus("Username already exists");
    }

    // Password check
    if (!(password.length >= 8 && password.length <= 16)) {
      validLogin = false;
      setStatus(
        "Password is invalid, password must be between 8 and 16 characters long"
      );
    }
    if (
      preg_match(
        /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))+/i,
        password
      )
    ) {
      validLogin = false;
      setStatus(
        "Password is invalid, password must contain one lower case character, one upper case character, one number and no special characters"
      );
    }

    // Hashing password
    const bcrypt = require("bcryptjs");
    var salt = bcrypt.genSaltSync(10);
    var hashedPW = bcrypt.hashSync(password, salt);

    if (validLogin) {
      axios
        .post("https://group-project-sql.herokuapp.com/signup", {
          firstname: firstname,
          lastname: lastname,
          email: email,
          username: username,
          password: hashedPW,
          headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
        })
        .then(() => {
          console.log("Sign up successful");
          navigation.navigate("Home");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{status}</Text>
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
