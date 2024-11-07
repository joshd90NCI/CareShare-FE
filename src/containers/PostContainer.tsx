import SinglePost from '../components/SinglePost.tsx';

const PostContainer = () => {
  return (
    <section>
      <h2 className="font-bold text-3xl mb-5 text-stone-800">
        How can I get young people to go to bed on time
      </h2>
      <SinglePost />
      <hr className="border-t-2 border-solid border-stone-500 my-8" />
      <h3 className="font-bold text-2xl mb-5 text-stone-800">Answers</h3>
      <SinglePost />
    </section>
  );
};

export default PostContainer;
