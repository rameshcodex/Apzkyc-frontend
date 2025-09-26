import React, { useState } from 'react'
import Axios from './Axios'
import axios from 'axios'
import toast from 'react-hot-toast'


export default function FastpayIntegration() {

    var [datas, setDatas] = useState({
        amount: "100.00",
        item_name: "Test Product",
        payment_method: "cc",
    })

    const [resps, setResps] = useState()
    const handleChange = async () => {
        try {
            const { data } = await Axios.post('/createPayment', datas, {
                headers: {
                    Authorization: window.localStorage.getItem('Rikosta')
                }
            })
            // const { data } = await axios.post('https://sandbox.payfast.co.za/eng/process', datas)
            console.log(data, "data")
            if (data?.success) {
                setResps(data?.signatur)
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
            console.log("🚀 ~ handleChange ~ error:", error)
        }
    }

    return (
        <>
            {/* <form action="https://sandbox.payfast.co.za/eng/process" method="post">
                <input type="hidden" name="merchant_id" value="10035016" />
                <input type="hidden" name="merchant_key" value="zifxjvh2pxtjm" />
                <input type="hidden" name="amount" value="100.00" />
                <input type="hidden" name="item_name" value="Test Product" />
                <input type="hidden" name="return_url" value="http://localhost:3000" />
                <input type="hidden" name="cancel_url" value="http://localhost:3000" />
                <input type="hidden" name="notify_url" value="http://localhost:3000"></input>
                <input type="hidden" name="payment_method" value="cc" /> */}
            <input type="submit" onClick={() => { handleChange() }} />
            {/* </form> */}
            <div dangerouslySetInnerHTML={{ __html: resps }} style={{ color: "white" }}>
            </div>
        </>
    )

}