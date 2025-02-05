"use client";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Navigation from "./components/Navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const router = useRouter();

  return (
    <div className="w-full h-screen">
      <Navigation />
      <div className="w-full h-[94%] flex animate-fadeIn">
        <div className="w-full h-full flex flex-col justify-center items-center gap-10">
          <div className="text-[48px] font-bold bg-gradient-to-r from-[#F90B0B] via-[#209C94] to-[#69B72B] bg-clip-text text-transparent">
            Link it All Together
          </div>
          <p className="font-semibold text-black text-[32px]">
            Where you can showcase your links
          </p>

          <div className="flex items-center justify-center gap-4">
            {isLoading ? (
              <div className="text-lg">loading...</div>
            ) : isAuthenticated ? (
              <button
                onClick={() => router.push("/dashboard")}
                className="text-2xl border border-solid border-black rounded-md px-4 py-1 hover:scale-105 duration-700"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <LoginLink className="text-2xl border border-solid border-black rounded-md px-4 py-1 hover:scale-105 duration-700">
                  Login
                </LoginLink>
                <div className="text-4xl">/</div>
                <RegisterLink className="text-2xl border border-solid border-black rounded-md px-4 py-1 hover:scale-105 duration-700">
                  Create Account
                </RegisterLink>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
