import { Button, styled } from "@mui/material";
import React from "react";

const CustomButtonContainer = styled(Button)(({simple}) => ({
  padding: "5px 20px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  borderRadius: simple?'5px':"30px",
  "&:hover": {
    backgroundColor: "#4CAF50",
  },
}));
export const SecondaryButton = styled(Button)(({simple}) => ({
  padding: "5px 20px",
  backgroundColor: "white",
  color: "#4CAF50",
  borderRadius: simple?'5px':"30px",
  border: "1px solid #4CAF50",
  "&:hover": {
    backgroundColor: "#4CAF50",
    color: "white"
  },
}));
const CustomButton = ({ children,simple, ...props }) => {
  return <CustomButtonContainer simple={simple} {...props}>{children}</CustomButtonContainer>;
};

export default CustomButton;
