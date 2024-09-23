import Image from "next/image";
import Header from "../Components/Layout/Header";
import NewPostForm from "../Components/post/NewPostForm";

export default function Home() {
  return (
    <>
      <Header>
        <h1>Home</h1>
      </Header>
      <NewPostForm/>
    </>
  );
}
