import {styled} from '@mui/material';

export const PostsContainer = styled("div")(() => ({
    width: "100%",
    flex: 1,
    maxHeight:"90vh",
    // backgroundColor:'red',
    margin: "20px",
  //   margin: 0,
    padding: 0,
  //   width: "80vw",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 250px)",
    gridAutoRows: "10px",
  //   position: "absolute",
  //   left: "50%",
  //   transform: "translateX(-50%)",post
    justifyContent: "center",
  //   backgroundColor: "black",
  overflowY:'scroll',
  }));
  