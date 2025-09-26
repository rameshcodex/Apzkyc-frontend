
import React, { useRef, useState, useCallback, useEffect } from 'react';
// import Webcam from "react-webcam"
import { get } from '@aws-amplify/api'
import { Loader, ThemeProvider, Heading } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness'
import { View, Flex, Alert, Image } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import Axios from './Axios';
import { useLocation, useParams } from 'react-router-dom';
Amplify.configure(awsExports);

export default function Settings() {
    const [loading, setLoading] = useState(true);
    const [sessionId, setSessionId] = useState(null);
    const [faceLivenessAnalysis, setFacelivenessAnalysis] = useState(null)
    const [success, setSuccess] = useState(null)
    const [successes, setSuccesses] = useState(false)


    const { id } = useParams()
    const token = window.localStorage.getItem("Rikosta")
    const urlCheck = async () => {
        try {
            if (id) {
                const { data } = await Axios.post('/verifyuser', { id: id },)
                if (data?.success == true) {
                    setSuccesses(true)
                } else {
                    setSuccesses(false)
                }
            }
        } catch (error) {
            console.log("🚀 ~ urlCheck ~ error:", error)
        }
    }

    useEffect(() => {
        urlCheck()
    }, [])

    useEffect(() => {
        const fetchCreateLiveness = async () => {
            const datum = await get({ apiName: "kycapzapi", path: '/session/create' });
            const data = await datum.response
            const reader = data.body.getReader();
            const decoder = new TextDecoder();
            let result = '';
            let done = false;
            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                result += decoder.decode(value, { stream: !done });
            }
            
            setSessionId(result);
            setLoading(false);
        }
        if (successes) {
            fetchCreateLiveness();
        }
    }, [successes]);

    console.log(JSON.parse(sessionId)?.sessionId, "sessionidf");

    function byteArrayToBase64(byteArray) {
        // Convert byte array to string
        const binaryString = byteArray.map(byte => String.fromCharCode(byte)).join('');

        // Encode the string to Base64
        return btoa(binaryString);
    }


    const handleAnalysisComplete = async () => {
        const data = await get({
            apiName: "kycapzapi", path: "/session/get",
            options: {
                queryParams: {
                    sessionId: JSON.parse(sessionId)?.sessionId,
                }
            }
        });
        const datum = await data.response
        const reader = datum.body.getReader();
        const decoder = new TextDecoder();
        let result = '';
        let done = false;
        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            result += decoder.decode(value, { stream: !done });
        }
        setFacelivenessAnalysis(JSON.parse(result)?.response)
        console.log(JSON.parse(result), "result");
        console.log(`data:image/png;base64,${byteArrayToBase64(Object.values(JSON.parse(result)?.response?.ReferenceImage?.Bytes))}`, "result");

        if (JSON.parse(result)?.isLive) {
            setSuccess("User is live");
            setLoading(false);
            // console.log("live");
            checkFaceString(true, JSON.parse(result)?.response)
        } else {
            setSuccess("User is not live");
            setLoading(false);
            console.log("not live");
            checkFaceString(false, JSON.parse(result)?.response)
        }
    };

    const checkFaceString = async (dts, val) => {
        try {
            console.log("check face liveness")
            const { data } = await Axios.post('/verifyliveness', {
                id: id,
                Image: byteArrayToBase64(Object.values(val?.ReferenceImage?.Bytes)),
                isLive: dts
            } , 
            { headers : {Authorization : token}}
        )
            if (data?.success) {
                window.location.replace(`${data?.result}?id=${id}`)
            }
        } catch (error) {
            if (error?.response?.data) {
                window.location.replace(`${error?.response?.data?.result}?id=${id}`)
            }
        }
    }

    return (
        <ThemeProvider>
            <Flex
                direction="row"
                justifyContent="center"
                alignItems="center"
                alignContent="flex-start"
                wrap="nowrap"
                gap="1rem"
            >
                <View
                    ad="div"
                    maxHeight="600px"
                    height="600px"
                    width="740px"
                    maxWidth="740px"
                >
                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            {faceLivenessAnalysis && faceLivenessAnalysis.Confidence ? (
                                <>
                                    <Alert
                                        variation='info'
                                        isDismissible={false}
                                        hasIcon={true}
                                    >
                                        Confidence Score:{faceLivenessAnalysis.Confidence.toFixed(2)}%
                                    </Alert>
                                    <Image
                                        src={"data:image/jpeg;base64," + byteArrayToBase64(Object.values(faceLivenessAnalysis?.ReferenceImage?.Bytes))}
                                        width="100%"
                                        height="100%"
                                        objectFit="cover"
                                        objectPosition="50% 50%"
                                    />
                                </>
                            ) :
                                (
                                    <>
                                        <FaceLivenessDetector
                                            sessionId={JSON.parse(sessionId)?.sessionId}
                                            region='eu-west-1'
                                            onAnalysisComplete={handleAnalysisComplete}
                                        />
                                        <Heading level={2}>{success}</Heading>
                                    </>)}
                        </>
                    )}
                </View>
            </Flex>
        </ThemeProvider>
    )
}