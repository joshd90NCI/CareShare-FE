import { AlertProps } from '@mui/material';

// We set our types that will be used throughout the project

export type User = {
  id: number;
  email: string;
  createdAt: string;
  fName: string;
  lName: string;
  profileUrl?: string;
  roles?: string[];
  organisationId?: number;
  organisation?: { id: number };
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
  parentId?: number | null;
};

export type AlertContextType = {
  showAlert: (message: string, serverity?: AlertProps['severity']) => void;
};
