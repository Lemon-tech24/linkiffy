const loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <div className="text-2xl text-black">Loading..</div>
      <span className="border-4 border-gray-400 rounded-full border-t-blue-800 h-[100px] w-[100px] animate-spin"></span>
    </div>
  );
};

export default loading;
