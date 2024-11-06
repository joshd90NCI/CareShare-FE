import { Button, TextField } from '@mui/material';

const LoginContainer = () => {
  return (
    <div className="w-80 border-2 border-solid border-stone-400 rounded-lg p-5 bg-white">
      <h1 className="text-center font-bold">Sign In</h1>
      <TextField label="Email" variant="outlined" fullWidth margin="normal" type="email" />
      <TextField label="Password" variant="outlined" fullWidth margin="normal" type="password" />
      <Button variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </div>
  );
};

export default LoginContainer;
