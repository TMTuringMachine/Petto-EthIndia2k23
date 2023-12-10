import { styled } from "@mui/material";

export const ImageContainer = styled("div")(({ url }) => ({
  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%),url('${url}')`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  height: "100%",
  width: "25%",
  borderRadius: 10,
  display:"flex" ,
  flexDirection: "column",
  marginRight: "30px",
  justifyContent:"end",
  color:'#fff',
  padding:'5px 8px'

}));
