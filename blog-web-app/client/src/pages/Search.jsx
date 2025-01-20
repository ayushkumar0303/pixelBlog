import React, { useEffect, useState } from "react";
import { TextInput } from "flowbite-react";
import { useLocation } from "react-router-dom";
function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    category: "uncategorized",
    sort: "desc",
  });

  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seeMore, setSeeMore] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermTab = urlParams.get("searchTerm");
    const sortTab = urlParams.get("sort");
    const categoryTab = urlParams.get("category");

    if (searchTermTab) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermTab,
        sort: sortTab,
        category: categoryTab,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(`"http://localhost:3000/server/post/get-posts"`);
      const data = await res.json();

      if (res.ok) {
      }
    };
    fetchPosts();
  }, [location.search]);

  return (
    <div className="min-h-screen">
      <form>
        <div>
          <label htmlFor="searchTerm">Search Term:</label>
          <TextInput id="searchTerm" type="text" placeholder="Search..." />
        </div>
      </form>
    </div>
  );
}

export default Search;
