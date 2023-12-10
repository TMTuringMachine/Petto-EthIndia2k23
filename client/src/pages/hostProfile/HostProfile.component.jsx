import React, { useState, useEffect } from "react";
import "./HostProfile.css";
import RoomIcon from "@mui/icons-material/Room";
import Rating from "@mui/material/Rating";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import HostFormModal from "./HostFormModal";
import useHosts from "../../hooks/useHosts";
import useAuth from "../../hooks/useAuth";
import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { Avatar, Chip, Grid } from "@mui/material";
import { Icon } from "@iconify/react";

import CustomButton from "../../components/custom-button/customButton.component";

const HostProfile = () => {
  const { user } = useAuth();
  const { getSingleHost } = useHosts();
  const [User, setUser] = useState(null);
  const [requested, setRequested] = useState(false);
  const id = window.location.pathname.split("/")[2];
  useEffect(() => {
    let isBooked = user.userRequest.some((u) => u.hostId == id);
    setRequested(isBooked);
    getSingleHost(id).then((res) => setUser(res));
  }, [id]);

  const toggleImageModal = () => {
    setState(!state);
  };
  const [state, setState] = useState(false);
  return (
    <Box width="100%">
      <Box width="100%" height="250px" bgColor="#4CAF50"></Box>
      <Box transform="translateY(-200px)">
        <Box
          borderRadius={"10px"}
          boxShadow={"2px 2px 10px #D3D3D3"}
          margin={"0% 5%"}
          padding="20px"
          width="60%"
          marginX="auto"
          bgColor="#f5f5f5"

          // p={"0.5rem"}
        >
          <HostFormModal state={state} toggleModal={toggleImageModal} />
          <Box display="flex" gap="30px">
            <Avatar src={User?.profilePic} sx={{ width: 200, height: 200 }} />
            <Box display="flex" flexDirection="column">
              <Text fontSize="3em">
                {User?.name}{" "}
                <VerifiedUserIcon
                  sx={{ color: "#FF9800", marginLeft: "2rem" }}
                  fontSize="large"
                />
              </Text>
              <Text color="#a3a3a3" fontSize="0.9em">
                250m from you
              </Text>
              <Flex marginTop="10px">
                {User?.hostType === "animal" || User?.hostType === "both" ? (
                  <Chip
                    label="Pets"
                    icon={<Icon icon="ic:twotone-pets" />}
                    sx={{ marginRight: "20px" }}
                  />
                ) : null}
                {User?.hostType === "plant" || User?.hostType === "both" ? (
                  <Chip label="Plants" icon={<Icon icon="ri:plant-fill" />} />
                ) : null}
              </Flex>
              <Text color="#919191" fontSize="1.2em" marginTop="10px">
                {User?.hostBio}
              </Text>

              <Rating
                value={4}
                readOnly
                size="large"
                sx={{ marginTop: "0px" }}
              />
              <Box marginTop="20px">
                {!requested ? (
                  <CustomButton
                    simple
                    sx={{
                      width: "40%",
                    }}
                    onClick={() => {
                      setState(!state);
                    }}
                  >
                    BOOK
                  </CustomButton>
                ) : (
                  <CustomButton disabled={true} simple>
                    ALREADY BOOKED
                  </CustomButton>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box padding="30px">
          <h1>PHOTOS</h1>
          <Grid container sx={{ marginTop: "20px" }} spacing={5} columns={10}>
            {User?.hostImages.map((img) => (
              <Grid item md={2}>
                <Box
                  backgroundImage={`url('${img}')`}
                  width="270px"
                  height="270px"
                  backgroundPosition="center"
                  backgroundSize="cover"
                  borderRadius="10px"
                />
              </Grid>
            ))}
            {/* {[...Array(5)].map((i) => (
              <Grid item md={2}>
                <Box
                  backgroundImage={`url('https://www.nestle.com/sites/default/files/pet-care-header.jpg')`}
                  width="270px"
                  height="270px"
                  backgroundPosition="center"
                  backgroundSize="cover"
                  borderRadius="10px"
                />
              </Grid>
            ))} */}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default HostProfile;
