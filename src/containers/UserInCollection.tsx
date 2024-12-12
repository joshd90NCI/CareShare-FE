import { User } from '../types.ts';
import { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import config from '../config.ts';
import { AlertContext } from '../contexts/AlertContext.tsx';
import { genericFetch } from '../utils.ts';

type Props = { user: User; setUsers: Dispatch<SetStateAction<User[]>> };

//this is the user in the table of displayed users
const UserInCollection: FC<Props> = ({ user, setUsers }) => {
  const { showAlert } = useContext(AlertContext);
  const [role, setRole] = useState(user.roles);

  // Request to the backend to switch a user from UNVALIDATED to BASIC
  const handleApprove = async () => {
    if (!user.roles?.includes('UNVALIDATED')) {
      return;
    }
    const response = await genericFetch(
      `${config.apiEndpoint}/users/${user.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ roles: 'BASIC' }),
      },
      showAlert,
      `You have successfully approved ${user.email}`
    );
    if (!response.ok || 'roles' in response) return;
    // If we successfully changed over we can then update our UI
    setRole(response.roles);
  };

  // Delete the user
  const handleDelete = async () => {
    const response = await genericFetch(
      `${config.apiEndpoint}/users/${user.id}`,
      {
        method: 'DELETE',
      },
      showAlert,
      `Successfully removed ${user.email}`
    );
    if (!response.ok) return;
    // Filter out the user from the array as we got a successful deletion
    setUsers((prev) => prev.filter((userEl) => userEl.id !== user.id));
  };

  // returns a table row as its part of the users table
  return (
    <tr className="shadow">
      <td className="text-center">
        {user.fName} {user.lName}
      </td>
      <td className="text-center">{user.email}</td>
      <td className="text-center">{role}</td>
      <td className="text-center">
        <Button
          variant="contained"
          disabled={!role?.includes('UNVALIDATED')}
          onClick={handleApprove}
        >
          Approve
        </Button>
      </td>
      <td className="text-center text-red-700">
        <DeleteIcon className="hover:text-red-600 cursor-pointer" onClick={handleDelete} />
      </td>
    </tr>
  );
};

export default UserInCollection;
