import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Axios from "./Axios"
import toast from "react-hot-toast"


const KYCSuccess = () => {

    const [id, setId] = useState(null)

    useEffect(() => {
        // Get the current URL's search parameters
        const urlParams = new URLSearchParams(window.location.search);
        // Extract the 'id' parameter
        const idParam = urlParams.get('id');
        setId(idParam);
    }, []);
    // const { id } = useParams()
    const navigate = useNavigate()
    console.log("🚀 ~ KYCSuccess ~ id:", id)

    const checkStatus = async () => {
        try {
            const { data } = await Axios.post('/singleKycVerify', {
                id: id
            }, {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            if (data?.success == true) {
                window.localStorage.setItem("status", "KYC Verified Successfully")
                navigate('/individual/kyc')
            } else {
                window.localStorage.setItem("status", data?.message)
                navigate('/individual/kyc')
            }
        } catch (error) {
            if (error?.status == 499) {
                toast.error(error?.response?.data?.message)
                window.localStorage.removeItem('Rikosta');
                window.localStorage.removeItem('userType');
                setTimeout(() => {
                    window.location.replace('/login')
                }, 1000);
            }
            console.log("🚀 ~ checkStatus ~ error:", error)
        }
    }

    useEffect(() => {
        if (id) {
            checkStatus()
        }
    }, [id])

}
export default KYCSuccess