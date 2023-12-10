import { useEffect, useState } from "react";
import Post from "../../components/post/Post.component";
import { IoMdAddCircle } from "react-icons/io";
import { Box } from "@chakra-ui/react";
import { PostsContainer } from "./petZone.styles";
import API from "../../utils/axios";
import PetPost from "../../components/petPost/petPost.component";
import { Icon } from "@iconify/react";
import CreatePostModal from "./createPostModal";

const post1 = {
  image:
    "https://post.healthline.com/wp-content/uploads/2020/09/1867-Pets_Vaccination-1296x728-header-1200x628.jpg",
  caption: "this is my pet ",
  likes: 34,
};

const PetZone = () => {
  const [posts, setPosts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const getAllPosts = async () => {
    const res = await API.get("/getAllPosts");
    setPosts(res.data.getAll);
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  console.log(posts);
  return (
    <Box padding="30px">
      <Box
        position="absolute"
        bottom="50px"
        right="50px"
        cursor="pointer"
        onClick={toggleCreateModal}
        zIndex="100"
      >
        <Icon
          icon="fluent:add-circle-32-filled"
          color="#4CAF50"
          fontSize="4em"
        />
      </Box>
      <PostsContainer>
        {posts.length > 0
          ? posts
              .slice()
              .reverse()
              .map((p) => <PetPost post={p} />)
          : null}
        {[...Array(0)].map((p) => (
          <PetPost post={post1} />
        ))}
      </PostsContainer>
      <CreatePostModal
        state={showCreateModal}
        toggleModal={toggleCreateModal}
      />
    </Box>
  );
};

export default PetZone;
