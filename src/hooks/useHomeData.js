import { useState, useEffect } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function useHomeData() {
  const [posts, setPosts] = useState([]);
  const [myProfile, setMyProfile] = useState(null);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [content, setContent] = useState("");
  const [postError, setPostError] = useState("");
  const { user, loading } = useAuth();

  // Fetch Posts
  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.log("Error loading posts", err);
    }
  };

  // Fetch My Profile
  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/me");
      setMyProfile(res.data);
    } catch (err) {
      console.log("Error fetching profile", err);
    }
  };

  // Fetch Suggested Users
  const fetchSuggestions = async () => {
    try {
      const res = await API.get("/users/");
      setSuggestedUsers(res.data);
    } catch (err) {
      console.log("Error fetching suggested users", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchSuggestions();
    }
  }, [user]);

  // Handle New Post Submit
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setPostError("Post content cannot be empty.");
      return;
    }

    try {
      await API.post("/posts", { content });
      setContent("");
      setPostError("");
      await fetchPosts();
    } catch (err) {
      setPostError("Failed to create post.");
    }
  };

  return {
    posts,
    myProfile,
    suggestedUsers,
    content,
    setContent,
    postError,
    handlePostSubmit,
    loading,
    user,
  };
}
