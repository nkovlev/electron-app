import PropTypes from "prop-types";

const Avatar = ({ name }) => {
  const nameParts = name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";

  return (
    <span className="w-14 h-14 rounded-md bg-gray-600 flex justify-center items-center text-white text-2xl">
      {firstNameInitial.toUpperCase()}
    </span>
  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Avatar;
