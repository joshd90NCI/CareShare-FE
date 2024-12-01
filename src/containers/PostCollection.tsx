import PostInCollection from '../components/PostInCollection.tsx';
import { FC, useContext, useEffect, useState } from 'react';

import config from '../config.ts';
import { Post } from '../types.ts';
import { useParams } from 'react-router-dom';
import { AlertContext } from '../contexts/AlertContext.tsx';
import { getErrorMessageFromStatus } from '../utils.ts';

type Props = { userId?: number; passedType?: 'trending' | 'recent' | 'userPosts' };

const PostCollection: FC<Props> = ({ userId, passedType }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { type } = useParams();
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    const urlObj: Record<string, string> = {
      trending: `${config.apiEndpoint}/posts/trending`,
      recent: `${config.apiEndpoint}/posts/recent?pageNumber=0&pageSize=10`,
      userPosts: `${config.apiEndpoint}/posts/user/${userId}`,
    };
    const typeToUse = userId ? 'userPosts' : (passedType ?? type);
    const url = urlObj[typeToUse ?? ''];

    const fetchFunction = async () => {
      try {
        const response = await fetch(url, { credentials: 'include' });
        if (!response.ok) {
          const msg = getErrorMessageFromStatus(response.status);
          showAlert(msg, 'error');
          return;
        }

        const data = await response.json();
        const dataToSet = 'content' in data ? data.content : data;
        setPosts(dataToSet);
      } catch (err) {
        const message = `Something unexpected happened: ${(err as Error).message}`;
        showAlert(message, 'error');
      }
    };

    fetchFunction().then();
  }, [type, showAlert, passedType, userId]);
  console.log(posts, 'posts');
  return (
    <div className="bg-green-50 bg-opacity-50 p-10">
      {posts.map((post) => (
        <PostInCollection post={post} key={post.createdAt} />
      ))}
    </div>
  );
};

export default PostCollection;
