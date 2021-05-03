import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";
import { Card, Button } from "react-native-elements";
import { subforumID } from "./home";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { userID } from "./login";

var isPresident = false;

export default function SubforumPage({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [cookieUsername, setCookieUsername] = useState("");

  React.useEffect(() => {
    axios.get("http://localhost:19007/login").then((res) => {
      setCookieUsername(res.data["user"]);
    });
  }, []);

  axios
    .post("http://localhost:19007/posts", {
      subforumID: subforumID,
      headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
    })
    .then((res) => {
      // res.data should be all posts from specific subforum
      setPosts(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  const commentOnPress = () => {
    navigation.navigate("Thread");
  };

  const createPost = () => {
    navigation.navigate("createPost");
  };

  const join = () => {
    axios
      .post("http://localhost:19007/join", {
        userID: userID,
        subforumID: subforumID,
        headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
      })
      .then((res) => {

        console.log("Submit post successful");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  
  
  const getrole = () => {
    axios
      .post("http://localhost:19007/getRole", {
        userID: userID,
        subforumID: subforumID,
        headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
      })
      .then((res) => {
        if (res.data[0]["Role"] == "President"){
          isPresident == true
          console.log("is true")
        }
        console.log("Role: " + res.data[0]["Role"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
var x = 1

  return (
    <View style={styles.cardContainer}>
      <Button title="Create Post" onPress={createPost} />
      <View style={{ flexDirection: "row" }}>
        { isPresident == true ? <Button title="Hello" /> : <Text>Hello world</Text>}
        <Button title="Join" onPress={join} />
        <Button title="role" onPress={getrole} />
      </View>
      <View style={styles.cardPosition}>
        <View style={styles.card}>
          {posts.map((post) => (
            <Card>
              <Text style={(styles.cardHeader, { fontWeight: "500" })}>
                Subforum Title
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.cardHeader}>Username •</Text>
                <Text style={styles.cardHeader}>{post["Post_date"]}</Text>
              </View>
              <Card.Divider></Card.Divider>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                {post["Post_title"]}
              </Text>
              <Text style={{ fontSize: 13 }}>{post["Post_content"]}</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={commentOnPress}
                >
                  <Text>
                    <MaterialCommunityIcons
                      name="comment-text-outline"
                      size={15}
                      color="black"
                    />{" "}
                    Comments
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={commentOnPress}
                >
                  <Text>
                    {" "}
                    <Ionicons name="flag-sharp" size={15} color="black" />{" "}
                    Report
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
          <StatusBar style="auto" />
        </View>
      </View>
    </View>
  );
}
