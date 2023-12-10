import "./payment.css";
import CustomButton from "../../components/custom-button/customButton.component";
import useRazorpay from "react-razorpay";
import API from "../../utils/axios";
import PaymentModal from "./PaymentModal.component";
import { useState } from "react";

const Payment = ({ price, state, toggleState, req }) => {
  const Razorpay = useRazorpay();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const togglePaymentModal = () => {
    setShowPaymentModal(!showPaymentModal);
  };
  const createOrder = async (price) => {
    const res = await API.post("/request/makeBooking/createOrder", { price });
    return res;
  };

  const handlePayment = async () => {
    let order = await createOrder(price * 100);
    toggleState(false);

    console.log(order);
    order = order.data.razorRes;

    console.log(order);
    var options = {
      key: "rzp_test_7o3KFikLV8ENjP", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Petscape",
      description: "Test Transaction",
      // "image": "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      // callback_url: "http://localhost:3000/user/razor/callback",
      handler: async (res) => {
        console.log("running");
        // alert(res.razorpay_payment_id);
        // alert(res.razorpay_order_id);
        // alert(res.razorpay_signature) ;
        const payload = {
          payment_id: res.razorpay_payment_id,
          order_id: res.razorpay_order_id,
          razor_signature: res.razorpay_signature,
          client_user_id: "623f2243e3a7ed119cc44b07",
          request_id: "623f22bde3a7ed119cc44b10",
          amount: order.amount,
        };
        const response = await API.post("/request/razor/callback", payload);
        console.log("response from /user/razor/callback");
        console.log(response);
      },
      //   prefill: {
      //     name: user.name,
      //     email: user.email,
      //     contact: user.phone,
      //   },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#4CAF50",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", (response) => {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
    });
    rzp1.open();
  };
  return (
    <>
      <PaymentModal
        req={req}
        state={showPaymentModal}
        toggleModal={togglePaymentModal}
      />
      {state ? (
        <CustomButton simple onClick={togglePaymentModal}>
          PAY NOW
        </CustomButton>
      ) : (
        <CustomButton>JOB DONE!</CustomButton>
      )}
    </>
  );
};

export default Payment;
