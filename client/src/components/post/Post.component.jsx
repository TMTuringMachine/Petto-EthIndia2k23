import "./post.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import API from "../../utils/axios";

const Post = ({post}) => {

    const LikeAPi = async()=>{
        const res = await API.post("/likeAPI",{postId:post._id});
    }

    const [isLiked, setIsLiked] = useState(false);
    const toggleIsLiked = () => {
        setIsLiked(!isLiked);
        console.log(isLiked);
    }
    return (
        <div className="post-container">
            <div className="author-container">
                <div className="dp-container">
                    <div className="display-pic"></div>
                </div>
                <div className="info-container">
                    <div className="username">{post.author.name}</div>
                    <div className="caption">{post.caption}</div>
                </div>
            </div>
            <div className="image-container">
                <img src={post.image} alt=""/>
            </div>
            <div className="likes-container">
                {/* <FavoriteIcon onClick={() => toggleIsLiked} cursor="pointer" style={{color: "#DD5555"}} fontSize="large"/> */}
                {
                    isLiked? <FavoriteIcon onClick={()=>{
                        toggleIsLiked()
                        LikeAPi()
                    }} cursor="pointer" style={{color: "#DD5555"}} fontSize="large"/>
                    : 
                    <FavoriteBorderIcon onClick={()=>{
                        toggleIsLiked()
                        LikeAPi()
                    
                    }} cursor="pointer" color="#4B4B4B" fontSize="large"/>
                }
                    
                <p id="like-count">{post.likes}</p>
                <p>Likes</p>
            </div>
        </div>
    )
}

export default Post;