import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignupComp } from "./pages/signup";
import { SigninComp } from "./pages/signin";
import { DashboardComp } from "./pages/dashboard";
import { SendComp } from "./pages/send";


function App() {

  return (
    <>
      <RoutesComp />
    </>
  )
}

const RoutesComp = ()=>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/signup" element = {<SignupComp />}/>
        <Route path = "/signin" element = {<SigninComp />}/>
        <Route path = "/dashboard" element = {<DashboardComp />}/>
        <Route path = "/send" element = {<SendComp />}/>
      </Routes>
    </BrowserRouter>
  )
};

export default App