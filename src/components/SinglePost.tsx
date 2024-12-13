import { ExpandLessOutlined, ExpandMoreOutlined, Edit, Delete } from '@mui/icons-material';
import { Post } from '../types.ts';
import { FC, useContext, useEffect, useState } from 'react';

import { AlertContext } from '../contexts/AlertContext.tsx';
import { genericFetch } from '../utils.ts';
import { userContext } from '../contexts/UserContext.tsx';
import { useNavigate } from 'react-router-dom';
import { modalOpenContext } from '../contexts/ModalContext.tsx';

type Props = { post: Post | undefined };

// This is the container for a single post and is the primary source for interacting with a post.
// You are directed here after clicking on a post in container
const SinglePost: FC<Props> = ({ post }) => {
  const [voteCount, setVoteCount] = useState(post?.voteCount ?? 0);
  const [isLoading, setIsLoading] = useState(false);
  // We can open the modal to do editing from this point
  const { setModalDetails } = useContext(modalOpenContext);
  const { showAlert } = useContext(AlertContext);
  const { userDetails } = useContext(userContext);
  const navigate = useNavigate();

  // Update our vote count according to the post if it updates, so we don't use stale data
  useEffect(() => {
    if (post) {
      setVoteCount(post?.voteCount);
    }
  }, [post]);

  // Whether we display the edit and delete buttons depends on ownership and permissions
  const determineCanEdit = (): boolean | 'self' => {
    // Start with the most specific first.  Only owner of a post can edit their own
    if (userDetails?.id === post?.user.id) return 'self';
    if (userDetails?.roles?.includes('ADMIN')) return true;
    return (
      !!userDetails?.roles?.includes('MODERATOR') &&
      userDetails?.organisationId === post?.user.organisation?.id
    );
  };

  // Hit the delete endpoint and if successful navigate back to the home page
  const handleDelete = async () => {
    const result = await genericFetch(
      `/posts/${post?.id}`,
      { method: 'DELETE' },
      showAlert,
      'Post was successfully deleted'
    );
    if (result) {
      navigate('/');
    }
  };

  // Open our modal to edit
  const handleEdit = () => {
    setModalDetails({ openState: true, parentId: post?.parentId, postDetails: post });
  };

  // Hit our voting endpoint
  const handleVote = async (voteChangeAmount: 1 | -1) => {
    if (!post || isLoading) {
      return;
    }
    setIsLoading(true);
    const bodyObj = { userId: 1, postId: post.id, voteType: voteChangeAmount };

    const response = await genericFetch(
      `/votes`,
      { method: 'POST', body: JSON.stringify(bodyObj) },
      showAlert,
      'Voting Successful'
    );
    if (!response) {
      setIsLoading(false);
      return;
    }
    // Update our vote amount if this changes.  This is out of sync with our props data but as soon as they change they will update from the backend so will be properly updated
    setVoteCount((prev) => prev + voteChangeAmount);
    setIsLoading(false);
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
      <div className="flex gap-3">
        {determineCanEdit() && (
          // Only display the edit and delete section if we have the permissions
          <div className="flex flex-col justify-between p-1">
            <button onClick={handleDelete} data-testid="delete-button">
              <Delete className="text-red-800 hover:text-red-700 cursor-pointer" />
            </button>
            {determineCanEdit() === 'self' && (
              <button onClick={handleEdit} data-testid="edit-button">
                <Edit className="text-green-900 hover:text-green-800 cursor-pointer" />
              </button>
            )}
          </div>
        )}
        {/*Voting Section*/}
        <div className="flex flex-col items-center text-xl">
          <button
            className="border-2 border-solid border-stone-500 rounded-full m-auto w-10 h-10 flex items-center justify-center"
            onClick={() => handleVote(1)}
            data-testid="upvote-button"
          >
            <ExpandLessOutlined />
          </button>
          <p className="text-center my-3" data-testid="vote-count">
            {voteCount}
          </p>
          <button
            className="border-2 border-solid border-stone-500 rounded-full m-auto w-10 h-10 flex items-center justify-center"
            onClick={() => handleVote(-1)}
            data-testid="downvote-button"
          >
            <ExpandMoreOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
