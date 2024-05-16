"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function NotFound() {
  const [counter, setCounter] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const countdown = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    if (counter <= 0) {
      return router.push("/");
    }

    return () => {
      clearInterval(countdown);
    };
  }, [router, counter]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-2xl bg-blue-500">
      <span className="loading loading-spinner loading-lg"></span>

      <div>
        Link doesnt exist. Redirecting in {counter} seconds. Please Wait
      </div>
    </div>
  );
}

export default NotFound;
