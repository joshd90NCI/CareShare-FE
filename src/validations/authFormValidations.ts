import * as yup from 'yup';

export const registerSchema = yup.object({
  fName: yup.string().required('First name is required'),
  lName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(10, 'Password must be at least 10 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(
      /[@$!%*?&#^(){}[\]<>+=~|:;"',./\\_-]/,
      'Password must contain at least one special character'
    )
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  organisationId: yup.string().required('Organisation is required'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});
