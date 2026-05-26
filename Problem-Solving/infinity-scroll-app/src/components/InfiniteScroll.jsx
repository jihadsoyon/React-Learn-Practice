import { useEffect, useState } from "react";
import axios from "axios";

function InfiniteScroll() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    if (loading) return;
    setLoading(true);

    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
    );

    setPosts((prev) => [...prev, ...res.data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="card">
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}

      {loading && <p className="loader">Loading more...</p>}
    </div>
  );
}

export default InfiniteScroll;