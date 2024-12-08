import PostCollection from '../containers/PostCollection.tsx';
import careShareLogo from '../assets/careshare-logo.png';

const LandingPage = () => {
  return (
    <div className="text-center text-stone-800">
      <img src={careShareLogo} alt="CareShare Logo" className="h-48 w-48 mx-auto" />
      <h1 className="text-6xl bg-white bg-opacity-50 rounded-lg my-6 text-center p-2">
        Welcome to CareShare
      </h1>
      <h2 className="text-3xl mb-6 bg-white bg-opacity-50 p-2 rounded-lg">
        Connecting Care Workers
      </h2>
      <PostCollection passedType="recent" />
    </div>
  );
};

export default LandingPage;
