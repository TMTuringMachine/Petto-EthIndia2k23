import React, { useState, useEffect } from "react";
import { Flex, Text, Box, Image } from "@chakra-ui/react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, styled, Modal, TextField } from "@mui/material";
import CustomButton from "../../components/custom-button/customButton.component";
import useHosts from "../../hooks/useHosts";
import useChat from "../../hooks/useChat";
import { useNavigate } from "react-router-dom";

const requestData = {
  title: "This is a request title",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id risus sed enim ullamcorper scelerisque luctus et velit. Phasellus in arcu ac metus dictum pretium. Ut arcu purus, dictum quis urna in, finibus fringilla elit. Aliquam ex dui, vestibulum sit amet turpis vel, dictum volutpat nisl. Aliquam tincidunt condimentum arcu ut mollis. Vestibulum a vestibulum urna. Nam at pharetra ante, nec fringilla nisi.",
};

const ImageBox = styled("div")(({ url }) => ({
  width: "30%",
  height: "200px",
  backgroundImage: `url('${url}')`,
  backgroundPosition: "center",
  backgroundSize: "cover",
}));

const RequestOverview = ({ request }) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [total, setTotal] = useState("");
  const [rate, setRate] = useState("");
  const { createChatRoom } = useChat();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { approveUserRequest, rejectUserRequest } = useHosts();
  const approveRequest = () => {
    console.log(total, rate, request._id);
    const data = {
      total,
      rate,
      reqId: request._id,
    };
    approveUserRequest(data);
  };

  const rejectRequest = () => {
    const data = {
      reqId: request._id,
    };
    rejectUserRequest(data);
  };

  const handelChatClick = () => {
    console.log(request.userId, request.hostId);
    createChatRoom(request.userId, request.hostId).then((res) => {
      navigate(`/chat/${res.chatroomId}`);
    });
  };

  const resetPay = () => {};

  let A = () => (
    <Flex margin="20px 0 0 0 ">
      <CustomButton
        sx={{
          width: "25%",
          backgroundColor: "#009688",
          marginRight: "30px",
          "&:hover": { backgroundColor: "#009688" },
        }}
        simple
        onClick={() => {
          setIsAccepted(true);
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
        onClick={rejectRequest}
      >
        REJECT
      </CustomButton>
    </Flex>
  );

  if (request.isApproved && request.isPending && !request.isPaymentDone) {
    A = () => (
      <Flex margin="20px 0 0 0 ">
        <CustomButton
          sx={{
            width: "25%",
            backgroundColor: "#009688",
            marginRight: "30px",
            "&:hover": { backgroundColor: "#009688" },
          }}
          simple
          onClick={handelChatClick}
        >
          CHAT
        </CustomButton>
        <CustomButton
          sx={{
            width: "25%",
            backgroundColor: "#D32F2F",
            "&:hover": { backgroundColor: "#D32F2F" },
          }}
          simple
          onClick={handleOpen}
        >
          RENEW PAY
        </CustomButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Flex
            direction="column"
            borderRadius={"5px"}
            padding={"20px"}
            background={"white"}
            width="40%"
            marginLeft={"auto"}
            marginRight={"auto"}
            marginTop={"2%"}
          >
            <Text fontSize="1.2em">Renew Pay</Text>
            <TextField
              sx={{ margin: "10px 0" }}
              label="Total amount"
              placeholder="$300"
              value={total}
              onChange={(e) => {
                setTotal(e.target.value);
              }}
            />
            <TextField
              sx={{ margin: "10px 0" }}
              label="Fare"
              placeholder="$20/hr"
              value={rate}
              onChange={(e) => {
                setRate(e.target.value);
              }}
            />
            <CustomButton simple onClick={resetPay}>
              SET
            </CustomButton>
          </Flex>
        </Modal>
      </Flex>
    );
  }

  if (!request.isPending) {
    A = () => (
      <Flex margin="20px 0 0 0 ">
        <Text fontSize="1.5em" color="#D32F2F">
          YOU HAVE REJECTED THIS REQUEST !
        </Text>
      </Flex>
    );
  }

  return (
    <Accordion sx={{ margin: "10px 0" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Flex alignItems="center">
          <Avatar src={request?.userId?.profilePic} />
          <Text marginLeft="20px">{request.title}</Text>
        </Flex>
      </AccordionSummary>
      <AccordionDetails>
        <Flex width="100%" direction="column">
          <Text margin="0 0 20px 0">{request.description}</Text>
          <Text fontWeight={700}>
            From {request.from?.Sdate}, {request.from?.Stime} to{" "}
            {request.to?.Edate}, {request.to?.Etime}
          </Text>
          <A />
          {isAccepted ? (
            <Flex direction="column" width="40%" margin="20px 0">
              <Text fontSize="1.2em">
                Please set a rate and total amout for your quoatation
              </Text>
              <TextField
                sx={{ margin: "10px 0" }}
                label="Total amount"
                placeholder="$300"
                value={total}
                onChange={(e) => {
                  setTotal(e.target.value);
                }}
              />
              <TextField
                sx={{ margin: "10px 0" }}
                label="Fare"
                placeholder="$20/hr"
                value={rate}
                onChange={(e) => {
                  setRate(e.target.value);
                }}
              />
              <CustomButton simple onClick={approveRequest}>
                SET
              </CustomButton>
            </Flex>
          ) : null}
        </Flex>
      </AccordionDetails>
    </Accordion>
  );
};

const HostRequest = () => {
  const [requests, setRequests] = useState([]);
  const { getAllRequestsToHost } = useHosts();

  useEffect(() => {
    getAllRequestsToHost().then((res) => {
      setRequests(res);
    });
  }, []);

  return (
    <Flex direction="column" alignItems="center">
      <Box padding="20px" width="90%">
        <Text fontSize="2em">YOUR RECENT REQUESTS:</Text>
        <Flex direction="column" padding="20px 0px">
          {requests.length > 0
            ? requests
                .slice()
                .reverse()
                .map((request) => <RequestOverview request={request} />)
            : null}
          {/* <RequestOverview request={requestData} /> */}
        </Flex>
      </Box>
    </Flex>
  );
};

export default HostRequest;
