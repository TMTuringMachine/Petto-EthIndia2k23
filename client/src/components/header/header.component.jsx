import React, { useEffect, useState } from "react";
import { Flex, Text, Box, Image } from "@chakra-ui/react";
import {
  Avatar,
  Button,
  TextField,
  styled,
  Popover,
  Rating,
} from "@mui/material";
import CustomButton, {
  SecondaryButton,
} from "../custom-button/customButton.component";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./styles.css";
import axios from "../../utils/axios";
import useHosts from "../../hooks/useHosts";
import { ethers } from "ethers";
// const ethers = require("ethers");
const { ethereum } = window;
// let provider = null;
// if (window.ethereum) {
//   provider = new ethers.providers.Web3Provider(window.ethereum);
// } else {
//   alert("Please install MetaMask!");
// }
//
// async function connectWallet() {
//   try {
//     await window.ethereum.enable(); // Request user permission
//     const signer = provider.getSigner();
//     const address = await signer.getAddress();
//     console.log("Connected account:", address);
//     return signer;
//   } catch (error) {
//     console.error(error);
//   }
// }
//
// async function signMessage(signer, message) {
//   try {
//     const signature = await signer.signMessage(message);
//     return signature;
//   } catch (error) {
//     console.error(error);
//   }
// }
//
// function authenticateWithMetaMask() {
//   const message = "Authenticate with My App";
//   connectWallet()
//     .then((signer) => {
//       signMessage(signer, message)
//         // Send signed message to server for verification
//         .then((signature) => {
//           // ...
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

const secondaryButton = {
  marginRight: "20px",
  border: "#4CAF50",
  color: "#4CAF50",
  backgroundColor: "white",
};

const SearchBar = styled(TextField)(() => ({
  width: "30vw",
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

const Dropdown = ({ searchQuery, hosts }) => {
  const [filteredHosts, setFilteredHosts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setFilteredHosts(hosts);
    setQuery(searchQuery);
    const newCourses = hosts.filter((host) =>
      host.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredHosts(newCourses);
  }, [searchQuery]);

  const navigate = useNavigate();

  return (
    <Box
      width="70vw"
      marginLeft="120px"
      zIndex="99999"
      position="absolute"
      top="60px"
      backgroundColor="#fff"
      borderRadius="5px"
      maxHeight="200px"
      overflowY="scroll"
      display={query.length > 0 ? "block" : "none"}
    >
      {filteredHosts.map((host) => (
        <Flex
          height="50px"
          padding="5px 10px"
          alignItems="center"
          _hover={{ backgroundColor: "#dfdfdf" }}
          cursor="pointer"
          onClick={() => {
            navigate(`/host/${host?._id}`);
            setQuery("");
          }}
        >
          <Image
            src={host?.profilePic}
            height="40px"
            width="40px"
            borderRadius="5px"
            marginRight="10px"
          />{" "}
          {host.name}
        </Flex>
      ))}
    </Box>
  );
};

const DropDownKey = ({ text, iconName, ...props }) => {
  return (
    <Button
      sx={{
        width: "200px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "5px 10px",
        margin: "5px 0",
        color: "#000",
        "&:hover": {
          backgroundColor: "#4CAF50",
          color: "#fff",
        },
        borderRadius: "5px",
      }}
      {...props}
    >
      <Icon icon={iconName} />

      <Text marginLeft="10px">{text}</Text>
    </Button>
  );
};

const Header = () => {
  const [hosts, setHosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { getAllHosts } = useHosts();
  const [signer, setSigner] = useState(null);
  const [currAccount, setCurrAccount] = useState();
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      setCurrAccount(accounts[0]);
      updateUserMetamaskAddress(user?._id, accounts[0]);
    } catch (e) {}
  };
  const connectWallet = async () => {
    if (!ethereum) {
      return alert("Please install metamask");
    }
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setCurrAccount(accounts[0]);
    updateUserMetamaskAddress(user?._id, accounts[0]);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { logout, user, updateUserMetamaskAddress } = useAuth();

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getAllHosts().then((res) => {
      setHosts(res);
    });
  }, []);
  // useEffect(() => {
  //   connectWallet().then((signer) => setSigner(signer));
  // }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Flex
      height="60px"
      padding="5px 10px"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex direction="row" alignItems="center" height="100%">
        <Text
          fontFamily="Hurricane"
          fontSize="2em"
          lineHeight="100%"
          margin="0 30px 0 20px"
          onClick={() => {
            navigate("/home");
          }}
          cursor="pointer"
        >
          Petto
        </Text>
        <SearchBar
          variant="outlined"
          sx={{ padding: "0px" }}
          placeholder="Search care takers"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </Flex>
      <Dropdown searchQuery={searchQuery} hosts={hosts} />
      {!currAccount && <Button onClick={connectWallet}>Connect Wallet</Button>}
      {currAccount && (
        <p>
          Connected as:{" "}
          {`${currAccount.slice(0, 5)}...${currAccount.slice(
            currAccount.length - 5,
            currAccount.length,
          )}`}
        </p>
      )}
      <Flex direction="row" padding="0 20px" alignItems="center">
        <SecondaryButton
          style={{ marginRight: "20px" }}
          className="secondary-btn"
          onClick={() => navigate("/petZone")}
        >
          Pet Lovers Zone{" "}
        </SecondaryButton>
        {user?.isHost ? (
          <Box color="#4CAF50">HOST</Box>
        ) : user?.isPending ? (
          <CustomButton onClick={() => {}}>REQUEST PENDING</CustomButton>
        ) : (
          <CustomButton onClick={() => navigate("/hostVerify")}>
            BECOME A HOST{" "}
          </CustomButton>
        )}

        <Avatar
          src={user?.profilePic}
          sx={{ marginLeft: "20px" }}
          aria-describedby={id}
          onClick={handleClick}
        />
        <Popover
          sx={{ marginTop: "10px" }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <Box padding="10px">
            <DropDownKey text="My Profile" iconName="bx:user-circle" />
            <DropDownKey text="Messages" iconName="jam:messages-alt-f" onClick={() => {
                navigate("/chats");
              }} />
            <DropDownKey
              text="View requests"
              iconName="bx:message-check"
              onClick={() => {
                navigate("/host/requests");
              }}
            />
            <DropDownKey
              text="My Requests"
              iconName="carbon:data-view-alt"
              onClick={() => {
                navigate("/myRequests");
              }}
            />

            <DropDownKey
              text="Logout"
              iconName="ri:logout-circle-line"
              onClick={() => {
                logout();
              }}
            />
          </Box>
        </Popover>
      </Flex>
    </Flex>
  );
};

export default Header;
