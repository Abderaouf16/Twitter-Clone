import Link from "next/link";
import React from "react";
import Avatar from "../ui/Avatar";
import ProfileLink from "../profile/ProfileLink";
import PostContent from "./PostContent";
import { LuMessageCircle } from "react-icons/lu";
import LikeCount from "./LikeCount";
import SharePost from "./SharePost";

interface PostProps {
  profileId: string;
  username: string;
  content: string;
  likeCount: number;
  postId: string;
  parentId?: string | null;
  commentCount?: number;
  likedByUser?: boolean;
  hasLink?: boolean;
  linksToParent?: boolean;
}

export default function Post(props: PostProps) {
  if (props.hasLink) {
    return (
      <Link href={`/post/${props.postId}`}>
        <PostItemContent {...props} />
      </Link>
    );
  }

  return <PostItemContent {...props} />;
}

function PostItemContent({
  profileId,
  username,
  content,
  likeCount,
  postId,
  parentId,
  commentCount = 0,
  likedByUser,
  hasLink,
  linksToParent,
}: PostProps) {
  function handlParentLinkClick() {}
  return (
    <div
      className={`flex border-b border-gray-200 p-4 ${
        hasLink ? "hover:bg-gray-100" : "" }`}
    >
      <Avatar username={username} profileId={profileId} />
      <div className="flex-1">
        <div className=" flex gap-2 mb-1">
          <ProfileLink className="pt-1 hover:underline" username={username}>
            <span className="text-gray-500 cursor-pointer">@{username} </span>
          </ProfileLink>
          {linksToParent && parentId && (
            <div
              onClick={handlParentLinkClick}
              role="link"
              className="text-sm italic"
            >
              <span>@replied</span>
            </div>
          )}
        </div>
        <PostContent content={content} />
        <div className=" flex justify-between items-center text-gray-500  pt-4">
        <button className="flex items-center ">
          <LuMessageCircle className="mr-1 h-5 w-5"/>
          <span>{commentCount}</span>
        </button>
        <LikeCount likeCount={likeCount} likedByUser={!!likedByUser} />
        <SharePost postId={postId}/>
      </div>
      </div>
      
    </div>
  );
}
