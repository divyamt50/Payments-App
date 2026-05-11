import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignupComp } from "./pages/signup";
import { SigninComp } from "./pages/signin";
import { DashboardComp } from "./pages/dashboard";
import { SendComp } from "./pages/send";
import { useState, useEffect } from "react";
import axios from "axios";


function App() {

  return (
    <>
      <RoutesComp />
    </>
  )
}

const RoutesComp = ()=>{
  const [userInfo, setUserInfo] = useState({});
  const [usersList, setUsersList] = useState([]);
    
    useEffect(()=>{
      const getMyInfo = async()=>{
        const userDetails = await axios.get('http://localhost:3000/api/v1/users/me',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        setUserInfo(userDetails.data);
      }

      const getUsersList = async()=>{
        const totalUsersList = await axios.get("http://localhost:3000/api/v1/users/bulk?filter=",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        setUsersList(totalUsersList.data.users);
      }

      getMyInfo();
      getUsersList();
    },[])

    const handleInput = async (e) => {

      try {

          const filter = e.target.value;

          const response = await axios.get(
              `http://localhost:3000/api/v1/users/bulk?filter=${filter}`,
              {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
              }
          );

          setUsersList(response.data.users);

      } catch(err) {

          console.log(err);

      }
  };
  
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/signup" element = {<SignupComp />}/>
        <Route path = "/signin" element = {<SigninComp />}/>
        <Route path = "/dashboard" element = {<DashboardComp userName={userInfo.userName}
            userList={usersList}
            handleInput={handleInput}
        />}/>
        <Route path = "/send" element = {<SendComp receiverName ="John"/>}/>
      </Routes>
    </BrowserRouter>
  )
};

export default App