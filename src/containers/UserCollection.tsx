import { FC, useContext, useEffect, useState } from 'react';
import config from '../config.ts';
import { AlertContext } from '../contexts/AlertContext.tsx';
import UserInCollection from './UserInCollection.tsx';
import { User } from '../types.ts';

type Props = { organisation?: number; role?: string };

const UserCollection: FC<Props> = ({ organisation, role }) => {
  const [users, setUsers] = useState<User[]>([]);
  const { showAlert } = useContext(AlertContext);
  useEffect(() => {
    const fetchUsers = async () => {
      const url = `${config.apiEndpoint}/users?${organisation ? 'organisation=' + organisation : ''}${role && organisation ? '&' : ''}${role ? 'role=' + role : ''}`;
      try {
        const response = await fetch(url, { credentials: 'include' });
        if (!response.ok) {
          showAlert(`Http Error: ${response.statusText}`, 'error');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        showAlert(
          `An unexpected error occurred: ${err instanceof Error ? err.message : 'Unknown Error'}`
        );
      }
    };
    fetchUsers().then();
  }, [setUsers, organisation, role, showAlert]);

  return (
    <div>
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
          {users.map((user) => (
            <UserInCollection user={user} setUsers={setUsers} key={user.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCollection;
