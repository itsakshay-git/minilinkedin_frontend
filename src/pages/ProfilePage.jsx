import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import defaultAvatar from "../assets/user.png";

export default function ProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        const [profileRes, postsRes] = await Promise.all([
          API.get(`/users/${id}`),
          API.get(`/posts/user/${id}`),
        ]);

        setProfile(profileRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndPosts();
  }, [id]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (!profile) return <div className="text-center p-8 text-red-500">User not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Profile Header */}
      <div className="bg-white border border-gray-300 rounded-lg shadow p-6 mb-8">
        <div className="flex items-center gap-6">
          <img
            src={profile.profilePic || defaultAvatar}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
            <p className="text-sm text-gray-500">{profile.email}</p>
            {profile.bio && (
              <p className="mt-2 text-gray-700">{profile.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Posts */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Posts by {profile.name}</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 mb-4"
            >
              <p className="text-gray-800">{post.content}</p>
              <p className="text-xs text-gray-400 mt-2">
                Posted on {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
