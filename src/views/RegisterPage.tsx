import {
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  SelectChangeEvent,
  FormHelperText,
} from '@mui/material';
import { ChangeEvent, useContext, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import config from '../config.ts';
import validateForm from '../validations/validateForm.ts';
import { registerSchema } from '../validations/authFormValidations.ts';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../contexts/AlertContext.tsx';
import { genericFetch } from '../utils.ts';

const RegisterPage = () => {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});
  // memoize the options to provide a stable reference to the object which otherwise changes reference on every rerender
  const options = useMemo(() => ({}), []);
  const { data: organisations } = useFetch(`${config.apiEndpoint}/organisations`, options);
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);

  // update our inputs through their id's and spreading them
  const handleChange = (e: ChangeEvent<any> | SelectChangeEvent) => {
    const { id, value, name } = e.target;
    setInputs((prev) => ({ ...prev, [id ?? name]: value }));
    // Remove errors if we are changing this particular imput
    setInputErrors((prev) => ({ ...prev, [id ?? name]: '' }));
  };

  // Submit the form
  const handleSubmit = async () => {
    // validate the form first before submitting
    const validatedForm = await validateForm(inputs, registerSchema);
    if (Object.keys(validatedForm).length > 0) {
      setInputErrors(validatedForm);
      return;
    }
    const response = await genericFetch(
      `/auth/register`,
      { method: 'POST', body: JSON.stringify(inputs) },
      showAlert,
      'You will not be able to login until your organisations moderator has approved your account'
    );
    if (!response.ok) return;
    navigate('/login');
  };

  return (
    <div>
      <div className="w-80 border-2 border-solid border-stone-400 rounded-lg p-5 bg-white mb-5">
        <h1 className="text-center font-bold">Register</h1>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          type="text"
          onChange={handleChange}
          value={inputs['fName'] ?? ''}
          id="fName"
          // sets an error state / ui.  Double bang operators to turn into boolean
          error={!!inputErrors['fName']}
          // actually displays the error
          helperText={inputErrors['fName']}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          type="text"
          onChange={handleChange}
          value={inputs['lName'] ?? ''}
          id="lName"
          error={!!inputErrors['lName']}
          helperText={inputErrors['lName']}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          placeholder="This will be your username"
          id="email"
          onChange={handleChange}
          value={inputs['email'] ?? ''}
          error={!!inputErrors['email']}
          helperText={inputErrors['email']}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="my-select-label">Choose an Organisation</InputLabel>
          <Select
            labelId="organisation"
            id="organisationId"
            name="organisationId"
            label="Choose an Organisation"
            value={inputs['organisationId'] ?? ''}
            onChange={handleChange}
            error={!!inputErrors['organisationId']}
          >
            {Array.isArray(organisations) &&
              organisations.map((org) => (
                <MenuItem key={org.id} value={org.id.toString()}>
                  {org.name}
                </MenuItem>
              ))}
          </Select>
          <FormHelperText>{inputErrors['organisationId']}</FormHelperText>
        </FormControl>
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          placeholder="Please enter passowrd"
          id="password"
          value={inputs['password'] ?? ''}
          onChange={handleChange}
          error={!!inputErrors['password']}
          helperText={inputErrors['password']}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          placeholder="Enter matching password"
          id="passwordConfirm"
          value={inputs['passwordConfirm'] ?? ''}
          onChange={handleChange}
          error={!!inputErrors['passwordConfirm']}
          helperText={inputErrors['passwordConfirm']}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <Button
        variant="contained"
        color="secondary"
        className="w-80"
        onClick={() => navigate('/login')}
      >
        Already joined? Login
      </Button>
    </div>
  );
};

export default RegisterPage;
