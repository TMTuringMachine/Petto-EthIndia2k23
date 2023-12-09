import {styled} from '@mui/material';

export const Page = styled('div')(()=>({
    width:'100vw',
    height:'100vh',
    maxHeight:'100vh',
    maxWidth:'100vw',
    overflow:'hidden',

}))

export const Content = styled("div")(({fullScreen})=>({
    // height:'calc(100vh-100px)',
    height:'96vh',
    // width:fullScreen?'96vw':'77vw',
    // margin:fullScreen?'2vh 5vw':'2vh 0 2vh 23vw',
    transition:'all 0.2s ease-in',
    // padding:'0px 0px 10px 0px',
    width:'100vw',
    maxHeight:"96vh",
    overflowY:'scroll',
    // backgroundColor:'green',
    // backgroundColor:fullScreen?"green":"red",
    // border:'1px solid orange',
    '&::-webkit-scrollbar':{
        display:'none'
    }

}))