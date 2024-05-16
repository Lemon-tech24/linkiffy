import React from "react";

const page = () => {
  const linksStyles =
    "border border-solid border-black w-full rounded-md px-2 bg-white text-2xl";
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div className="w-full h-full flex items-center justify-center flex-col">
        <div className="border border-solid border-black w-[150px] h-[150px] rounded-full flex items-center justify-center text-center mb-4">
          icon ito tarantado ka
        </div>
        <div>@lemontree</div>

        <div>About Me</div>
        {/* {---------------------------------------------------------------} */}
        <div className="w-1/4 border flex flex-col gap-8">
          <div className={linksStyles}>Link 1</div>
          <div className={linksStyles}>Link 2</div>
          <div className={linksStyles}>Link 3</div>
        </div>

        {/* {---------------------------------------------------------------} */}
      </div>
    </div>
  );
};

export default page;
