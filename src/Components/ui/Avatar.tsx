import React from "react";
import { LuUser } from "react-icons/lu";

interface AvatarProps {
  profileId?: string;
  username?: string;
  size?: number;
}

export default function Avatar({
  profileId,
  username,
  size = 48,
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
  const avatarPlaceHolder = `https://api.dicebear.com/9.x/adventurer/svg?seed=${profileId}`

  return (
    <img
      src={avatarPlaceHolder}
      alt={username}
      style={{ width: size, height: size, borderRadius: '50%' }}
    />
  );
  


}
