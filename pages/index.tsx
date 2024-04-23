import Form from "@/components/Form";
import Header from "@/components/layout/Header";
import LoginModal from "@/components/modals/LoginModal";
import PostFeed from "@/components/posts/PostFeed";

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  );
}
