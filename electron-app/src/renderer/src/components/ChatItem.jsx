import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Avatar from "./Avatar/Avatar";

const ChatItem = ({ date, username, lastmessage, selected, onClick }) => {
  const now = new Date();
  const isToday = date && date.toDateString() === now.toDateString();
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  let displayDate;

  if (isToday) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    displayDate = `${hours}:${minutes}`;
  } else {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    displayDate = `${day}.${month}`;
  }

  return (
    <div
      className={`w-full ${selected ? "bg-[#eeeef8]" : "bg-transparent"} h-20 rounded-md hover:bg-[#eeeef8] flex justify-between items-center p-3 gap-3`}
      onClick={onClick}
    >
      <div className="w-14 h-14">
        <Avatar name={username} />
      </div>
      <div className="w-[160px] h-full flex flex-col justify-between">
        <p className="font-semibold">{username}</p>
        {lastmessage && currentUser.id === lastmessage.sender_id ? (
          <p className="text-md truncate">
            <span className="text-[#6567EB]">You: </span>
            {lastmessage.message_text}
          </p>
        ) : lastmessage ? (
          <p className="text-md truncate">{lastmessage.message_text}</p>
        ) : (
          <p className="text-md truncate">No messages</p>
        )}
      </div>
      <div className="flex flex-col h-full justify-between items-end">
        <p>{displayDate}</p>
      </div>
    </div>
  );
};

ChatItem.propTypes = {
  date: PropTypes.instanceOf(Date),
  username: PropTypes.string.isRequired,
  lastmessage: PropTypes.shape({
    id: PropTypes.number,
    room_id: PropTypes.number,
    sender_id: PropTypes.string,
    recepient_id: PropTypes.string,
    message_text: PropTypes.string,
    timestamp: PropTypes.string,
  }),
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

ChatItem.defaultProps = {
  date: new Date(),
  lastmessage: null,
  selected: false,
};

export default ChatItem;
