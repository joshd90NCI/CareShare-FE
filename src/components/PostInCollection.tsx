import { FC } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import { Post } from '../types.ts';

type Props = { post: Post };

const PostInCollection: FC<Props> = ({ post }) => {
  return (
    <div className="bg-white my-3 p-3 flex items-center justify-between cursor-pointer hover:scale-105 transition-transform">
      <div>
        <p className="font-bold">{post.title}</p>
        <p>{post.body}</p>
      </div>
      <div>
        <ThumbUpIcon color="primary" />
        <p>{post.voteCount}</p>
      </div>
    </div>
  );
};

export default PostInCollection;
