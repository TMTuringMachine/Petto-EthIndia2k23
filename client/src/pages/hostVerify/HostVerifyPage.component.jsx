import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { TextField } from "@mui/material";
import CustomButton from "../../components/custom-button/customButton.component";
import { Checkbox } from "@mui/material";
import useHosts from "../../hooks/useHosts";
import Lottie from "react-lottie";
import catLottie from "../../assets/lotties/catLottie.json";

const HostVerify = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: catLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [data, setData] = useState({
    phone: "",
    gender: "",
    idProof: "",
    profilePic:
      "data:image/png;base64,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",
    interest: "",
    hostBio: "",
    latitude: "",
    longitute: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
    }
  }, []);
  const showPosition = (val) => {
    console.log("position");
    console.log(val.coords);
    setData({
      ...data,
      latitude: val.coords.latitude,
      longitude: val.coords.longitude,
    });
  };
  const { hostVerify } = useHosts();
  const [animal, setAnimal] = useState(false);
  const [plants, setPlants] = useState(false);
  const [typeData, setTypeData] = useState({
    animal: false,
    plant: false,
  });
  const [hostImages,setHostImages] = useState([]);

  const handleCheck = (e, name) => {
    setTypeData({ ...typeData, [name]: e.target.checked });
  };

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const hostImagesHandler = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: `dx1ye2bro`,
        uploadPreset: `kp2gvmnk`,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log(result.info);
          console.log(result.info.url);
          setHostImages(images => [...images,result.info.url]);
          return result.info.url;
        }
      }
    );
    widget.open();
  };
  const imageHandler1 = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: `dx1ye2bro`,
        uploadPreset: `kp2gvmnk`,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log(result.info);
          console.log(result.info.url);
          setData({ ...data, profilePic: result.info.url });
        }
      }
    );
    widget.open();
  };
  const imageHandler2 = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: `dx1ye2bro`,
        uploadPreset: `kp2gvmnk`,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log(result.info);
          console.log(result.info.url);
          setData({ ...data, idProof: result.info.url });
        }
      }
    );
    widget.open();
  };

  const handleSubmit = () => {
    let a;
    if (typeData.animal && typeData.plant) {
      a = "both";
    } else if (typeData.animal) {
      a = "animal";
    } else if (typeData.plant) {
      a = "plant";
    } else {
      return;
    }
    const mainData = {
      ...data,
      hostImages,
      hostType: a,
    };
    hostVerify(mainData);
    console.log(mainData);
  };

  return (
    <Flex justifyContent="center" alignItems="center">
      <Box width="40%" height="100%">
        <Lottie options={defaultOptions} height="80%" width="100%" />
      </Box>
      <Flex
        p="0.5rem"
        h="auto"
        mt="1rem"
        mb="4rem"
        // boxShadow="2px 2px 10px #D3D3D3"
        w="50%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        borderRadius="10px"
      >
        <Text mb="1rem" fontWeight="400" fontSize="2.5rem">
          Become a Host
        </Text>
        <TextField
          sx={{ marginBottom: "1rem", width: "80%" }}
          id="standard-basic"
          label="Phone"
          variant="outlined"
          name="phone"
          onChange={(e) => onChangeHandler(e)}
        />
        <TextField
          sx={{ width: "80%" }}
          id="standard-basic"
          label="Gender"
          variant="outlined"
          name="gender"
          onChange={(e) => onChangeHandler(e)}
        />
        <Flex>
          <CustomButton
            name="profile"
            onClick={() => imageHandler1()}
            sx={{ margin: "1rem" }}
            simple
          >
            Add your Profile Picture
          </CustomButton>
          <CustomButton
            onClick={() => imageHandler2()}
            sx={{ margin: "1rem" }}
            simple
          >
            Add Your Proof of work
          </CustomButton>
        </Flex>

        <Flex justifyContent="center" alignItems="center" marginBottom="10px">
          <Text>Where does your interest lie?</Text>
          <Flex justifyContent="center" alignItems="center">
            <Checkbox
              // onChange={(e) => checkHandler(e)}
              checked={typeData.animal}
              onChange={(e) => {
                handleCheck(e, "animal");
              }}
              label="animals"
              color="success"
              name="animals"
            />
            <Text>Animals</Text>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Checkbox
              label="plants"
              checked={typeData.plant}
              onChange={(e) => {
                handleCheck(e, "plant");
              }}
              color="success"
              name="plants"
            />
            <Text>Plants</Text>
          </Flex>
        </Flex>

        <TextField
          sx={{ width: "80%", marginBottom: "1rem" }}
          id="standard-basic"
          label="If Animal then which animal and if Plants then which all plants"
          variant="outlined"
          name="interest"
          onChange={(e) => onChangeHandler(e)}
        />
        <TextField
          placeholder="Tell us something about yourself"
          id=""
          name="hostBio"
          sx={{ width: "80%", marginBottom: "1rem" }}
          multiline
          rows={3}
          onChange={(e) => onChangeHandler(e)}
        />
        <Flex alignItems="center" gap="20px">
          <Text>Add nice images of you taking care of a pet:</Text>
          <CustomButton simple onClick={hostImagesHandler}>UPLOAD</CustomButton>
        </Flex>
        <Flex justifyContent="center" alignItems="center" w="50%" mt="2rem">
          <CustomButton
            sx={{
              padding: "0.6rem",
              width: "80%",
              fontSize: "1.2rem",
            }}
            onClick={() => {
              handleSubmit();
            }}
          >
            Lessgoo
          </CustomButton>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default HostVerify;
