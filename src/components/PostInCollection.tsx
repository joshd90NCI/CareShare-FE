import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import { Post } from '../types.ts';

type Props = { post: Post };

const PostInCollection: FC<Props> = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white my-3 p-3 flex items-center justify-between cursor-pointer hover:scale-105 transition-transform"
      onClick={() => navigate(`/post/${post.parentId ? post.parentId : post.id}`)}
      data-testid="post-in-collection"
    >
      <div>
        <p className="font-bold">{post.title}</p>
        <p>{post.body}</p>
      </div>
      <div>
        <ThumbUpIcon color="primary" />
        <p data-testid="vote-count">{post.voteCount}</p>
      </div>
    </div>
  );
};

export default PostInCollection;
