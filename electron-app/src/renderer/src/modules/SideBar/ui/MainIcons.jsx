import { Link } from "react-router-dom";
import { IoChatbox } from "react-icons/io5";
import { useSelector } from "react-redux";

const MainIcons = () => {
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const icons = [
    {
      tittle: "All chats",
      icon: IoChatbox,
      link: `${currentUser ? "/messages" : "#"}`,
    },
  ];

  return (
    <div className="h-full py-6 flex flex-col items-center gap-8">
      <div className="flex flex-col gap-8">
        {icons.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className="flex flex-col items-center gap-1"
          >
            <item.icon
              size={30}
              className={"text-gray-300 hover:text-green-500"}
            />
            <p className="text-gray-300 font-normal text-sm">{item.tittle}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainIcons;
