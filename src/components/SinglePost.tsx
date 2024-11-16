import { ExpandLessOutlined, ExpandMoreOutlined } from '@mui/icons-material';
import { Post } from '../types.ts';
import { FC } from 'react';

type Props = { post: Post | undefined };

const SinglePost: FC<Props> = ({ post }) => {
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
        <button className="border-2 border-solid border-stone-500 rounded-full">
          <ExpandLessOutlined />
        </button>
        <p className="text-center">{post.voteCount ?? 0}</p>
        <button className="border-2 border-solid border-stone-500 rounded-full">
          <ExpandMoreOutlined />
        </button>
      </div>
    </div>
  );
};

export default SinglePost;
