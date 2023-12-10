import React, { useEffect, useState } from "react";
import { Image, Box } from "@chakra-ui/react";

import { Modal } from "@mui/material";
import { Flex } from "@chakra-ui/layout";
import { TextField } from "@mui/material";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import useAuth from "../../hooks/useAuth";

import CustomButton from "../../components/custom-button/customButton.component";
import useHosts from "../../hooks/useHosts";
const HostFormModal = ({ state, toggleModal, url }) => {
  const { user } = useAuth();
  const [host, setHost] = useState("");
  const [data, setData] = useState({
    title: "",
    description: "",
    Sdate: "",
    Stime: "",
    Edate: "",
    Etime: "",
    hostId: window.location.pathname.split("/")[2],
    userId: user?._id,
  });

  const { sendRequest } = useHosts();

  useEffect(() => {
    console.log(window.location.pathname.split("/")[2]);
  }, []);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    sendRequest(data);
    console.log(data);
  };
  return (
    <Modal open={state} onClose={toggleModal}>
      <Box
        width="40vw"
        height="auto"
        position="absolute"
        padding="1rem"
        borderRadius="10px"
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
        backgroundColor="white"
      >
        <Flex justify="center" alignItems="center" flexDirection="column">
          <Box fontSize="2rem" fontWeight="600" m="1.2rem">
            Book Your Host!
          </Box>
          <TextField
            sx={{ marginBottom: "1rem", width: "80%" }}
            id="standard-basic"
            label="Title"
            variant="outlined"
            name="title"
            onChange={(e) => onChangeHandler(e)}
          />
          <TextField
            sx={{ marginBottom: "1rem", width: "80%" }}
            id="standard-basic"
            label="Description"
            variant="outlined"
            name="description"
            multiline
            rows={4}
            onChange={(e) => onChangeHandler(e)}
          />
          <Flex justify="center" flexDirection="column" gap="20px" width="80%" marginTop="20px" marginBottom="30px" > 
            <Flex justify="start" alignItems="center">
              <Text m="0.5rem">Start date: </Text>
              <Input
                // boxShadow="2px 2px 10px #D3D3D3"
                border="2px solid #4CAF50"
                borderRadius="5px"
                fontSize="1.2rem"
                type="date"
                name="Sdate"
                padding="5px 10px"
                onChange={(e) => onChangeHandler(e)}
              />
              <Text m="0.5rem">Start time</Text>
              <Input
                // boxShadow="2px 2px 10px #D3D3D3"
                border="2px solid #4CAF50"
                borderRadius="5px"
                fontSize="1.2rem"
                onChange={(e) => onChangeHandler(e)}
                name="Stime"
                w="20%"
                padding="5px 10px"
              />
            </Flex>
            <Flex justify="start" alignItems="center">
              <Text m="0.5rem">End date:</Text>
              <Input
                // boxShadow="2px 2px 10px #D3D3D3"
                border="2px solid #4CAF50"
                borderRadius="5px"
                fontSize="1.2rem"
                type="date"
                onChange={(e) => onChangeHandler(e)}
                name="Edate"
                padding="5px 10px"
              />
              <Text m="0.5rem">End Time</Text>
              <Input
                // boxShadow="2px 2px 10px #D3D3D3"
                border="2px solid #4CAF50"
                borderRadius="5px"
                fontSize="1.2rem"
                onChange={(e) => onChangeHandler(e)}
                name="Etime"
                w="20%"
                padding="5px 10px"
              />
            </Flex>
          </Flex>
          <CustomButton
            onClick={(e) => {
              onSubmitHandler(e);
              toggleModal();
            }}
            sx={{ marginTop: "1.2rem", fontSize: "1.2rem" }}
          >
            Book now!
          </CustomButton>
        </Flex>
      </Box>
    </Modal>
  );
};
export default HostFormModal;
