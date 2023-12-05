import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [err, setErr] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axiosSecure.post("/create-payment-intent", { price: 99 }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [user, axiosSecure]);

  const handlePayments = async (e) => {
    e.preventDefault();

    console.log(stripe, clientSecret);
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErr(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setErr("");
    }

    const { error: err, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );

    if (err) {
      console.log(err);
    } else {
      if (paymentIntent?.status === "succeeded") {
        setTransactionId(paymentIntent?.id);
        const updatedUser = {
          badge: "gold",
        };
        const res = await axiosSecure.put(`/users/${user?.email}`, updatedUser);
        console.log(res.data);
        if (res?.data?.modifiedCount) {
          navigate("/");
        }
      } else {
        setTransactionId("");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handlePayments}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm btn-success px-4 my-4 text-white"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {err && <p className="text-red-600">{err}</p>}
      {transactionId && (
        <p>
          Your Transaction ID:{" "}
          <span className="text-green-600 font-bold">{transactionId}</span>
        </p>
      )}
    </div>
  );
};

export default Checkout;
