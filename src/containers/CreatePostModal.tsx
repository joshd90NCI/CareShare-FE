import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { modalOpenContext } from '../contexts/ModalContext.tsx';

import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../contexts/AlertContext.tsx';
import { genericFetch } from '../utils.ts';

const CreatePostModal = () => {
  const { modalDetails, setModalDetails } = useContext(modalOpenContext);
  const [postValues, setPostValues] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    if (modalDetails.postDetails) {
      setPostValues({
        ['title']: modalDetails.postDetails.title,
        ['body']: modalDetails.postDetails.body,
      });
    }
  }, [modalDetails.postDetails]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPostValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    const url = modalDetails.postDetails ? `/posts/${modalDetails.postDetails.id}` : `/posts`;
    const method = modalDetails.postDetails ? 'PUT' : 'POST';
    const successMessage = modalDetails.postDetails
      ? 'Successfully updated the post'
      : 'Successfully created the post';
    let bodyObj;
    if (modalDetails.postDetails) {
      bodyObj = JSON.stringify(postValues);
    } else {
      bodyObj = modalDetails.parentId
        ? JSON.stringify({ ...postValues, parentId: modalDetails.parentId, userId: 1 })
        : JSON.stringify({ ...postValues, userId: 1 });
    }

    const response = await genericFetch(url, { body: bodyObj, method }, showAlert, successMessage);
    if (response) {
      setModalDetails({ openState: false });
      setPostValues({});
      navigate(`/post/${modalDetails.parentId ?? response.id}`);
    }
  };

  return (
    <Dialog open={modalDetails.openState} onClose={() => console.log('closing')}>
      <DialogContent>
        <h3>{modalDetails.postDetails ? 'Edit' : 'Create'} Post</h3>
        <TextField
          autoFocus
          margin="normal"
          label="Post Title"
          fullWidth
          variant="outlined"
          type="text"
          id="title"
          onChange={handleChange}
          value={postValues['title'] ?? ''}
        />
        <TextField
          autoFocus
          margin="normal"
          label="Post Content"
          fullWidth
          variant="outlined"
          type="text"
          id="body"
          multiline
          value={postValues['body'] ?? ''}
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              alignItems: 'flex-start', // Aligns text to the top
            },
            '& .MuiInputBase-root': {
              resize: 'vertical',
              overflow: 'auto',
              minHeight: '15rem',
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setModalDetails({ openState: false })} color="secondary">
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostModal;
