import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import OutletLayout from "./components/OutletLayout";
import UserLogin from "./pages/Login/UserLogin";
import OrgLogin from "./pages/Login/OrgLogin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserSignup from "./pages/SignUp/UserSignup";
import OrgSignup from "./pages/SignUp/OrgSignup";
import Feed from "./pages/Feed";
import FeedDetail from "./pages/FeedDetail";
import Connect from "./pages/Connect";
import Friends from "./pages/Friends";
import FriendChat from "./components/FriendChat";
import Nearby from "./pages/Nearby";
import Donate from "./pages/Donate";
import { useRecoilValue } from "recoil";
import { userdetail } from "./states/userDetail";
import DonationDetails from "./pages/DonationDetails";
import UserProfile from "./pages/UserProfile";
import OrgPost from "./pages/OrgPost";
import CreatePost from "./components/CreatePost";
import { ToastContainer } from "react-toastify";
import OrgProfile from "./pages/OrgProfile";
import Resources from "./pages/Resources";
import OrgMarkerProfile from "./pages/OrgMarkerProfile";
import Help from "./pages/Help";
function App() {
  const details = useRecoilValue(userdetail);

  return (
    <div className="App h-screen scrollbar-hide relative ">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<OutletLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feeddetail" element={<FeedDetail />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/friend" element={<Friends />} />
          <Route path="/nearby" element={<Nearby />} />
          <Route path="/help" element={<Help />} />
          <Route path="/friend/:connid" element={<FriendChat />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/donationdetail" element={<DonationDetails />} />
          <Route path="/orgpost" element={<OrgPost />} />
          <Route path="/orgprofile" element={<OrgProfile />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/orgmkrprofile" element={<OrgMarkerProfile />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/orglogin" element={<OrgLogin />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route path="/orgsignup" element={<OrgSignup />} />
      </Routes>
    </div>
  );
}

export default App;
