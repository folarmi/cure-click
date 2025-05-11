import { useState } from "react";

type ProfilePictureProps = {
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  size?: number | string;
};

const getInitials = (firstName = "", lastName = "") =>
  `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();

const ProfilePicture = ({
  firstName,
  lastName,
  profilePicture,
  size = 64,
}: ProfilePictureProps) => {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(firstName, lastName);

  const sizeStyle = {
    width: typeof size === "number" ? `${size}px` : size,
    height: typeof size === "number" ? `${size}px` : size,
  };

  const shouldShowInitials = !profilePicture || imageError;

  return shouldShowInitials ? (
    <div
      className="rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-lg"
      style={sizeStyle}
    >
      {initials}
    </div>
  ) : (
    <img
      src={profilePicture}
      alt={`${firstName} ${lastName}`}
      className="rounded-full object-cover"
      style={sizeStyle}
      onError={() => setImageError(true)}
    />
  );
};

export { ProfilePicture };
