import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Trash2 } from "lucide-react";

const getTimeDifference = (messageTime) => {
  const currentTime = new Date();
  const messageDate = new Date(messageTime);

  const difference = currentTime - messageDate;
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "just now";
  }
};

const ChatMessage = ({ position, messageTime, text, onClick }) => {
  const messageStyle =
    position === "right" ? "bg-[#7678ED] text-white" : "bg-[#EEEEF8]";
  const messagePosition =
    position === "right" ? "justify-end" : "justify-start";
  const timeStyle = position === "right" ? "text-white" : "text-[#8F8E8F]";

  const [timeDifference, setTimeDifference] = useState(
    getTimeDifference(messageTime),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeDifference(getTimeDifference(messageTime));
    }, 60000);

    return () => clearInterval(intervalId);
  }, [messageTime]);

  const [messageHover, setMessageHover] = useState(false);

  return (
    <div
      className={`w-full flex items-center py-2 ${messagePosition}`}
      onMouseEnter={() => setMessageHover(true)}
      onMouseLeave={() => setMessageHover(false)}
    >
      {position === "right" && (
        <div
          className={`${messageHover ? "flex" : "hidden"}`}
          onClick={onClick}
        >
          <Trash2 />
        </div>
      )}
      <div
        className={`flex flex-col gap-2 max-w-[400px] break-words p-2 px-4 mx-4 rounded-lg ${messageStyle}`}
      >
        <p className="font-normal text-sm">{text}</p>
        <div className="flex justify-end">
          <p className={`text-sm ${timeStyle}`}>{timeDifference}</p>
        </div>
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  position: PropTypes.oneOf(["right", "left"]).isRequired,
  messageTime: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ChatMessage;
