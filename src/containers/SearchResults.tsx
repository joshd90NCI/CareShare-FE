import PostInCollection from '../components/PostInCollection.tsx';
import { useContext, useEffect, useState } from 'react';
import { Post } from '../types.ts';
import { searchContext } from '../contexts/SearchContext.tsx';
import config from '../config.ts';
import { genericFetch } from '../utils.ts';
import { AlertContext } from '../contexts/AlertContext.tsx';

// This container is responsible for searching through
const SearchResults = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { search } = useContext(searchContext);
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    if (search.length < 2) {
      return;
    }
    const fetchSearch = async () => {
      // we need to make sure that spaces etc. don't mess up our query
      const encodedSearch = encodeURIComponent(search);
      const response = await genericFetch(
        `${config.apiEndpoint}/posts/search?term=${encodedSearch}`,
        {},
        showAlert
      );
      if (!response) return;
      // Type check our response and set the posts per that response
      if (Array.isArray(response)) {
        setPosts(response);
      }
    };

    fetchSearch().then();
  }, [search, showAlert]);

  // Map through all the returned posts and display them
  return (
    <div className="bg-green-50 bg-opacity-50 p-10">
      {posts.map((post) => (
        <PostInCollection post={post} key={post.createdAt} />
      ))}
    </div>
  );
};

export default SearchResults;
