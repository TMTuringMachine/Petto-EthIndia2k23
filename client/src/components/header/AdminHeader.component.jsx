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

const secondaryButton = {
  marginRight: "20px",
  border: "#4CAF50",
  color: "#4CAF50",
  backgroundColor: "white",
};

const SearchBar = styled(TextField)(() => ({
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

const Dropdown = ({ searchQuery, hosts }) => {
  const [filteredHosts, setFilteredHosts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setFilteredHosts(hosts);
    setQuery(searchQuery);
    const newCourses = hosts.filter((host) =>
      host.name.toLowerCase().includes(searchQuery.toLowerCase())
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

const AdminHeader = () => {
  const [hosts, setHosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { getAllHosts } = useHosts();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { logout, user } = useAuth();

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getAllHosts().then((res) => {
      setHosts(res);
    });
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Flex
      height="60px"
      padding="5px 10px"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="1px 1px 20px #D3D3D3"
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
          Petscape
        </Text>
      </Flex>
      <Dropdown searchQuery={searchQuery} hosts={hosts} />
      <Flex direction="row" padding="0 20px" alignItems="center">
        <Box color="#4CAF50">ADMIN</Box>
        <Avatar
          src={
            user?.profilePic ||
            "data:image/png;base64,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"
          }
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

export default AdminHeader;
