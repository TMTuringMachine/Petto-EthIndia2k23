import { Box, Image, Text } from "@chakra-ui/react";
import { Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import CustomButton from "../../components/custom-button/customButton.component";
import axios from '../../utils/axios';

const CreatePostModal = ({ state, toggleModal }) => {
  const [data, setData] = useState({
    caption: "",
    image: "",
  });
  const showWidget = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: `dx1ye2bro`,
        uploadPreset: `kp2gvmnk`,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log(result.info);
          console.log(result.info.url);
          setData({ ...data, image: result.info.url });
          return result.info.url;
        }
      }
    );
    widget.open();
  };

  const handleChange = (e) => {
    setData({ ...data, caption: e.target.value });
  };

  const handlePost = async () => {
    console.log(data);
    const res = await axios.post('/createPost',data);
    window.location.reload();
    toggleModal();
  };

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
        <Text fontWeight={600} fontSize="1.5em">
          POST A PICTURE
        </Text>
        <TextField
          onChange={handleChange}
          value={data.caption}
          variant="outlined"
          label="small caption"
          fullWidth
        />
        <Box width="100%" display="flex" flexDirection="column" gap="20px">
          {data.image !== "" ? (
            <Image
              src={data?.image}
              width="100%"
              height="30%"
              borderRadius="10px"
              objectFit="cover"
              maxHeight="300px"
            />
          ) : null}
          <CustomButton simple onClick={showWidget}>
            UPLOAD PICTURE
          </CustomButton>
        </Box>
        <CustomButton onClick={handlePost}>POST</CustomButton>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
