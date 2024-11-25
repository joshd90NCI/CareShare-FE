import PostInCollection from '../components/PostInCollection.tsx';
import { useContext, useEffect, useState } from 'react';

import config from '../config.ts';
import { Post } from '../types.ts';
import { useParams } from 'react-router-dom';
import { AlertContext } from '../contexts/AlertContext.tsx';
import { getErrorMessageFromStatus } from '../utils.ts';

const PostCollection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { type } = useParams();
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    showAlert('My message', 'error');
    const fetchFunction = async () => {
      const url =
        type === 'trending'
          ? `${config.apiEndpoint}/posts/${type}`
          : `${config.apiEndpoint}/posts/${type}?pageNumber=0&pageSize=10`;
      try {
        const response = await fetch(url, { credentials: 'include' });
        if (!response.ok) {
          const msg = getErrorMessageFromStatus(response.status);
          showAlert(msg, 'error');
          return;
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        const message = `Something unexpected happened: ${(err as Error).message}`;
        showAlert(message, 'error');
      }
    };

    fetchFunction().then();
  }, [type, showAlert]);
  console.log(posts, 'posts');
  return (
    <div className="bg-green-50 bg-opacity-50 p-2">
      {posts.map((post) => (
        <PostInCollection post={post} key={post.createdAt} />
      ))}
    </div>
  );
};

export default PostCollection;
