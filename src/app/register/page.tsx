import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Button from "../components/Button";

const page = () => {
  const inputStyles =
    "text-xl w-full border border-black border-solid px-2 rounded-md";
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-red-600 via-[#F266AB] to-green-400">
      <div className="w-1/4 m-auto rounded-lg shadow-2xl p-4 bg-white">
        {/* {-----------------------------------------------} */}
        <h1 className="text-3xl font-semibold text-center mb-4">Linkiffy</h1>
        {/* {-----------------------------------------------} */}
        <div className="flex flex-col justify-center gap-4 w-full h-1/3">
          <button
            type="button"
            className="border border-black border-solid rounded-lg text-xl flex items-center justify-center gap-2 p-1"
          >
            <span className="text-[#4267B2] text-2xl">
              <FaFacebook />
            </span>
            Register With Facebook
          </button>
          <button
            type="button"
            className="border border-black border-solid rounded-lg text-xl flex items-center justify-center gap-2 p-1"
          >
            <span className="text-[#4267B2] text-2xl">
              <FcGoogle />
            </span>
            Register With Google
          </button>
        </div>

        <div className="hr-lines text-2xl h-1/3">OR</div>
        {/* {-----------------------------------------------} */}

        <form className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className={inputStyles}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className={inputStyles}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className={inputStyles}
              required
            />
          </div>
          <Button
            type="submit"
            content={"Submit"}
            className="bg-blue-500 text-white text-xl border border-black border-solid px-2 rounded-md"
          />
        </form>

        <div className="w-full flex items-center justify-center mt-2">
          <a href="/" className="underline text-blue-600">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;
