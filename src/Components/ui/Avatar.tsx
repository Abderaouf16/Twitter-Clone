import React from "react";
import { LuUser } from "react-icons/lu";
import ProfileLink from "../profile/ProfileLink";

interface AvatarProps {
  profileId?: string;
  username?: string;
  size?: number;
  link?: boolean;
}

export default function Avatar({
  profileId,
  username,
  size = 48,
  link = true,
}: AvatarProps) {
  if (!profileId || !username) {
    return (
      <div
        className="bg-gray-200 rounded-full flex justify-center items-center aspect-square"
        style={{ width: size }}
      >
        <LuUser className="w-6 h-6 text-gray-400" />
      </div>
    );
  }
  const avatarPlaceHolder = `https://api.dicebear.com/9.x/adventurer/svg?seed=${profileId}`;

  if (link) {
    return (
      <ProfileLink username={username}>
        <img
          src={avatarPlaceHolder}
          alt={username}
          style={{ width: size, height: size, borderRadius: "50%" }}
        />
      </ProfileLink>
    );
  }

  return (
    <img
      src={avatarPlaceHolder}
      alt={username}
      style={{ width: size, height: size, borderRadius: "50%" }}
    />
  );
}
