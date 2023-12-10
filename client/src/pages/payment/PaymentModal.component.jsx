import { Box } from "@chakra-ui/react";
import { Button, Modal, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import CustomButton from "../../components/custom-button/customButton.component";

const PaymentModal = ({ state, toggleModal, req }) => {
  return (
    <Modal open={state} onClose={toggleModal}>
      <Box
        width="30vw"
        height="fit-content"
        maxHeight="80vh"
        position="absolute"
        outline="none"
        borderRadius={10}
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
        bgColor="#fff"
        display="flex"
        alignItems="center"
        flexDirection="column"
        padding="20px"
        gap="20px"
      >
        <Typography sx={{ fontSize: "1.2em", fontWeight: 600 }}>
          Payment Confirmation Modal
        </Typography>
        <Box
          sx={{
            backgroundColor: "#DCDCDC",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Typography sx={{ fontSize: "0.8em" }}>Booking overview</Typography>
          <Typography sx={{ fontSize: "1.1em" }}>
            {moment(req?.from?.Sdate).format("MMMM Do YYYY")} to{" "}
            {moment(req?.from?.Edate).format("MMMM Do YYYY")}
          </Typography>
          <Typography sx={{ fontSize: "1.3em" }}>
            Price: {req.price?.total}
          </Typography>
        </Box>
        <CustomButton>PAY !</CustomButton>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
