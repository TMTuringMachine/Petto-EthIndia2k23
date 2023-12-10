import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import loginImg from "../../assets/loginImg.png";
import { Text } from "@chakra-ui/layout";
import { TextField } from "@mui/material";
import CustomButton from "../../components/custom-button/customButton.component";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  const { registerAdmin, isLoggedIn } = useAuth();

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    registerAdmin(data);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn]);

  return (
    <Flex>
      <Box w="50%" h="100vh">
        <Image h="100vh" w="100%" src={loginImg}></Image>
      </Box>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        w="50%"
        h="100vh"
      >
        <Flex
          p="0.5rem"
          h="auto"
          boxShadow="2px 2px 10px #D3D3D3"
          w="60%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          borderRadius="10px"
          position="relative"
        >
          <Text p="0.4rem" m="1rem" fontWeight="400" fontSize="1.8rem">
            Create an account
          </Text>
          <TextField
            sx={{ marginBottom: "1rem", width: "80%" }}
            id="standard-basic"
            label="Name"
            variant="outlined"
            name="name"
            onChange={(e) => onChangeHandler(e)}
          />
          <TextField
            sx={{ marginBottom: "1rem", width: "80%" }}
            id="standard-basic"
            label="Email"
            variant="outlined"
            name="email"
            onChange={(e) => onChangeHandler(e)}
          />
          <TextField
            sx={{ width: "80%", marginBottom: "1rem" }}
            id="standard-basic"
            label="Pawsword"
            variant="outlined"
            name="password"
            type="password"
            onChange={(e) => onChangeHandler(e)}
          />
          <TextField
            sx={{ width: "80%" }}
            id="standard-basic"
            label="Comfirm Pawsword"
            variant="outlined"
            name="cpassword"
            type="password"
            onChange={(e) => onChangeHandler(e)}
          />
          <Box w="50%" mt="2rem">
            <CustomButton
              sx={{
                padding: "0.6rem",
                width: "80%",
                fontSize: "1.2rem",
              }}
              onClick={(e) => onSubmitHandler(e)}
            >
              Sign Up
            </CustomButton>
          </Box>
          <Flex mt="3rem" alignItems="flex-end">
            Already a pawember?{" "}
            <span>
              <a style={{ marginLeft: "0.2rem" }} href="/login">
                {" "}
                Login here
              </a>
            </span>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
