import React from "react";

export default function RazorpayCheckout({ amount=1 }) {

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
  
      const result = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await result.json();

      const options = {
        key: "rzp_live_RHWbkMMBTyv7oi", 
        amount: data.amount, 
        currency: data.currency,
        name: "Your Company",
        description: "Test Transaction",
        order_id: data.id,
        handler: async function (response) {
          const verifyRes = await fetch("http://localhost:5000/api/payment/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          alert(verifyData.message);
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error);
      alert("Payment failed");
    }
  };

  return (
    <button style={{marginTop:'2rem'}} onClick={handlePayment}>
      Pay ₹{amount}
    </button>
  );
}
