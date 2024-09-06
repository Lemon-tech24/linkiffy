/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const LoginCreate = () => {
  const [selected, setSelected] = useState<"login" | "register">("login");
  const [loading, setloading] = useState<boolean>(false);

  const initial = {
    email: "",
    password: "",
    cpassword: "",
    name: "",
  };

  const [data, setData] = useState(initial);

  const router = useRouter();

  const inputStyle =
    "w-full border rounded-lg px-2 text-xl border-solid border-black p-1";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setloading(true);

    const { email, password } = data;

    if (selected === "login") {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
        .then(({ ok, error }: any) => {
          if (error) {
            toast.error("Login Failed Please Try Again");
          } else {
            router.push("/dashboard");
          }
        })
        .finally(() => {
          setloading(false);
          setData(initial);
        });
    } else {
      const response = new Promise(async (resolve, reject) => {
        try {
          const res = await axios.post("/register", {
            email: data.email,
            name: data.name,
            password: data.password,
          });

          const resData = res.data;

          if (resData.ok) {
            resolve(resData);
          } else {
            reject(resData);
          }
        } catch (err: any) {
          reject({ msg: err.msg || "Error Occured" });
        }
      });

      toast
        .promise(response, {
          success: (data: any) => `${data.msg}`,
          error: (data: any) => `${data.msg}`,
          loading: "Processing...",
        })
        .finally(() => setloading(false));
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center animate-fadeIn">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="w-[30%] p-4 shadow-md border rounded-xl flex flex-col gap-10"
      >
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
              onChange={(e) => setData({ ...data, email: e.target.value })}
              name="email"
              required
            />
          </div>

          {selected === "register" && (
            <div className="animate-fadeIn">
              <label htmlFor="name" className="text-2xl">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your Name"
                className={inputStyle}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                name="name"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="pass" className="text-2xl">
              Password
            </label>
            <input
              type="password"
              name="pass"
              placeholder="Enter your Password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
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

        <button
          type="submit"
          className={`w-[90%] mx-auto bg-blue-500 text-white text-xl py-2 rounded-lg duration-500 ${
            loading && "cursor-not-allowed"
          }`}
          disabled={loading}
          aria-disabled={loading}
        >
          {selected === "login" ? "Login" : "Register"}
        </button>

        <h2 className="w-full text-center border-b border-solid border-black leading-[0px]">
          <span className="bg-white px-1">OR</span>
        </h2>

        <button
          type="button"
          className={`border border-black border-solid w-[80%] mx-auto p-2 rounded-xl flex items-center justify-center gap-1 ${
            loading && "cursor-not-allowed"
          }`}
          onClick={async () =>
            await signIn("google", { callbackUrl: "/dashboard" })
          }
          disabled={loading}
          aria-disabled={loading}
        >
          <img loading="lazy" src="./google.png" />
          {selected === "login" ? "Login With Google" : "Register With Google"}
        </button>
      </form>
    </div>
  );
};

export default LoginCreate;
