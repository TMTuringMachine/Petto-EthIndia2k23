import React from "react";

import { ButtonBase, styled, Box } from "@mui/material";
import { Icon } from "@iconify/react";
const ImageButtonContainer = styled(ButtonBase)(({ url, selected }) => ({
  backgroundColor: "#fff",
  width: "100%",
  height: "100%",
  borderRadius: "7.7px",
  boxShadow: "0px 7.71233px 19.2808px rgba(35, 35, 35, 0.1)",
  // backgroundImage:`url('${url}')`,
  backgroundImage: selected
    ? `linear-gradient(180deg, #0000006a 0%, rgba(0,0,0,0.499895026369923) 100%),url('${url}')`
    : `linear-gradient(180deg, #00000022 0%, rgba(0,0,0,0.499895026369923) 100%),url('${url}')`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  color: "#fff",
  fontSize: "2em",
  transition:"transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95)",
  "& svg": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  '&:hover':{
    transform:'scale(1.2)'
  }
}));

const ImageButton = ({ url, children, selected, ...props }) => {
  return (
    <Box
      sx={{
        width: "30%",
        height: "250px",
        overflow:'hidden',
        borderRadius:'7.7px',
      }}
    >
      <ImageButtonContainer {...props} url={url} selected={selected}>
        {children}
        {selected ? (
          <Icon
            icon="akar-icons:circle-check-fill"
            width="100px"
            height="100px"
          />
        ) : null}
      </ImageButtonContainer>
    </Box>
  );
};

export default ImageButton;
