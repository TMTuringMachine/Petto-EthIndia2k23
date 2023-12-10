import React, { useState, useEffect } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { Avatar } from "@mui/material";
import CustomButton from "../../components/custom-button/customButton.component";
import ImageModal from "./viewImageModal";

import useAdmins from "../../hooks/useAdmins";

import HostKey from "../../components/host-key/hostKey.component";
import AdminHeader from "../../components/header/AdminHeader.component";

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

const AdminPage = () => {
  const [selectedHost, setSelecetedHost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hosts, setHosts] = useState([]);

  const { getAllPendingHosts, rejectHost, approveHost } = useAdmins();

  const selectHost = (host) => {
    setSelecetedHost(host);
  };

  useEffect(() => {
    getAllPendingHosts().then((res) => {
      setHosts(res);
      setSelecetedHost(res[0]);
    });
  }, []);

  const toggleImageModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <AdminHeader />
      <Box width="100vw" height="100vh" display="grid" placeItems="center">
        <Flex
          height="80%"
          width="80%"
          boxShadow="0px 7.71233px 19.2808px rgba(35, 35, 35, 0.2)"
          justifyContent="space-between"
        >
          <Flex
            direction="column"
            width="20%"
            height="100%"
            alignItems="center"
            borderRight="1px solid black"
          >
            {hosts.map((host) => (
              <HostKey
                host={host}
                selectHost={selectHost}
                selected={selectedHost?._id == host?._id}
              />
            ))}
          </Flex>
          {hosts.length > 0 ? (
            <Flex
              direction="column"
              width="75%"
              height="100%"
              padding="20px 30px 20px 0"
              justifyContent="space-between"
            >
              <Box>
                <Flex>
                  <Avatar
                    src={selectedHost?.profilePic}
                    sx={{ width: 200, height: 200 }}
                  />
                  <Flex direction="column" marginLeft="30px">
                    <Text fontSize="3em">{selectedHost?.name}</Text>
                    <Text fontSize="1.5em" margin="2px 0px 10px 0px">
                      {selectedHost?.email}
                    </Text>
                    <Text fontSize="1.2em" margin="2px 0px 10px 0px">
                      {selectedHost?.gender}
                    </Text>
                    <Text fontSize="1.2em">{selectedHost?.phone}</Text>
                  </Flex>
                </Flex>
                <Text marginTop="20px">{selectedHost?.hostBio}</Text>
                <CustomButton
                  sx={{ width: "25%", marginTop: "20px" }}
                  simple
                  onClick={toggleImageModal}
                >
                  VIEW ID PROOF
                </CustomButton>
                <ImageModal
                  state={showModal}
                  toggleModal={toggleImageModal}
                  url={selectedHost?.idProof}
                />
              </Box>

              <Flex direction="row" width="100%" justify="end">
                <CustomButton
                  sx={{
                    width: "25%",
                    backgroundColor: "#009688",
                    marginRight: "30px",
                    "&:hover": { backgroundColor: "#009688" },
                  }}
                  simple
                  onClick={() => {
                    approveHost({ _id: selectedHost._id });
                  }}
                >
                  ACCEPT
                </CustomButton>
                <CustomButton
                  sx={{
                    width: "25%",
                    backgroundColor: "#D32F2F",
                    "&:hover": { backgroundColor: "#D32F2F" },
                  }}
                  simple
                  onClick={() => {
                    rejectHost({ _id: selectedHost._id });
                    window.location.reload();
                  }}
                >
                  REJECT
                </CustomButton>
              </Flex>
            </Flex>
          ) : null}
        </Flex>
      </Box>
    </Box>
  );
};

export default AdminPage;
