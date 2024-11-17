import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import { ChangeEvent, useContext, useState } from 'react';
import { modalOpenContext } from '../contexts/ModalContext.tsx';

import config from '../config.ts';
import { useNavigate } from 'react-router-dom';

const CreatePostModal = () => {
  const { modalDetails, setModalDetails } = useContext(modalOpenContext);
  const [postValues, setPostValues] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPostValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    const url = `${config.apiEndpoint}/posts`;
    const bodyObj = modalDetails.parentId
      ? { ...postValues, parentId: modalDetails.parentId, userId: 1 }
      : { ...postValues, userId: 1 };

    try {
      const response = await fetch(url, {
        body: JSON.stringify(bodyObj),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) {
        console.log('There was an Error: ', response.statusText);
      }
      const result = await response.json();
      navigate(`/post/${modalDetails.parentId ?? result.id}`);
      setModalDetails({ openState: false });
      setPostValues({});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={modalDetails.openState} onClose={() => console.log('closing')}>
      <DialogContent>
        <h3>Create Post</h3>
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
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostModal;
