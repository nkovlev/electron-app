import { Link } from "react-router-dom";
import logo from "../../assets/TeamSync.svg";
const Start = () => {
  return (
    <div className="w-screen h-screen bg-neutral-700 flex justify-center items-center ">
      <div className="flex flex-col items-center gap-10">
        <img src={logo} alt="logo" className="w-32 h-32" />
        <span className="text-white font-bold text-2xl">
          Welcome to the TeamSync
        </span>
        <Link
          to={"/login"}
          className="text-white flex items-center justify-center h-14 w-[280px] border-[1px] border-white gap-6 p-6 transition duration-300 ease-linear hover:bg-white hover:text-black "
        >
          LogIn into TeamSync
        </Link>
      </div>
    </div>
  );
};

export default Start;
