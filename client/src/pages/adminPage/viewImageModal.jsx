import React from "react";
import { Image, Box } from "@chakra-ui/react";

import { Modal } from "@mui/material";

const ImageModal = ({ state, toggleModal, url }) => {
  return (
    <Modal open={state} onClose={toggleModal}>
      <Box width="50vw" height="60vh" position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)">
        <Image src={url} width="100%" height="100%" />
      </Box>
    </Modal>
  );
};

export default ImageModal;
