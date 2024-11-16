export type User = { id: number; email: string; createdAt: string; fName: string; lName: string };

export type Post = {
  id: number;
  title: string;
  body: string;
  voteCount: number;
  createdAt: string;
  user: User;
  replies: Post[];
};
