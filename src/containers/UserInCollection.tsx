import { User } from '../types.ts';
import { FC } from 'react';

type Props = { user: User };
const UserInCollection: FC<Props> = ({ user }) => {
  return (
    <div>
      <p>
        {user.fName} {user.lName}
      </p>
      <p>{user.email}</p>
      <p>{user.roles}</p>
    </div>
  );
};

export default UserInCollection;
