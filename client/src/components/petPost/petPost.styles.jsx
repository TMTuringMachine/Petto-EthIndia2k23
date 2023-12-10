import { ButtonBase, styled } from "@mui/material";

export const PetPostContainer = styled(ButtonBase)(({ spanNum, url }) => ({
  margin: "15px 10px",
  padding: 0,
  borderRadius: "10px",
  backgroundImage: `url('${url}')`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  gridRowEnd: `span ${spanNum}`,
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "end",
  padding: "10px",
  transition: 'all 0.2s ease-in-out',
  "&:hover": {
    background: `linear-gradient(360deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 20.87%), url('${url}')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    '& .bookmarkIcon':{
      opacity:1,
    },
    '& .project-info-bar':{
      opacity:1
    }
   
    // background:'red',
  },
  "& .postTitle": {
    color: "white",
    textAlign:'start',
    maxWidth:'70%'

  },
//   '& .bookmarkIcon':{
//     alignSelf:'flex-end',
//     transform:'scale(0.5)',
//     opacity:0
//   },
  '& .project-info-bar':{
    display:'flex',
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    opacity:0,
    alignItems:'end',
  },
  '& .star-container':{
    color:'#fff',
    fontSize:'1.2em',
    '& svg':{
      transform:'scale(1.3)'
    }
  }
}));
