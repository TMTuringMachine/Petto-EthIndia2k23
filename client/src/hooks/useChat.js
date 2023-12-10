import React, { useCallback } from "react";
import axios from "../utils/axios";

import { createMessageBox } from "../fireabse/firebase.utils";

const useChat = () => {
  const createChatRoom = useCallback(async (userId, hostId) => {
    //check if exist
    console.log(userId, hostId, "here iwehf");
    const res = await axios.post("/isChatroomExist", { userId, hostId });
    if (!res.data.ok) {
      const a = await createMessageBox(userId, hostId);

      const response2 = await axios.post("/createChat", {
        userId,
        hostId,
        messageBoxId: a,
      });

      return {
        userId,
        messageBoxId: a,
        hostId,
        chatroomId:response2.data.chatroom._id
      };
    } else {
      console.log(res.data);
      if (res.data.ok) {
        return {
          userId,
          messageBoxId: res.data.chatroom.messageBoxId,
          hostId,
          chatroomId:res.data.chatroom._id
        };
      }
      return;
    }
    //if exist return messagebox did
    //if not create message box id
    //create char room
  });


  const getChatroom = useCallback(async (id)=>{
    const res = await axios.get(`/chatroom/${id}`);
    console.log(res);
    if(res.data.ok){
      return res.data.chatroom;
    }
    return ;
  })

  return {
    createChatRoom,
    getChatroom
  };
};

export default useChat;
