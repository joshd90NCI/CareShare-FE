import { ExpandLessOutlined, ExpandMoreOutlined } from '@mui/icons-material';

const SinglePost = () => {
  return (
    <div className="flex bg-white p-5 bg-opacity-90">
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolor dolores earum
        eius et eum facere facilis ipsam natus officiis, perferendis possimus provident quas
        quibusdam similique, sit ullam velit, voluptas?
      </div>
      <div className="w-8">
        <button className="border-2 border-solid border-stone-500 rounded-full">
          <ExpandLessOutlined />
        </button>
        <p className="text-center">3</p>
        <button className="border-2 border-solid border-stone-500 rounded-full">
          <ExpandMoreOutlined />
        </button>
      </div>
    </div>
  );
};

export default SinglePost;
