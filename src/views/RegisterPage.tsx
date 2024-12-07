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
import { getErrorMessageFromStatus } from '../utils.ts';

const RegisterPage = () => {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});
  const options = useMemo(() => ({}), []);
  const { data: organisations } = useFetch(`${config.apiEndpoint}/organisations`, options);
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);

  const handleChange = (e: ChangeEvent<any> | SelectChangeEvent) => {
    const { id, value, name } = e.target;
    setInputs((prev) => ({ ...prev, [id ?? name]: value }));
    setInputErrors((prev) => ({ ...prev, [id ?? name]: '' }));
  };

  const handleSubmit = async () => {
    const validatedForm = await validateForm(inputs, registerSchema);
    if (Object.keys(validatedForm).length > 0) {
      setInputErrors(validatedForm);
      return;
    }
    try {
      const response = await fetch(`${config.apiEndpoint}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-type': 'application/json' },
      });
      if (!response.ok) {
        const message = getErrorMessageFromStatus(response.status);
        showAlert(message, 'error');
        return;
      }
      navigate('/login');
    } catch (err) {
      const message = `Something unexpected happened: ${(err as Error).message}`;
      showAlert(message, 'error');
    }
  };

  return (
    <div className="w-80 border-2 border-solid border-stone-400 rounded-lg p-5 bg-white">
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
        error={!!inputErrors['fName']}
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
  );
};

export default RegisterPage;
