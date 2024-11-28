import { User } from '../types.ts';
import { FC } from 'react';

type Props = { user: User; size: 'large' | 'small' };

const ProfilePicture: FC<Props> = ({ user, size }) => {
  const classes =
    size === 'large'
      ? 'w-36 h-36 rounded-full border-2 border-solid border-white'
      : 'w-4 h-4 rounded-full border-2 border-solid border-white';

  if (user.profileUrl) {
    return <img src={user.profileUrl} alt="profile" className={classes}></img>;
  }
  return (
    <div className={`${classes} flex items-center justify-center bg-blue-700 text-white`}>
      <p className={`${size === 'large' ? 'text-7xl' : 'text-sm'} font-bold`}>
        {user.fName.slice(0, 1).toUpperCase()}
      </p>
      <p className={`${size === 'large' ? 'text-7xl' : 'text-sm'} font-bold`}>
        {user.lName.slice(0, 1).toUpperCase()}
      </p>
    </div>
  );
};
export default ProfilePicture;
