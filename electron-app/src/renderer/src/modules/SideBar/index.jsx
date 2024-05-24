import logo from "../../assets/TeamSync.svg";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Store/User/user.actions";
import axios from "axios";

const SideBar = () => {
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate("/");
    try {
      const response = await axios.post("http://localhost:3000/users/logout", {
        userId: currentUser.id,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error("Login failed:", error.response.data.error);
    }
  };

  return (
    <div className="w-24 h-screen bg-neutral-700 flex flex-col items-center">
      <div className="w-16 h-screen py-4 flex flex-col justify-between items-center gap-10">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <Link
          to={"/"}
          onClick={handleLogout}
          className="flex flex-col items-center"
        >
          <TbLogout2 color="#d1d5db" size={25} />
          <p className="text-gray-300 font-bold">Log-out</p>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
