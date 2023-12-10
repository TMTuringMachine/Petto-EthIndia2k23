import React from "react";
import { Avatar } from "@mui/material";
import { Flex, Text } from "@chakra-ui/react";

const HostKey = ({ host, selectHost, selected }) => {
  return (
    <Flex
    width="90%"
      alignItems="center"
      padding="5px 15px"
      margin="15px"
      cursor="pointer"
      backgroundColor={selected ? "#4CAF50" : ""}
      borderRadius="5px"
      color={selected ? "#fff" : "#000"}
      onClick={() => {
        selectHost(host);
      }}
    >
      <Avatar src={host?.profilePic} sx={{ width: 30, height: 30 }} />
      <Text marginLeft="20px">{host?.name}</Text>
    </Flex>
  );
};

export default HostKey;
