import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
// import { Chat } from "@pushprotocol/uiweb";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ChatView, ChatUIProvider, darkChatTheme } from "@pushprotocol/uiweb";
import { Avatar, Box } from "@mui/material";
import { formatMetamaskAddress } from "../../utils/helper";
const { ethereum } = window;

const ChatComponent = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [signer, setSigner] = useState();
  const [chats, setChats] = useState([]);
  const [render, setRender] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(async () => {
    const userAddress = await ethereum.request({ method: "eth_accounts" });
    console.log("ME", userAddress);
    setCurrentUser(userAddress[0]);

    // signet set
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer);

    // user set kartoy for current chat
    const user = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.PROD });
    const chats = await user.chat.list("CHATS");
    setChats(chats);
    console.log("chats", chats);
    if (chats.length > 0) setSelectedChat(chats[0].chatId);

    const stream = await user.initStream([CONSTANTS.STREAM.CHAT]);

    stream.on(CONSTANTS.STREAM.CHAT, (message) => {
      console.log(message);
      setRender(!render);
    });

    stream.connect();

    const userReq = await user.chat.list("REQUESTS");
    console.log("REQQQ", userReq);

    userReq.length > 0 &&
      userReq.map(async (request) => {
        const address = request.wallets.split(":")[1];
        await user.chat.accept(address);
      });
  }, []);

  useEffect(() => {
    console.log(selectedChat, "lp");
  }, [selectedChat]);

  // useEffect(async() => {
  //   const user = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.PROD });
  //   const chats = await user.chat.list("CHATS");
  //   setChats(chats)
  //   console.log("chats",chats)
  //   if(chats.length > 0) setSelectedChat(chats[0].chatId)
  // }, [render])

  return (
    <Box
      sx={{
        width: "100%",
        height: "95%",
        display: "flex",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          width: "20%",
          backgroundColor: "#EDF1FD",
          display: "flex",
          flexDirection: "column",
          // gap: "10px",
        }}
      >
        {chats.map((chat) => (
          <Box
            sx={{
              padding: "15px 10px",
              backgroundColor:
                selectedChat === chat.chatId ? "#CA599A" : "#fff",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectedChat(chat.chatId);
            }}
          >
            <Avatar />
            {formatMetamaskAddress(chat?.chatId)}
          </Box>
        ))}
      </Box>

      <ChatUIProvider account={currentUser} signer={signer}>
        <ChatView chatId={selectedChat} limit={10} />
      </ChatUIProvider>
    </Box>
  );

  // return (
  //   <>
  //   <div>
  //     {
  //       chats.map((chat)=>{
  //         return(
  //           selectedChat!==chat.chatId?<div style={{"padding":"10px","cursor":"pointer"}} onClick={()=>setSelectedChat(chat.chatId)} >{chat.chatId}</div>:<div style={{"background":"red","padding":"10px","cursor":"pointer"}} onClick={()=>setSelectedChat(chat.chatId)} >{chat.chatId}</div>
  //         )
  //       })
  //     }
  //
  //   </div>
  //
  //   <ChatUIProvider account={currentUser} signer={signer}>
  //     <ChatView
  //       chatId={selectedChat}
  //       limit={10}
  //     />
  //   </ChatUIProvider>
  //   </>
  // )
};

export default ChatComponent;
