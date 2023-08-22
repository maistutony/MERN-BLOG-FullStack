import React,{useContext} from "react";
import { Table } from "react-bootstrap";
import "./DisplayUserBlogs.css"
import { UserContext } from "../../Context/Context";

const DisplayUserBlogs = () => {
  const { userData } = useContext(UserContext);
  const userBlogs = userData.userPosts;
  return (
    <div className="user-blogs">
      <h1>My Blogs</h1>
      <Table striped bordered hover>
        <thead>
          <tr className="headings">
            <th>Title</th>
            <th>Category</th>
            <th>Description</th>
            <th>Total comments</th>
          </tr>
        </thead>
        <tbody>
          {userData && userBlogs.map((blog) => (
            <tr key={blog._id}>
              <td className="blog-title fw-bold">{blog.title}</td>
              <td>{ blog.category}</td>
              <td>{blog.description.slice(0,150)}</td>
              <td>10 comment</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DisplayUserBlogs;
