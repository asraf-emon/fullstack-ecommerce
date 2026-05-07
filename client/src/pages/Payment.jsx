import { useState, useEffect } from "react";
import { ArrowLeft, Check, ShieldCheck, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Country, State, City } from "country-state-city";
import PaymentForm from "../components/paymentForm";
import { placeOrder } from "../store/slices/orderSlice";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_FRONTEND_KEY);

const Payment = () => {
  const { authUser } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { orderStep } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    phone: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  useEffect(() => {
    if (!authUser) navigate("/login");
  }, [authUser, navigate]);

  const getNumber = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + getNumber(item.product.price) * item.quantity,
    0,
  );
  const tax = subtotal * 0.18;
  const shippingFee = subtotal > 100 ? 0 : 2;
  const totalAmount = subtotal + tax + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" && { state: "", city: "" }),
      ...(name === "state" && { city: "" }),
    }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();

    const selectedCountry = Country.getCountryByCode(shippingDetails.country);
    const selectedState = State.getStateByCodeAndCountry(
      shippingDetails.state,
      shippingDetails.country,
    );

    const orderData = {
      full_name: shippingDetails.fullName,
      phone: shippingDetails.phone,
      address: shippingDetails.address,
      city: shippingDetails.city,

      state: selectedState?.name || shippingDetails.state,
      country: selectedCountry?.name || shippingDetails.country,
      pincode: shippingDetails.zipCode,
      orderedItems: cart.map((item) => ({
        product: {
          id: item.product.id,
          images: item.product.images,
        },
        quantity: item.quantity,
      })),
    };

    dispatch(placeOrder(orderData));
  };

  if (cart.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-xl">
        Your cart is empty
      </div>
    );

  return (
    <div className="min-h-screen pt-24 bg-background px-4 pb-10">
      <div className="max-w-6xl mx-auto">
        {/* Progress Stepper */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 ${orderStep >= 1 ? "text-primary" : "text-muted"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${orderStep >= 1 ? "bg-primary border-primary text-white" : "border-muted"}`}
              >
                {orderStep > 1 ? <Check size={20} /> : "1"}
              </div>
              <span className="font-semibold hidden md:block">Shipping</span>
            </div>
            <div
              className={`w-16 h-0.5 ${orderStep >= 2 ? "bg-primary" : "bg-muted"}`}
            />
            <div
              className={`flex items-center gap-2 ${orderStep >= 2 ? "text-primary" : "text-muted"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${orderStep >= 2 ? "bg-primary border-primary text-white" : "border-muted"}`}
              >
                2
              </div>
              <span className="font-semibold hidden md:block">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            {orderStep === 1 ? (
              <div className="glass-panel p-8 rounded-3xl border border-border bg-card shadow-sm">
                <h2 className="text-2xl font-bold mb-8">Shipping Address</h2>
                <form onSubmit={handleShippingSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                      name="fullName"
                      required
                      value={shippingDetails.fullName}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-secondary/30 rounded-2xl outline-none border border-transparent focus:border-primary transition-all"
                      placeholder="Full Name"
                    />
                    <input
                      name="phone"
                      required
                      value={shippingDetails.phone}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-secondary/30 rounded-2xl outline-none border border-transparent focus:border-primary transition-all"
                      placeholder="Phone Number"
                    />
                  </div>

                  <select
                    name="country"
                    required
                    value={shippingDetails.country}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 bg-secondary/30 rounded-2xl border border-transparent focus:border-primary outline-none select-premium"
                  >
                    <option value="">Select Country</option>
                    {Country.getAllCountries().map((c, idx) => (
                      <option
                        key={`country-${c.isoCode}-${idx}`}
                        value={c.isoCode}
                      >
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <select
                      name="state"
                      required
                      disabled={!shippingDetails.country}
                      value={shippingDetails.state}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-secondary/30 rounded-2xl border border-transparent focus:border-primary outline-none disabled:opacity-50 select-premium"
                    >
                      <option value="">Select State</option>
                      {State.getStatesOfCountry(shippingDetails.country).map(
                        (s, idx) => (
                          <option
                            key={`state-${s.isoCode}-${idx}`}
                            value={s.isoCode}
                          >
                            {s.name}
                          </option>
                        ),
                      )}
                    </select>
                    <select
                      name="city"
                      required
                      disabled={!shippingDetails.state}
                      value={shippingDetails.city}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-secondary/30 rounded-2xl border border-transparent focus:border-primary outline-none disabled:opacity-50 select-premium"
                    >
                      <option value="">Select City</option>
                      {City.getCitiesOfState(
                        shippingDetails.country,
                        shippingDetails.state,
                      ).map((ci, idx) => (
                        <option key={`city-${ci.name}-${idx}`} value={ci.name}>
                          {ci.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    <div className="md:col-span-3">
                      <input
                        name="address"
                        required
                        value={shippingDetails.address}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 bg-secondary/30 rounded-2xl outline-none border border-transparent focus:border-primary transition-all"
                        placeholder="Street Address"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <input
                        name="zipCode"
                        required
                        value={shippingDetails.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 bg-secondary/30 rounded-2xl outline-none border border-transparent focus:border-primary transition-all"
                        placeholder="ZIP"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-4 gradient-primary text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all active:scale-[0.95]"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            ) : (
              <div className="glass-panel p-8 rounded-3xl border border-border bg-card">
                <Elements stripe={stripePromise}>
                  <PaymentForm amount={totalAmount} />
                </Elements>
              </div>
            )}
          </div>

          {/* Summary Section remains the same */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 rounded-3xl border border-border sticky top-24 shadow-sm bg-card/50 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 max-h-87.5 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item, index) => (
                  <div
                    key={`${item.product.id}-${index}`}
                    className="flex gap-4 p-2 rounded-2xl hover:bg-secondary/20 transition-all"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-border shrink-0">
                      <img
                        src={item.product.images?.[0]?.url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="text-sm font-bold truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-bold text-primary mt-1">
                        ${getNumber(item.product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-6 border-t border-border/50">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold text-green-500">
                    {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl font-black pt-4 border-t border-border mt-2">
                  <span>Total</span>
                  <span className="text-primary">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
