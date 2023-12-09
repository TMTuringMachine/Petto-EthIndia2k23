import React, { useEffect, useState } from "react";
import { Flex, Text, Box, Image } from "@chakra-ui/react";
import ImageButton from "../../components/image-button/imageButton.component";
import { HomeImage } from "./homepage.styles";
import { Avatar } from "@mui/material";
import HostOverview from "../../components/host-overview/hostOverview.component";
import HostPreview from "../../components/host-preview/hostPreview.component";
import { useNavigate } from "react-router-dom";
import useHosts from "../../hooks/useHosts";
import { Fade } from "react-reveal";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

// const hosts = [
//   {
//     name: "Emma Watson",
//     profilePic:
//       "https://images.unsplash.com/photo-1486583474878-b16d8f2749b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//   },
//   {
//     name: "Jessica",
//     profilePic:
//       "https://images.unsplash.com/photo-1596076463549-b4d123456b6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//   },
//   {
//     name: "Emma Watson",
//     profilePic:
//       "https://images.unsplash.com/photo-1486583474878-b16d8f2749b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//   },
//   {
//     name: "Jessica",
//     profilePic:
//       "https://images.unsplash.com/photo-1596076463549-b4d123456b6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//   },
//   {
//     name: "Emma Watson",
//     profilePic:
//       "https://images.unsplash.com/photo-1486583474878-b16d8f2749b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//   },
// ];

const Homepage = () => {
  const navigate = useNavigate();
  const [hosts, setHosts] = useState([]);
  const [nearByHosts, setNearByHosts] = useState([]);
  const [coords, setCoords] = useState({
    lat: null,
    long: null,
  });
  const { getAllHosts, getNearbyHosts } = useHosts();

  useEffect(() => {
    if (coords.lat !== null && coords.long !== null) {
      getNearbyHosts(coords.lat, coords.long).then((res) => {
        setNearByHosts(res);
      });
    } else {
      getAllHosts().then((res) => {
        const newHosts = res.map((r) => ({ ans: 0, host: { ...r } }));
        setNearByHosts(newHosts);
        // console.log(res,"he he he");
      });
    }
  }, [coords]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log("okay");
    } else {
      alert("please enable location!");
    }
  }, []);

  // useEffect(()=>{
  //     const newHosts = nearByHosts?.sort((a,b)=>a.ans-b.ans)
  //     setNearByHosts(newHosts);
  // },[nearByHosts]);
  console.log(nearByHosts);
  const showPosition = (val) => {
    console.log("position");
    console.log(val.coords);
    setCoords({
      lat: val.coords.latitude,
      long: val.coords.longitude,
    });
  };

  return (
    <Flex direction="column" alignItems="center">
      <Carousel autoPlay interval={3000} infiniteLoop>
        <div>
          <Image
            width="100vw"
            height="450px"
            objectFit="cover"
            src="https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
          />
          {/* <p className="legend">Legend 1</p> */}
        </div>
        <div>
          <Image
            width="100vw"
            height="450px"
            objectFit="cover"
            src="https://images.unsplash.com/photo-1525253013412-55c1a69a5738?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          />
          {/* <p className="legend">Legend 2</p> */}
        </div>
        <div>
          <Image
            width="100vw"
            height="450px"
            objectFit="cover"
            src="https://images.unsplash.com/photo-1568043210943-0e8aac4b9734?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          />
          {/* <p className="legend">Legend 3</p> */}
        </div>
      </Carousel>
      {/* <HomeImage url="https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" /> */}

      <Box padding="20px" width="90%">
        <Text fontSize="2em" margin="10px 0 20px 0">
          Select your interest
        </Text>
        <Flex direction="row" width="100%" justifyContent="space-between">
          <ImageButton
            url="https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
            onClick={() => {
              navigate("/hosts/pets");
            }}
          >
            Pets
          </ImageButton>
          <ImageButton
            url="https://images.unsplash.com/photo-1601985705806-5b9a71f6004f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            onClick={() => {
              navigate("/hosts/plants");
            }}
          >
            Plants
          </ImageButton>
          <ImageButton
            url="https://images.unsplash.com/photo-1601758123927-4f7acc7da589?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            onClick={() => {
              navigate("/hosts/all");
            }}
          >
            Both
          </ImageButton>
        </Flex>
      </Box>
      <Box padding="20px" width="90%">
        <Fade bottom>
          <Flex
            flexDirection="row"
            alignItems="center"
            width="100%"
            justifyContent="space-between"
          >
            <Text fontSize="2em" margin="10px 0 20px 0">
              Our top care takers
            </Text>
            <Text>VIEW ALL</Text>
          </Flex>
          <Flex justifyContent="space-between">
            {nearByHosts.slice(0, 5).map((host) => (
              <HostOverview host={host?.host} />
            ))}
          </Flex>
        </Fade>
      </Box>
      <Box padding="20px" width="90%">
        <Text fontSize="2em" margin="10px 0 20px 0">
          Caretakers around you
        </Text>
        <Flex direction="column">
          {nearByHosts
            .sort((a, b) => a.ans - b.ans)
            .map((host) => (
              <HostPreview hostData={host} />
            ))}
        </Flex>
      </Box>
      <Box height="50px"></Box>
    </Flex>
  );
};

export default Homepage;
