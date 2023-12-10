import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import ClientRequestCard from "../../components/Request/ClientRequestCard.component";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/system";
import { Text, Flex } from "@chakra-ui/react";


const UserRequests = () => {
  // const user = useSelector((store) => store.auth.user);
  const {user} = useAuth();
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    setRequests(user.userRequest);
    console.log(user);
  }, [user]);
  const [value, setValue] = React.useState(0);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <>{children}</>
          </Box>
        )}
      </div>
    );
  }

  useEffect(()=>{
    console.log(requests);
  },[requests])



  return (
    <Box height="auto">
      <Box sx={{ width: "100%" }}>
        <Text p="2rem" textAlign="center" fontSize="2rem" fontWeight="800">
          Your Requests
        </Text>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="Pending Requests" />
            <Tab label="Accepted Requests" />
            <Tab label="Past Requests" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {requests.map(
            (req) =>
              !req.isApproved &&
              req.isPending && (
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  
                  <ClientRequestCard req={req} />
                </Flex>
              )
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {requests.map(
            (req) =>
              req.isApproved &&
              req.isPending && (
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <ClientRequestCard req={req} />
                </Flex>
              )
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {requests.map(
            (req) =>
              req.isApproved &&
              !req.isPending && (
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <ClientRequestCard req={req} />
                </Flex>
              )
          )}
        </TabPanel>
      </Box>
    </Box>
  );
};
export default UserRequests;
