import { Button, TextField } from '@mui/material';
import { ChangeEvent, useContext, useState } from 'react';
import validateForm from '../validations/validateForm.ts';
import { loginSchema } from '../validations/authFormValidations.ts';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../contexts/UserContext.tsx';
import { genericFetch } from '../utils.ts';
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
    // Validate our form before sending to the backend
    const validationErrors = await validateForm(inputs, loginSchema);
    if (Object.keys(validationErrors).length > 0) {
      setInputErrors(validationErrors);
      return;
    }

    const response = await genericFetch(
      `/auth/login`,
      { method: 'POST', body: JSON.stringify(inputs) },
      showAlert
    );
    if (!response.ok) return;

    if (response.user) {
      response.user.tokenCreatedAt = Date.now();
    }
    if (response.user?.roles.includes('UNVALIDATED')) {
      showAlert("Your organisation moderator hasn't approved your registration yet", 'info');
      return;
    }
    setUserDetails(response.user);
    navigate('/');
  };

  return (
    <div>
      <div className="w-80 border-2 border-solid border-stone-400 rounded-lg p-5 bg-white mb-5">
        <h1 className="text-center font-bold">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            id="email"
            onChange={handleChange}
            // Extract the value from the inputsObject
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
            // handle change will extract the id of the form to know what field to update
            onChange={handleChange}
            value={inputs['password'] ?? ''}
            helperText={inputErrors['password']}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            Login
          </Button>
        </form>
      </div>
      <Button
        variant="contained"
        color="secondary"
        className="w-80"
        onClick={() => navigate('/register')}
      >
        No account? Register
      </Button>
    </div>
  );
};

export default LoginPage;
