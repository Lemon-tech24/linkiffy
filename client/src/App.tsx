import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <div className="w-full h-screen">
        <Navigation />

        <div className="w-full h-[94%] flex">
          <div className="w-1/2 h-full flex flex-col justify-center items-center gap-10">
            <div className="text-[48px] font-bold bg-gradient-to-r from-[#F90B0B] via-[#209C94] to-[#69B72B] bg-clip-text text-transparent">
              Link it All Together
            </div>
            <p className="font-semibold text-black text-[32px]">
              Where you can showcase your links
            </p>

            <button
              type="button"
              className="p-4 border-2 border-solid border-black text-[24px] rounded-xl"
            >
              Login or Create Account
            </button>
          </div>
          <div className="w-1/2 h-full"></div>
        </div>
      </div>
    </>
  );
}

export default App;
