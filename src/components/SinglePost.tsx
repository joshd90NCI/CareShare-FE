import { ExpandLessOutlined, ExpandMoreOutlined } from '@mui/icons-material';
import { Post } from '../types.ts';
import { FC, useEffect, useState } from 'react';

import config from '../config.ts';

type Props = { post: Post | undefined };

const SinglePost: FC<Props> = ({ post }) => {
  const [voteCount, setVoteCount] = useState(post?.voteCount ?? 0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (post) {
      setVoteCount(post?.voteCount);
    }
  }, [post]);
  const handleVote = async (voteChangeAmount: 1 | -1) => {
    if (!post || isLoading) {
      return;
    }
    setIsLoading(true);
    const bodyObj = { userId: 1, postId: post.id, voteType: voteChangeAmount };
    try {
      const response = await fetch(`${config.apiEndpoint}/votes`, {
        method: 'POST',
        body: JSON.stringify(bodyObj),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        console.log('There was an error with the response: ', response.statusText);
        return;
      }
      setVoteCount((prev) => prev + voteChangeAmount);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!post) {
    return null;
  }
  return (
    <div className="flex bg-white p-5 bg-opacity-90 justify-between my-3">
      <div className="flex flex-col justify-between">
        <div>{post.body}</div>
        <div className="flex font-bold gap-2">
          <p>By: {post.user.fName}</p>
          <p>{post.user.lName}</p>
        </div>
      </div>
      <div className="w-8">
        <button
          className="border-2 border-solid border-stone-500 rounded-full"
          onClick={() => handleVote(1)}
        >
          <ExpandLessOutlined />
        </button>
        <p className="text-center">{voteCount}</p>
        <button
          className="border-2 border-solid border-stone-500 rounded-full"
          onClick={() => handleVote(-1)}
        >
          <ExpandMoreOutlined />
        </button>
      </div>
    </div>
  );
};

export default SinglePost;
