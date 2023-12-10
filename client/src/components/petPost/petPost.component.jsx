import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import { PetPostContainer } from "./petPost.styles";
import axios from "../../utils/axios";



const PetPost = ({ imageUrl, post }) => {
  const [spanNumber, setspanNumber] = useState(0);
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLikes] = useState(false);
  const navigate = useNavigate();

  const handleDblClick = async () => {
    const res = await axios.post("/likeAPI", { postId: post._id });
    setLikes(likes+1);
    setIsLikes(true);
  };

  useEffect(() => {
    // const nums = [26, 33, 45, 40, 37];
    const nums = [19, 26, 22, 26, 30];
    const idx = Math.floor(Math.random() * nums.length);
    setspanNumber(nums[idx]);
  }, []);

  return (
    <PetPostContainer
      spanNum={spanNumber}
      url={post.image}
      onDoubleClick={handleDblClick}
      //   onClick={() => {
      //     navigate(`/project/${project._id}`);
      //   }}
    >
      {/* <Icon icon="clarity:bookmark-line" className="bookmarkIcon" color="#fff"/> */}

      <div className="project-info-bar">
        <p className="postTitle">{post?.caption}</p>
        <span className="star-container">
          {likes || 0}{" "}
          {isLiked ? (
            <Icon icon="ant-design:heart-filled"  fontSize="0.8em" color="#fff" />
          ) : (
            <Icon icon="akar-icons:heart" fontSize="0.8em" color="#fff" />
          )}
        </span>
      </div>
    </PetPostContainer>
  );
};

export default PetPost;
