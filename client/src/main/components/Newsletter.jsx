import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Mock submission - in a real app, this would call an API
    setIsSubmitted(true);
    setError("");
  };

  return (
    <div className="bg-white  py-8 mb-10 md:py-10 rounded-md px-20">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Subscribe to our newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Stay updated with the latest products,
            <br /> exclusive offers, and style inspiration.
          </p>

          {isSubmitted ? (
            <div className="bg-green-100 text-green-800 p-4 rounded-md">
              Thank you for subscribing! We've sent a confirmation email.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 px-6 py-2 text-white font-medium rounded-md transition-colors duration-200"
                >
                  Subscribe
                </button>
              </div>
              {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
              <p className="mt-3 text-gray-500 text-sm">
                By subscribing, you agree to our terms and privacy policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
