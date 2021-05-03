import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import styles from "../styles/style";
import axios from "axios";
import { useState } from "react";
import { Card, Icon, Button } from "react-native-elements";
import { subforumID } from "./home";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { postID, postTitle, postContent, postDate } from "./subforum";
import { userID } from "./login";

export default function ThreadPage({ navigation }) {
  const [comments, setComments] = useState([]);
  const [cookieUsername, setCookieUsername] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [username, setUsername] = useState("");

  React.useEffect(() => {
    axios.get("https://group-project-sql.herokuapp.com/login").then((res) => {
      setCookieUsername(res.data["user"]);
    });
  }, []);
  console.log("POST ID: " + postID);

  React.useEffect(() => {
    axios
      .post("https://group-project-sql.herokuapp.com/getComments", {
        postID: postID,
        headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
      })
      .then((res) => {
        // res.data should be all posts from specific subforum
        setComments(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const commentOnPress = () => {
    const currentDateTime = require("moment")().format("YYYY-MM-DD HH:mm:ss");
    axios
      .post("https://group-project-sql.herokuapp.com/comments/add", {
        commentInput: commentInput,
        currentDateTime: currentDateTime,
        userID: userID,
        postID: postID,
        headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
      })
      .then((res) => {
        console.log("Comment successfully inputted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // sets username from comment
  function getUsername(id) {
    axios
      .post("https://group-project-sql.herokuapp.com/comments/username", {
        id: id,
        headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
      })
      .then((res) => {
        console.log("GET USERNAME: " + res.data[0]["Username"]);
        setUsername(res.data[0]["Username"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardPosition}>
        <View style={styles.card}>
          {/* show post */}
          <Card>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 13, color: "grey" }}>
                {cookieUsername} •
              </Text>
              <Text style={{ fontSize: 13, color: "grey" }}>
                {" " + postDate}
              </Text>
            </View>
            <Card.Divider></Card.Divider>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>{postTitle}</Text>
            <Text style={{ fontSize: 13 }}>{postContent}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.button}>
                <MaterialCommunityIcons
                  name="comment-text-outline"
                  size={15}
                  color="black"
                />{" "}
                {comments.length + " "}Comments
              </Text>
              <TouchableOpacity style={styles.button}>
                <Text>
                  {" "}
                  <Ionicons name="flag-sharp" size={15} color="black" /> Report
                </Text>
              </TouchableOpacity>
            </View>
          </Card>

          {/* input for comments */}
          <Card>
            <View style={styles.cardContainer}>
              <TextInput
                style={styles.commentInput}
                multiline={true}
                numberOfLines={7}
                placeholder="Text"
                onChangeText={(text) => setCommentInput(text)}
              />
              <Button title="Comment" onPress={commentOnPress} />
            </View>
          </Card>

          {/* show all comments for this post*/}
          {comments.map((comment) => (
            <Card>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 13, color: "grey" }}>
                  {(getUsername(comment["Student_ID"]), username)} •
                </Text>
                <Text style={{ fontSize: 13, color: "grey" }}>
                  {" " + comment["Comment_date"]}
                </Text>
              </View>
              {/* <Card.Divider></Card.Divider> */}
              <Text style={{ fontSize: 13 }}>{comment["Comment_content"]}</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={styles.threadButton}>
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
