import { Link } from "react-router-dom";
import defaultAvatar from "../assets/user.png";
import useHomeData from "../hooks/useHomeData";

export default function HomePage() {
  const {
    posts,
    myProfile,
    suggestedUsers,
    content,
    setContent,
    postError,
    handlePostSubmit,
    loading,
    user,
  } = useHomeData();

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT SIDEBAR */}
        {myProfile && (
          <aside className="lg:col-span-3 hidden lg:block sticky top-4 h-fit bg-white border border-gray-200 shadow rounded p-4">
            <div className="flex flex-col items-center">
              <img
                src={myProfile.profilePic || defaultAvatar}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mb-3 border"
              />
              <h2 className="text-lg font-bold">{myProfile.name}</h2>
              <p className="text-sm text-gray-600">{myProfile.email}</p>
              {myProfile.bio && (
                <p className="text-center text-sm mt-2">{myProfile.bio}</p>
              )}
              <Link
                to={`/profile/${user._id}`}
                className="mt-4 inline-block text-blue-600 text-sm hover:underline"
              >
                View Full Profile →
              </Link>
            </div>
          </aside>
        )}

        {/* MAIN FEED */}
        <main className="col-span-12 lg:col-span-6">
          {user && (
            <form
              onSubmit={handlePostSubmit}
              className="bg-white p-4 border border-gray-200 rounded shadow mb-6"
            >
              {postError && <p className="text-red-500">{postError}</p>}
              <textarea
                rows={3}
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded resize-none"
              />
              <div className="text-right mt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 rounded-full"
                >
                  Post
                </button>
              </div>
            </form>
          )}

          {posts.length === 0 ? (
            <p className="text-gray-600 text-center">No posts yet. Be the first to post!</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded shadow p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <Link
                      to={`/profile/${post.author._id}`}
                      className="font-semibold text-blue-600"
                    >
                      {post.author.name}
                    </Link>
                    <span className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p>{post.content}</p>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="lg:col-span-3 hidden lg:block sticky top-4 h-fit bg-white border border-gray-200 shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Suggested People</h2>
          {suggestedUsers.length === 0 ? (
            <p className="text-sm text-gray-500">No suggestions available.</p>
          ) : (
            <ul className="space-y-3">
              {suggestedUsers.map((suggested) => (
                <li key={suggested._id} className="flex items-center gap-3">
                  <img
                    src={suggested.profilePic || defaultAvatar}
                    alt={suggested.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div className="flex flex-col">
                    <Link
                      to={`/profile/${suggested._id}`}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      {suggested.name}
                    </Link>
                    <p className="text-xs text-gray-500 truncate max-w-[150px]">
                      {suggested.email}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}
