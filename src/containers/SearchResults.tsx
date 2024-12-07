import PostInCollection from '../components/PostInCollection.tsx';
import { useContext, useEffect, useState } from 'react';
import { Post } from '../types.ts';
import { searchContext } from '../contexts/SearchContext.tsx';
import config from '../config.ts';
import { getErrorMessageFromStatus } from '../utils.ts';
import { AlertContext } from '../contexts/AlertContext.tsx';

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
      try {
        const response = await fetch(`${config.apiEndpoint}/posts/search?term=${encodedSearch}`, {
          credentials: 'include',
          headers: { 'Content-type': 'application/json' },
        });
        if (!response.ok) {
          const message = getErrorMessageFromStatus(response.status);
          showAlert(message, 'error');
        }
        const result = await response.json();
        if (Array.isArray(result)) {
          setPosts(result);
        }
      } catch (error) {
        const message = `An unexpected error occurred: ${(error as Error).message}`;
        showAlert(message, 'error');
      }
    };

    fetchSearch().then();
  }, [search, showAlert]);

  return (
    <div className="bg-green-50 bg-opacity-50 p-10">
      {posts.map((post) => (
        <PostInCollection post={post} key={post.createdAt} />
      ))}
    </div>
  );
};

export default SearchResults;
