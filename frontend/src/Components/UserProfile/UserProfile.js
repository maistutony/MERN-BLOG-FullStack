import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import "./userProfile.css"

const user = {
  profilePic: "https://example.com/profile-pic.jpg",
  name: "John Doe",
  bio: "Frontend Developer | UI/UX Enthusiast",
  posts: 42,
  email: "john@example.com",
  // Add more user information as needed
};
const UserProfile = () => {
  return (
    <div className="cardBackground">
      <Card className="userCard">
        <Card.Img
          className="card-image my-1 d-flex align-self-center"
          style={{ width: "5rem", height: "5rem" }}
          variant="top"
          alt="Silhouette of mountains"
          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
        />
        <Card.Body>
          <Card.Title className="my-2 text-dark">{user.name}</Card.Title>
          <Card.Text className="my-2 text-dark">{user.bio}</Card.Text>
        </Card.Body>
        <ListGroup className="my-2 list-group-flush">
          <ListGroup.Item className="my-2">
            Posts Written: {user.posts}
          </ListGroup.Item>
          <ListGroup.Item className="my-2">Email: {user.email}</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default UserProfile;
