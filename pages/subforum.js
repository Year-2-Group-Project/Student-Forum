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
import { subforumTitle } from "./home";

let postID;
let postTitle;
let postContent;
let postDate;

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

  function postOnPress(post) {
    postID = post["Post_ID"];
    postTitle = post["Post_title"];
    postContent = post["Post_content"];
    postDate = post["Post_date"];
    navigation.navigate("Thread");
  }

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
      <Button title="Create Post" onPress={() => createPost} />
      <View style={{ flexDirection: "row" }}>
        { isPresident == true ? <Button title="Hello" /> : <Text>Hello world</Text>}
        <Button title="Join" onPress={join} />
        <Button title="role" onPress={getrole} />
        <Button title="Join" onPress={() => join} />
      </View>
      <View style={styles.cardPosition}>
        <View style={styles.card}>
          {posts.map((post) => (
            <TouchableOpacity onPress={() => postOnPress(post)}>
              <Card>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.cardHeader}>{cookieUsername} •</Text>
                  <Text style={styles.cardHeader}>{post["Post_date"]}</Text>
                </View>
                <Card.Divider></Card.Divider>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>
                  {post["Post_title"]}
                </Text>
                <Text style={{ fontSize: 13 }}>{post["Post_content"]}</Text>
                <View style={{ flexDirection: "row" }}>
                  {/* touchable comments button */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => postOnPress(post)}
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

                  {/* touchable report button */}
                  <TouchableOpacity style={styles.button}>
                    <Text>
                      {" "}
                      <Ionicons
                        name="flag-sharp"
                        size={15}
                        color="black"
                      />{" "}
                      Report
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
          <StatusBar style="auto" />
        </View>
      </View>
    </View>
  );
}

export { postID };
export { postTitle };
export { postContent };
export { postDate };
