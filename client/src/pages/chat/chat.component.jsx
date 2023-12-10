import React, { useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

import HostKey from "../../components/host-key/hostKey.component";
import { TextField, styled } from "@mui/material";
import CustomButton from "../../components/custom-button/customButton.component";

const InputBar = styled(TextField)(() => ({
  width: "50vw",
  "& input": {
    padding: "8px 25px",
  },
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#000",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    "& fieldset": {
      borderColor: "#000",
    },
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
  },
}));

const hostsData = [
  {
    name: "Ema August1",
    id: 1,
    profilePic:
      "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    email: "emaaugust@gmail.com",
    hostBio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu ligula vel nisi tincidunt feugiat a ut nunc. Etiam a purus nec nisi porta vestibulum. Cras sagittis volutpat auctor. Cras blandit purus lectus, vel malesuada purus pretium feugiat. Sed eget faucibus ligula. Nullam consequat euismod purus, at rutrum odio porta non. Fusce imperdiet diam libero, sit amet maximus elit rhoncus ac.",
    gender: "Female",
    hostType: "Animal",
    phone: "1234567890",
    interest: "Animal",
    idProof:
      "https://images.unsplash.com/photo-1638491103443-ee361905f6e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Ema August2",
    id: 2,
    profilePic:
      "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    email: "emaaugust@gmail.com",
    hostBio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu ligula vel nisi tincidunt feugiat a ut nunc. Etiam a purus nec nisi porta vestibulum. Cras sagittis volutpat auctor. Cras blandit purus lectus, vel malesuada purus pretium feugiat. Sed eget faucibus ligula. Nullam consequat euismod purus, at rutrum odio porta non. Fusce imperdiet diam libero, sit amet maximus elit rhoncus ac.",
    gender: "Female",
    hostType: "Animal",
    phone: "1234567890",
    interest: "Animal",
    idProof:
      "https://images.unsplash.com/photo-1638491103443-ee361905f6e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Ema August3",
    id: 3,
    profilePic:
      "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    email: "emaaugust@gmail.com",
    hostBio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu ligula vel nisi tincidunt feugiat a ut nunc. Etiam a purus nec nisi porta vestibulum. Cras sagittis volutpat auctor. Cras blandit purus lectus, vel malesuada purus pretium feugiat. Sed eget faucibus ligula. Nullam consequat euismod purus, at rutrum odio porta non. Fusce imperdiet diam libero, sit amet maximus elit rhoncus ac.",
    gender: "Female",
    hostType: "Animal",
    phone: "1234567890",
    interest: "Animal",
    idProof:
      "https://images.unsplash.com/photo-1638491103443-ee361905f6e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];

const Chat = () => {
  const [selectedHost, setSelectedHost] = useState(null);

  const selectHost = (host) => {
    setSelectedHost(host);
  };

  return (
    <Flex
      width="80%"
      height="85%"
      margin="20px auto"
      boxShadow="0px 7.71233px 19.2808px rgba(35, 35, 35, 0.2)"
    >
      <Flex
        direction="column"
        width="25%"
        borderRight="1px solid #000"
        padding="10px"
      >
        <Text>RECENT CONTACTS:</Text>
        {hostsData.map((host, index) => (
          <HostKey
            key={index}
            host={host}
            selectHost={selectHost}
            selected={host.id === selectedHost?.id}
          />
        ))}
      </Flex>
      <Flex direction="column" width="75%">
        {selectedHost == null ? null : (
          <>
            <Flex
              height="40px"
              borderBottom="1px solid black"
              alignItems="center"
              padding="0 20px"
            >
              <Text fontWeight={600} fontSize="1.2em" color="#4CAF50">
                {selectedHost?.name}
              </Text>
            </Flex>
            <Flex width="100%" flex="1"></Flex>
            <Flex height="50px" alignItems="center" justify="space-around">
              <InputBar autoFocus />
              <CustomButton sx={{ padding: "7px 30px" }}>SEND</CustomButton>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Chat;
