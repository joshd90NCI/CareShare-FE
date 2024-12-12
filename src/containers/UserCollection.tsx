import { FC, useContext, useEffect, useState } from 'react';
import config from '../config.ts';
import { AlertContext } from '../contexts/AlertContext.tsx';
import UserInCollection from './UserInCollection.tsx';
import { User } from '../types.ts';
import { genericFetch } from '../utils.ts';

type Props = { organisation?: number; role?: string };

// Collection of all the users in an organisation, organisation and user role is passed as props
const UserCollection: FC<Props> = ({ organisation, role }) => {
  const [users, setUsers] = useState<User[]>([]);
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const url = `${config.apiEndpoint}/users?${organisation ? 'organisation=' + organisation : ''}${role && organisation ? '&' : ''}${role ? 'role=' + role : ''}`;
      const response = await genericFetch(url, {}, showAlert);
      if (!response) return;
      setUsers(response);
    };
    fetchUsers().then();
  }, [setUsers, organisation, role, showAlert]);

  return (
    <div>
      {/*Display in a table*/}
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Approve</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {/*Map through and display as table roles*/}
          {users.map((user) => (
            <UserInCollection user={user} setUsers={setUsers} key={user.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCollection;
