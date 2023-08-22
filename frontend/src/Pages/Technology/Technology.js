import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { Container,Row,Card,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Technology() {
  const navigate = useNavigate();
       const [technologyBlogs, settechnologyBlogs] = useState();
       async function fetchPosts(category) {
         try {
           const response = await axios.get(
             `http://localhost:5000/post/${category}`,
             {
               headers: {
                 "Content-Type": "application/json",
               },
             },
           );
           if (typeof response.data === "object" && response.data !== null) {
             settechnologyBlogs(response.data);
             return response.data;
           } else {
             console.log("server problem");
           }
         } catch (error) {
             if (error.message.includes("Network Error")) {
               console.log(
                 "Network Error: Please check your internet connection.",
               );
             } else {
               console.log(error.response.data);
             }
         }
       }
       useEffect(() => {
         fetchPosts("Technology");
       }, []);
  return( 
  <Container>
    <Row className='my-3'>
      {technologyBlogs ? (
        technologyBlogs.map((post) => (
          <Card key={post._id} id={post._id} className="col-md-4  text-dark">
            <Card.Img
              style={{ width: "100%", height: "200px" }}
              variant="top"
              src={post.imageUrl}
            />
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.description.slice(0, 150)}...</Card.Text>
              <Button
                className="readmoreBtn"
                onClick={() =>
                  navigate("/fullBlog", { state: { postData: post } })
                }
                variant="primary"
              >
                read more
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className="text-dark">Posts Loading...</div>
      )}
    </Row>
    </Container>
  )

}

export default Technology