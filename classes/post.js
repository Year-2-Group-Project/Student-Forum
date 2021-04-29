import React, { Component } from "react";
import { Card } from "react-native-elements";
import { render } from "react-dom";
import { Text } from "react-native";

class Post extends Component {
    render() {
        return {
            {posts.map((post) => (
                <Card>
                  <Card.Title>{post["Post_title"]}</Card.Title>
                  <Card.Divider />
                  <Card.Title>{post["Post_content"]}</Card.Title>
                  <Card.Divider />
                  <Card.Title>{post["Post_date"]}</Card.Title>
                </Card>
              ))}
        }
    }
}

// create get for title

// create get for description

// create get for date

// create get for number of members

export default Post;
