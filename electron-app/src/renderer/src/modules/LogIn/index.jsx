import { Link } from "react-router-dom";
import logo from "../../assets/TeamSync.svg";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../Store/User/user.actions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LogIn = () => {
  const initialFormData = {
    full_name: "",
    email_adress: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://8c65-212-90-62-215.ngrok-free.app/users/login",
        formData,
      );
      const user = response.data.user;
      setFormData(initialFormData);
      dispatch(setCurrentUser(user));
      navigate("/messages");
    } catch (error) {
      setError(error.response.data.error);
      console.error("Login failed:", error.response.data.error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full h-screen flex flex-col bg-neutral-700 p-8 gap-40">
      <div className="flex w-full justify-between items-center">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-10 h-10" />
        </Link>
        <Link to={"/register"} className="text-white font-semibold">
          Create account
        </Link>
      </div>
      <div className="w-full flex flex-col items-center gap-8">
        <p className="text-white text-2xl font-semibold">Login into TeamSync</p>
        <form className="flex flex-col w-[35%] gap-7" onSubmit={handleLogin}>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white">EMAIL ADDRESS</label>
            <input
              type="email"
              name="email_adress"
              placeholder="email@example.com"
              className="bg-transparent py-3 text-white"
              value={formData.email_adress}
              onChange={handleChange}
            />
            <span className="w-full h-[1px] bg-white "></span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white">PASSWORD</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="bg-transparent py-3 text-white"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="w-full h-[1px] bg-white "></span>
          </div>
          {error ? (
            <span className="text-red-500 font-semibold text-md">
              Invalid email or password
            </span>
          ) : (
            ""
          )}
          <button
            type="submit"
            className="text-white py-3 px-4 border border-1 transition duration-300 ease-linear hover:bg-white hover:text-black"
          >
            LogIn
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
