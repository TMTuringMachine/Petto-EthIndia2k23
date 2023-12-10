import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import React, { useState } from "react";
import DummyDp from "../../assets/DummyDp.png";
import moment from "moment";
import CustomButton from "../custom-button/customButton.component";
import Payment from "../../pages/payment/Payment.component";
const ClientRequestCard = ({ req }) => {
  let moment = require("moment");
  if ("default" in moment) {
    moment = moment["default"];
  }
  const [click, setClick] = useState(true);
  console.log(req.hostId);
  return (
    <Box
      borderRadius="10px"
      boxShadow="2px 2px 10px #D3D3D3"
      p="1rem 0.2rem"
      w="60%"
      h="auto"
      backgroundColor="white"
      mb="2rem"
    >
      <Flex justifyContent="start" alignItems="start">
        <Image
          m="1rem"
          w="10rem"
          h="10rem"
          borderRadius="50%"
          src={req.hostId.profilePic}
        ></Image>
        <Box>
          {req.isPending && req.isApproved ? (
            <Text
              fontSize="1.3rem"
              fontWeight="600"
              textAlign="start"
              color="#4CAF50"
            >
              🎉 Wohoo! Your Host approved your Request 🎉
            </Text>
          ) : !req.isApproved && req.isPending ? (
            <Text
              fontSize="1.5rem"
              fontWeight="600"
              textAlign="start"
              color="#4CAF50"
            >
              Your request has been successfully sent to the host!
            </Text>
          ) : (
            req.isApproved &&
            !req.isPending && (
              <Text
                fontSize="1.3rem"
                fontWeight="600"
                textAlign="start"
                color="#4CAF50"
              >
                Your Past orders
              </Text>
            )
          )}

          <Flex
            justifyContent="center"
            flexDirection="column"
            // alignItems="center"
          >
            <Text m="0.4rem" textAlign="start">
              <span style={{ fontWeight: "600" }}>Your Request</span>:{" "}
              {req.title}
            </Text>
            <Text m="0.4rem" textAlign="start">
              <span style={{ fontWeight: "600" }}>Description</span>:{" "}
              {req.description}
            </Text>
            <Text m="0.4rem" textAlign="start">
              <span style={{ fontWeight: "600" }}>Host Name</span>:{" "}
              {req.hostId.name}
            </Text>

            <Flex gap="30px">
              <Text m="0.4rem">
                <span style={{ fontWeight: "600" }}>Start Date:</span>{" "}
                {moment(req.from.Sdate).format("MMMM Do YYYY")}
              </Text>

              <Text m="0.4rem">
                <span style={{ fontWeight: "600" }}>Till:</span>{" "}
                {moment(req.from.Edate).format("MMMM Do YYYY")}
              </Text>
            </Flex>
            <Text m="0.4rem" textAlign="start">
              <span style={{ fontWeight: "600" }}>Price</span>:{" "}
              {req.price?.total || "not fixed"}
            </Text>
          </Flex>
          {req.isApproved && req.isPending && (
            <Flex gap="30px" marginTop="20px">
              <CustomButton simple sx={{ marginRight: "0.8rem" }}>
                Chat with the Host!
              </CustomButton>
              <Payment
                req={req}
                state={click}
                toggleState={setClick}
                price={req.price?.total}
              />
            </Flex>
          )}
        </Box>
        {/* <Text m="0.4rem">
          <span style={{ fontWeight: "600" }}>Total Price:</span> 88
        </Text> */}
      </Flex>
    </Box>
  );
};
export default ClientRequestCard;
