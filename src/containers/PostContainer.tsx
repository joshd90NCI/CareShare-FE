import SinglePost from '../components/SinglePost.tsx';
import useFetch from '../hooks/useFetch.ts';
import { useParams } from 'react-router-dom';

import config from '../config.ts';
import { Post } from '../types.ts';
import { useContext, useEffect, useMemo } from 'react';
import { Button } from '@mui/material';

import { modalOpenContext } from '../contexts/ModalContext.tsx';

const PostContainer = () => {
  const { id } = useParams();
  const options = useMemo(() => ({}), []);
  const { data, error, loading, fetchDataFunction } = useFetch<Post>(
    `${config.apiEndpoint}/posts/${id}`,
    options
  );
  const { modalDetails, setModalDetails } = useContext(modalOpenContext);

  // we want to re fetch the original post after we add an answer to it
  useEffect(() => {
    const abortController = new AbortController();
    if (!modalDetails.openState) {
      fetchDataFunction(abortController.signal).then();
    }
    return () => abortController.abort();
  }, [modalDetails.openState, fetchDataFunction]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-2xl">
        <p className="bg-opacity-90 bg-white p-5 rounded-full text-center">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-2xl">
        <p className="bg-opacity-90 bg-white p-5 rounded-full text-center">Loading...</p>
      </div>
    );
  }

  return (
    <section className="">
      <h2 className="font-bold text-3xl mb-5 text-stone-800">{data?.title}</h2>
      <SinglePost post={data} />
      <hr className="border-t-2 border-solid border-stone-500 my-8" />
      <h3 className="font-bold text-2xl mb-5 text-stone-800">Answers</h3>
      {data?.replies.map((post) => <SinglePost post={post} key={post.createdAt} />)}
      {data?.replies.length === 0 && (
        <h4 className="text-xl bg-white bg-opacity-50 p-5 rounded-md">There are no answers yet</h4>
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: '10rem', padding: '1rem' }}
        onClick={() => setModalDetails({ openState: true, parentId: parseInt(id ?? '') })}
      >
        Provide an Answer
      </Button>
    </section>
  );
};

export default PostContainer;
