import PostInCollection from '../components/PostInCollection.tsx';
import { FC, useContext, useEffect, useState } from 'react';

import { Post } from '../types.ts';
import { useParams } from 'react-router-dom';
import { AlertContext } from '../contexts/AlertContext.tsx';
import { genericFetch } from '../utils.ts';

// These props are typescript helpers to ensure that only the correct params go into the component
type Props = {
  userId?: number;
  passedType?: 'trending' | 'recent' | 'userPosts' | 'organisation';
  organisationId?: number;
};

// This is the container for all the posts which can hit a number of different endpoints depending on the nature of the posts
const PostCollection: FC<Props> = ({ userId, passedType, organisationId = 0 }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { type } = useParams();
  const { showAlert } = useContext(AlertContext);

  // We use a url object to map the correct endpoint to the prop as a lookup.  These params will get passed to our fetch function
  useEffect(() => {
    const urlObj: Record<string, string> = {
      trending: `/posts/trending`,
      recent: `/posts/recent?pageNumber=0&pageSize=10`,
      userPosts: `/posts/user/${userId}`,
      organisation: `/posts/organisation/${organisationId}`,
    };
    const typeToUse = userId ? 'userPosts' : (passedType ?? type);
    const url = urlObj[typeToUse ?? ''];

    const fetchFunction = async () => {
      const response = await genericFetch(url, {}, showAlert);
      // If there are any errors the exit out of the loop
      if (!response) return;
      const dataToSet = 'content' in response ? response.content : response;
      // depending on the endpoint it could be return {content:} or just at the top level
      setPosts(dataToSet);
    };

    fetchFunction().then();
  }, [type, showAlert, passedType, userId, organisationId]);

  return (
    <div className="bg-green-50 bg-opacity-50 p-3 sm:p-10">
      {/*Iterate through all the posts that have been returned*/}
      {posts.map((post) => (
        <PostInCollection post={post} key={post.createdAt} />
      ))}
    </div>
  );
};

export default PostCollection;
