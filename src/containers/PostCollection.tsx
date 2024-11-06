import postDummyData from '../assets/postDummyData.ts';
import PostInCollection from '../components/PostInCollection.tsx';

const PostCollection = () => {
  return (
    <div className="bg-green-50 bg-opacity-50 p-2">
      {postDummyData.map((post) => (
        <PostInCollection post={post} />
      ))}
    </div>
  );
};

export default PostCollection;
