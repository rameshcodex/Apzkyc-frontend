import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { decryptData } from './middleware';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const location = useLocation();
    const [returnurl, setReturnUrl] = useState("");

    const organazaionUrls = [
        "/dashboard",
        "/profileSetting",
        "/clientList",
        "/historyList",
        "/applicant",
        "/suspenceuser",
        "/userinvoice",
        "/compliance"
    ];

    const userUrls = [
        "/individual/kyc",
        "/individual/document",
        "/individual/settings",
        "/individual/overview",
        "/individual/support"
    ];

    const unorthorizedUrls = [
        "/"
    ];

    useEffect(() => {
        handleFunc();
    }, []);

    const handleFunc = async () => {
        const currentpath = location.pathname;
        const token = window.localStorage.getItem('Rikosta');
        const user = window.localStorage.getItem('userType');

        if (token && user) {
            if (organazaionUrls.includes(currentpath)) {
                const usertype = decryptData(user);
                if (usertype && (usertype === 'organization' || usertype === 'sub-admin')) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    setReturnUrl('/individual/kyc');
                    toast.error('You are not authorized to access this page. Redirecting...');
                }
            } else if (userUrls.includes(currentpath)) {
                const usertype = decryptData(user);
                if (usertype && usertype === 'individual') {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    setReturnUrl('/');
                    toast.error('You are not authorized to access this page. Redirecting...');
                }
            } else {
                setIsAuthenticated(false);
                toast.error('You are not authorized to access this page. Redirecting...');
            }
        } else {
            setIsAuthenticated(false);
            setReturnUrl('/');
            toast.error('Please log in to continue.');
        }
    };

    return (
        <>
            {isAuthenticated && isAuthenticated === true ? children : isAuthenticated === false ? <Navigate to={returnurl} /> : ""}
            <ToastContainer />
        </>
    );
};

export default PrivateRoute;
