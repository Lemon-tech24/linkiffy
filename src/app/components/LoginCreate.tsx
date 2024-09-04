/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const LoginCreate = () => {
  const [selected, setSelected] = useState<"login" | "register">("login");

  const inputStyle =
    "w-full border rounded-lg px-2 text-xl border-solid border-black p-1";

  return (
    <div className="w-full h-full flex items-center justify-center animate-fadeIn">
      <form className="w-[30%] p-4 shadow-md border rounded-xl flex flex-col gap-10">
        <div className="w-full flex items-center">
          <button
            type="button"
            className={`w-1/2 p-2 text-2xl border-b-0 border-l-0 border-r-0 transition-all duration-300 ${
              selected === "login"
                ? "border-t-blue-500 border-2"
                : "border-transparent"
            }`}
            onClick={() => setSelected("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={`w-1/2 p-2 text-2xl border-b-0 border-l-0 border-r-0 transition-all duration-300 ${
              selected === "register"
                ? "border-t-blue-500 border-2"
                : "border-transparent"
            }`}
            onClick={() => setSelected("register")}
          >
            Create Account
          </button>
        </div>

        <div className="w-full h-full flex flex-col gap-4 px-4">
          <div>
            <label htmlFor="email" className="text-2xl">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              className={inputStyle}
              name="email"
              required
            />
          </div>

          <div>
            <label htmlFor="pass" className="text-2xl">
              Password
            </label>
            <input
              type="password"
              name="pass"
              placeholder="Enter your Password"
              className={inputStyle}
              required
            />
          </div>

          {selected === "register" && (
            <div className="animate-fadeIn">
              <label htmlFor="cpass" className="text-2xl">
                Confirm Password
              </label>
              <input
                type="password"
                className={inputStyle}
                placeholder="Confirm your Password"
                name="cpass"
                required
              />
            </div>
          )}
        </div>

        <h2 className="w-full text-center border-b border-solid border-black leading-[0px]">
          <span className="bg-white px-1">OR</span>
        </h2>

        <button
          type="button"
          className="border border-black border-solid w-[80%] mx-auto p-2 rounded-xl flex items-center justify-center"
          onClick={async () =>
            await signIn("google", { callbackUrl: "/dashboard" })
          }
        >
          <img loading="lazy" src="./google.png" />
          {selected === "login" ? "Login With Google" : "Register With Google"}
        </button>

        <button
          type="submit"
          className="w-[90%] mx-auto bg-blue-500 text-white text-xl py-2 rounded-lg"
        >
          {selected === "login" ? "Login" : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default LoginCreate;
