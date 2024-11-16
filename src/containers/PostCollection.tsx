import PostInCollection from '../components/PostInCollection.tsx';
import { useEffect, useState } from 'react';

import config from '../config.ts';
import { Post } from '../types.ts';

const PostCollection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchFunction = async () => {
      const url = `${config.apiEndpoint}/posts`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.log(response.statusText, 'something went wrong');
        }
        const data = await response.json();
        setPosts(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFunction().then();
  }, []);

  return (
    <div className="bg-green-50 bg-opacity-50 p-2">
      {posts.map((post) => (
        <PostInCollection post={post} key={post.createdAt} />
      ))}
    </div>
  );
};

export default PostCollection;
