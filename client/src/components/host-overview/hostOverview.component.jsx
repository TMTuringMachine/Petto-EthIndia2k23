import { Flex, Text } from "@chakra-ui/react";
import { Avatar, Rating, ButtonBase, Button } from "@mui/material";
import React from "react";
import CustomButton from "../custom-button/customButton.component";
import { useNavigate} from 'react-router-dom';

const HostOverview = ({ host }) => {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate(`/host/${host._id}`)
  }
  return (
    <ButtonBase onClick={handleClick} >
      <Flex
        direction="column"
        alignItems="center"
        cursor="pointer"
        backgroundColor="#f5f5f5"
        boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
        padding="20px"
        borderRadius="10px"
        transition="all 0.2s ease-in"
        _hover={{
          transform:'scale(1.02)',
          boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
        }}
      >
        <Avatar src={host?.profilePic} sx={{ width: 200, height: 200 }} />
        <Text fontSize="1.5em" margin="10px">
          {host?.name}
        </Text>
        <Rating value={3} readOnly size="large" />
      </Flex>
    </ButtonBase>
  );
};

export default HostOverview;
