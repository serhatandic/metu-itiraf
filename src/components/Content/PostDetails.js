import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ContentCard from "./ContentCard";

function PostDetails({ posts }) {
  const { postid } = useParams();
  const navigate = useNavigate();

  const post = posts?.find((post) => post.postid === postid);

  const closePost = () => {
    navigate("/");
  };

  // Now you can use this post to display the post details inside a modal
  // When the modal is closed, call closePost

  return post ? (
    <ContentCard
      showContent={true}
      content={post.content}
      postid={postid}
      header={post.header}
      date={post.date}
      nickname={post.nickname}
      instagramProfileUrl={post.instagramProfileUrl}
      closePost={closePost}
    />
  ) : null;
}

export default PostDetails;
