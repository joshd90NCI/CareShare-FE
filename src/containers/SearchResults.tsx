import PostInCollection from '../components/PostInCollection.tsx';
import { useContext, useEffect, useState } from 'react';
import { Post } from '../types.ts';
import { searchContext } from '../contexts/SearchContext.tsx';
import config from '../config.ts';

// TODO we need to debounce in the actual search bar then we need to make a fetch request in the useeffect and populate state on the fetch request
const SearchResults = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { search } = useContext(searchContext);

  useEffect(() => {
    const fetchSearch = async () => {
      // we need to make sure that spaces etc. don't mess up our query
      const encodedSearch = encodeURIComponent(search);
      try {
        const response = await fetch(`${config.apiEndpoint}/posts/search?term=${encodedSearch}`, {
          credentials: 'include',
          headers: { 'Content-type': 'application/json' },
        });
        if (!response.ok) {
          console.log(response.statusText);
        }
        const result = await response.json();
        if (Array.isArray(result)) {
          setPosts(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSearch().then();
  }, [search]);

  return (
    <div className="bg-green-50 bg-opacity-50 p-2">
      {posts.map((post) => (
        <PostInCollection post={post} key={post.createdAt} />
      ))}
    </div>
  );
};

export default SearchResults;
