import { AlertProps } from '@mui/material';

export type User = {
  id: number;
  email: string;
  createdAt: string;
  fName: string;
  lName: string;
  profileUrl?: string;
  roles?: string[];
};

export type Post = {
  id: number;
  title: string;
  body: string;
  voteCount: number;
  createdAt: string;
  user: User;
  replies: Post[];
  tokenCreatedAt?: number;
};

export type AlertContextType = {
  showAlert: (message: string, serverity?: AlertProps['severity']) => void;
};
