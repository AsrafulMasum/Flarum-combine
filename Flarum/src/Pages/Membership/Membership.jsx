import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./CheckOut";
import LayoutContainer from "../../Layout/LayoutComponent/LayoutContainer";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Membership = () => {
  return (
    <div className="min-h-screen py-40">
      <div className="mb-20 text-center">
        <p className="text-3xl text-textColor capitalize">Pay <span className="text-green-600">$99</span> to become a premium user</p>
      </div>
      <LayoutContainer>
        <Elements stripe={stripePromise}>
          <Checkout></Checkout>
        </Elements>
      </LayoutContainer>
    </div>
  );
};

export default Membership;
