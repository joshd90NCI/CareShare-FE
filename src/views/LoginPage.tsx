import { Button, TextField } from '@mui/material';
import { ChangeEvent, useContext, useState } from 'react';
import validateForm from '../validations/validateForm.ts';
import { loginSchema } from '../validations/authFormValidations.ts';
import config from '../config.ts';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../contexts/UserContext.tsx';
import { getErrorMessageFromStatus } from '../utils.ts';
import { AlertContext } from '../contexts/AlertContext.tsx';

const LoginPage = () => {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});
  const { setUserDetails } = useContext(userContext);
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));
    setInputErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleSubmit = async () => {
    const validationErrors = await validateForm(inputs, loginSchema);
    if (Object.keys(validationErrors).length > 0) {
      setInputErrors(validationErrors);
      return;
    }
    try {
      const response = await fetch(`${config.apiEndpoint}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok) {
        const message = getErrorMessageFromStatus(response.status);
        showAlert(message, 'error');
      }
      const result = await response.json();
      if (result.user) {
        result.user.tokenCreatedAt = Date.now();
      }
      setUserDetails(result.user);
      navigate('/');
    } catch (err) {
      const message = `An unexpected error occurred: ${(err as Error).message}`;
      showAlert(message, 'error');
    }
  };

  return (
    <div className="w-80 border-2 border-solid border-stone-400 rounded-lg p-5 bg-white">
      <h1 className="text-center font-bold">Sign In</h1>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        type="email"
        id="email"
        onChange={handleChange}
        value={inputs['email'] ?? ''}
        helperText={inputErrors['email']}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        id="password"
        onChange={handleChange}
        value={inputs['password'] ?? ''}
        helperText={inputErrors['password']}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
