import { useContext } from 'react';
import { userContext } from '../contexts/UserContext.tsx';
import ProfilePicture from '../components/ProfilePicture.tsx';
import PostCollection from '../containers/PostCollection.tsx';

// The users profile page that they can view.  Fairly straightforward just some css to style and place elements
const ProfilePage = () => {
  const { userDetails } = useContext(userContext);
  if (!userDetails) {
    return null;
  }

  const detailClasses = 'bg-white bg-opacity-70 my-2 p-2 rounded-lg shadow-sm';

  return (
    <div className="w-full h-full bg-white bg-opacity-30 shadow-2xl shadow-white text-xl">
      <h1 className="mb-10 text-center text-4xl">Your Profile</h1>
      <div className="flex w-full p-10">
        <div className="w-1/2">
          <ProfilePicture size="large" user={userDetails} />
          <p className={detailClasses}>
            {userDetails.fName} {userDetails.lName}
          </p>
        </div>
        <div className="w-1/2 p-10">
          <h3 className="text-2xl underline mb-10">User Details</h3>
          <p className={detailClasses}>
            <b>Email: </b>
            {userDetails.email}
          </p>
          <p className={detailClasses}>
            <b>Joined: </b>{' '}
            {new Date(userDetails.createdAt)?.toLocaleDateString() || 'Nothing to display'}
          </p>
        </div>
      </div>
      <hr className="border-stone-600" />
      <div className="sm:px-10 py-10">
        <h3 className="text-stone-800 font-bold bg-white bg-opacity-50">
          All your posts in one place
        </h3>
        <PostCollection userId={userDetails.id} />
      </div>
    </div>
  );
};

export default ProfilePage;
