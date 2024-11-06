import { MenuItem, TextField, FormControl, InputLabel, Select, Button } from '@mui/material';

const RegisterContainer = () => {
  return (
    <div className="w-80 border-2 border-solid border-stone-400 rounded-lg p-5 bg-white">
      <h1 className="text-center font-bold">Register</h1>
      <TextField label="First Name" variant="outlined" fullWidth margin="normal" type="text" />
      <TextField label="Last Name" variant="outlined" fullWidth margin="normal" type="text" />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        type="email"
        placeholder="This will be your username"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="my-select-label">Choose an Option</InputLabel>
        <Select labelId="my-select-label" id="my-select" label="Choose an Option">
          <MenuItem value="option1">Peter McVerries</MenuItem>
          <MenuItem value="option2">CrossCare</MenuItem>
          <MenuItem value="option3">Focus Ireland</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        placeholder="Please enter passowrd"
      />
      <TextField
        label="Confirm Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        placeholder="Enter matching password"
      />
      <Button variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </div>
  );
};

export default RegisterContainer;
