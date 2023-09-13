import React, { useContext, useEffect, useState } from "react";
import UserRoute from "../../components/routes/UserRoute";
import PostForm from "../../components/forms/PostForm ";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import PostList from "../../components/cards/PostList";

const Dashboard = () => {
  const [state, setState] = useContext(UserContext);
  // state
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState();
  // posts
  const [posts, setPosts] = useState();

  const router = useRouter();

  useEffect(() => {
    if (state && state.token) fetchUserPosts();
  }, [state && state.token]);

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get("/user-posts");
      // console.log('user posts', data)
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/create-post", { content, image });
      console.log("create post response => ", data);
      if (data.error) {
        toast.error(data.error);
      } else {
        fetchUserPosts()
        toast.success("Post created");
        setContent("");
        setImage({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      // console.log(data)
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm('Are you sure?')
      if(!answer) return
      const {data} = await axios.delete(`/delete-post/${post._id}`);
      toast.error('Post deleted')
      fetchUserPosts()
    } catch (error) {
      console.log(error)
    }
  } 
  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 text-light bg-default-image">
          <div className="col text-center">
            <h1>Newsfeed</h1>
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-8">
            <PostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            ></PostForm>
            <br />
            <PostList posts={posts} handleDelete={handleDelete}></PostList>
          </div>

          <div className="col-md-4">Sidebar</div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Dashboard;


