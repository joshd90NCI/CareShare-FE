import { User } from '../types.ts';
import { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import config from '../config.ts';
import { AlertContext } from '../contexts/AlertContext.tsx';

type Props = { user: User; setUsers: Dispatch<SetStateAction<User[]>> };
const UserInCollection: FC<Props> = ({ user, setUsers }) => {
  const { showAlert } = useContext(AlertContext);
  const [role, setRole] = useState(user.roles);
  const handleApprove = async () => {
    if (!user.roles?.includes('UNVALIDATED')) {
      return;
    }
    try {
      const response = await fetch(`${config.apiEndpoint}/users/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify({ roles: 'BASIC' }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        showAlert(`There was an Error: ${response.statusText}`, 'error');
        return;
      }
      const result = await response.json();
      setRole(result.roles);
      showAlert(`You have successfully approved user ${user.email}`, 'success');
    } catch (err) {
      showAlert(`Unexpected Error occurred: ${(err as Error).message}`);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${config.apiEndpoint}/users/${user.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        showAlert(`There was an Error: ${response.statusText}`, 'error');
        return;
      }
      setUsers((prev) => prev.filter((userEl) => userEl.id !== user.id));
    } catch (err) {
      showAlert(`Unexpected Error occurred: ${(err as Error).message}`);
    }
  };
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
