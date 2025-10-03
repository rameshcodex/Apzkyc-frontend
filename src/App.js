
import './App.css';
import './Media.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './Business/Components/Landing/Landing';
import SignUp from './Business/Components/Authentication/SignUp';
import Login from './Business/Components/Authentication/Login';
import ClientLists from './Business/Components/ClientLists/ClientLists';
import HistoryLists from './Business/Components/ClientLists/HistoryLists';
import ProfileSetting from './Business/Components/ProfileSetting/ProfileSetting';
import CreatePassword from './Business/Components/Authentication/CreatePassword';
import Sidebar from './Business/Components/SideBar/Sidebar';
import Dashboard from './Business/Components/Dashboard/Dashboard';
import Pricing from './Business/Components/Pricing/Pricing';
import Applicant from './Business/Components/Applicant/Applicant'
import Applicant3 from './Business/Components/Applicant/Applicant3';
import ReApplicants from './Business/Components/ReApplicants/ReApplicants';
import Settings from './Business/Components/Settings/Settings';
import NewApplicant from './Business/Components/Applicant/NewApplicant';
import Statistics from './Business/Components/Statistics/Statistics';
import Activate from './Business/Components/Authentication/Activate';
import SignIn from './Individual/Components/Authentication/Login';
import Register from './Individual/Components/Authentication/Register';
import Verify from './Individual/Components/Authentication/Verify';
import CreatePswd from './Individual/Components/Authentication/CreatePswd';
import Header from './Individual/Components/Header/Header';
import Document from './Individual/Components/Documents/Document';
import Kyc from './Individual/Components/Kyc/Kyc';
import Comingsoon from './Comingsoon';
import Comingsoon2 from './Comingsoon2';
import VerifyEmail from '././Individual/Components/Authentication/VerifyEmail'
import EditProfileSetting from './Business/Components/ProfileSetting/EditProfileSetting';
import Overview from './Individual/Components/Overview/Overview';
import Support from './Individual/Components/Support/Support';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './PrivateRoute';
import Liveness from "./Liveness"
import FastpayIntegration from './FastpayIntegration'
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import Resend from './Business/Components/Authentication/Resend';
import ForgotEmail from './Business/Components/Authentication/ForgotEmail';
import KYCSuccess from './KYCSuccess';
import Profile from './Individual/Components/Profile/Profile';
import Changepassword from './Individual/Components/Profile/Changepassword';
import Error from './Error'
import ApiDoc from './Business/Components/ApiDoc/ApiDoc';
import TwoFactor from './Business/Components/Authentication/TwoFactor';

import SupportBusiness from './Business/Support/Support'
import Kyb from './Business/Components/KYB/Kyb';
import Overview2 from './Business/Components/Overview/Overview'
import Integration from './Business/Components/Integration/Integration';
import SubAdmin from './Business/Components/SubAdmin/SubAdmin';
import SupportNew from './Individual/Components/Support/SupportNew';
import Kycnew from './Individual/Components/Kyc/Kycnew';
import Kybstatus from './Business/Components/KYB/Kybstatus';
import PlanSubLogin from './Business/Components/Authentication/PlanSubLogin';
import PlanSubChat from './Business/Components/Authentication/PlanSubChat';
import SuspenceUser from './Business/Components/SuspenceUser/SuspenceUser';
import UserInvoiceTable from './Business/Components/UserInvoiceTable/UserInvoiceTable';
import Crop from './Individual/Components/Kyc/crops';
import Compliance from './Business/Components/Compliance/Compliance';
import { useEffect, useRef } from 'react';
import consts from './constant';

Amplify.configure(awsExports);

function App() {
  const navigate = useNavigate();
  const timerRef = useRef(null); // ✅ persist timer reference

  const resetLogoutTimer = () => {
    if (localStorage.getItem("Rikosta")) {
      // clear old timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // set new timer (10 min)
      timerRef.current = setTimeout(() => {
        window.localStorage.clear();
        navigate(`/login`);
      }, 60000 * 10);
    }
  };

  useEffect(() => {
    document.title = consts.pageTitle;
    document.documentElement.style.setProperty("--theme-color", consts.projectTheme);
    console.log(consts.projectTheme, 'theme');
    // initialize
    resetLogoutTimer();

    // reset on user activity
    window.addEventListener("keydown", resetLogoutTimer);
    window.addEventListener("mousemove", resetLogoutTimer);
    window.addEventListener("click", resetLogoutTimer);

    return () => {
      window.removeEventListener("keydown", resetLogoutTimer);
      window.removeEventListener("mousemove", resetLogoutTimer);
      window.removeEventListener("click", resetLogoutTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="App">
      <Toaster />

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgotPassword' element={<CreatePassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/plansublogin' element={<PlanSubLogin />} />
        <Route path='/plansubchat' element={<PlanSubChat />} />
        <Route path='/resend' element={<Resend />} />
        <Route path='/forgotemail' element={<ForgotEmail />} />
        <Route path='/activate' element={<Activate />} />
        <Route path='/twofactor' element={<TwoFactor />} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/sidebar' element={<Sidebar />} />
        <Route path='/clientList' element={<PrivateRoute><ClientLists /></PrivateRoute>} />
        <Route path='/compliance' element={<PrivateRoute><Compliance /></PrivateRoute>} />
        <Route path='/historyList' element={<PrivateRoute><HistoryLists /></PrivateRoute>} />
        <Route path='/suspenceuser' element={<PrivateRoute>< SuspenceUser /></PrivateRoute>} />
        <Route path='/userinvoice' element={<PrivateRoute>< UserInvoiceTable /></PrivateRoute>} />
        <Route path='/profileSetting' element={<PrivateRoute><ProfileSetting /></PrivateRoute>} />
        <Route path='/applicant' element={<PrivateRoute><Applicant /></PrivateRoute>} />
        <Route path='/applicant3' element={<Applicant3 />} />
        <Route path='/reApplicants' element={<ReApplicants />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/newapplicant' element={<NewApplicant />} />
        <Route path='/statistics' element={<Statistics />} />
        <Route path='/editProfile' element={<EditProfileSetting />} />
        <Route path='/createkyc' element={<ApiDoc />} />
        <Route path='/checkkyc' element={<ApiDoc />} />
        <Route path='/getkyc' element={<ApiDoc />} />
        <Route path='/addressVerification' element={<ApiDoc />} />
        <Route path='/kyb' element={<Kyb />} />
        <Route path='/kybstatus' element={<Kybstatus />} />
        <Route path='/overviewBusniess' element={<Overview2 />} />
        <Route path='/cropimg' element={<Crop />} />
        {/* <Route path='/integration' element={<Integration />} /> */}


        {/* // coming */}
        <Route path='/comingsoon' element={<Comingsoon />} />
        {/* <Route path='/intgration' element={<Comingsoon />} /> */}
        <Route path='/error' element={<Error />} />
        {/* // Individual */}
        <Route path='/individual/signin' element={<SignIn />} />
        <Route path='/individual/register' element={<Register />} />
        <Route path='/verifyemail' element={<VerifyEmail />} />
        <Route path='/individual/verify' element={<Verify />} />
        <Route path='/createpswd/:token' element={<CreatePswd />} />
        <Route path='/individual/header' element={<Header />} />
        <Route path='/individual/document' element={<PrivateRoute> <Document /></PrivateRoute>} />
        <Route path='/individual/kyc' element={<PrivateRoute> <Kycnew /> </PrivateRoute>} />
        <Route path='/individual/settings' element={<Comingsoon2 />} />
        <Route path='/individual/overview' element={<PrivateRoute><Overview /> </PrivateRoute>} />
        <Route path='/individual/support' element={<PrivateRoute><SupportNew /></PrivateRoute>} />
        <Route path='/individual/profile' element={<PrivateRoute><Profile /> </PrivateRoute>} />
        <Route path='/individual/changepaswd' element={<PrivateRoute><Changepassword /></PrivateRoute>} />
        {/*Liveness */}
        <Route path='/liveness/:id' element={<Liveness />} />
        <Route path='/fastpay' element={<PrivateRoute><FastpayIntegration /></PrivateRoute>} />
        {/*KYC Status */}
        <Route path='/check' element={<KYCSuccess />} />
        <Route path='/supportbusiness' element={<SupportBusiness />} />
        <Route path='/subadmin' element={<SubAdmin />} />

      </Routes>

    </div >
  );
}

export default App;
