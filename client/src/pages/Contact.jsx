import { useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        templateParams,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);

      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-orange-50">

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        <div className="text-center">

          <div className="text-5xl mb-5">
            📩
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-orange-600">
            Contact Us
          </h1>

          <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-7">
            We'd love to hear from you! Share your feedback,
            recipe suggestions, questions, or anything else
            you'd like to tell us.
          </p>

        </div>


        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg mt-10 p-6 sm:p-8 lg:p-10">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Name */}
            <div>

              <label
                htmlFor="name"
                className="block font-semibold text-gray-700 mb-2"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

            </div>


            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="block font-semibold text-gray-700 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

            </div>


            {/* Message */}
            <div>

              <label
                htmlFor="message"
                className="block font-semibold text-gray-700 mb-2"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

            </div>


            {/* Success Message */}
            {status === "success" && (
              <div className="bg-green-100 border border-green-200 text-green-700 rounded-lg px-4 py-3">
                <p className="font-semibold">
                  ✅ Message sent successfully!
                </p>

                <p className="text-sm mt-1">
                  Thank you for your feedback. A confirmation email
                  has been sent to your email address.
                </p>
              </div>
            )}


            {/* Error Message */}
            {status === "error" && (
              <div className="bg-red-100 border border-red-200 text-red-700 rounded-lg px-4 py-3">
                <p className="font-semibold">
                  ❌ Something went wrong.
                </p>

                <p className="text-sm mt-1">
                  Please try again in a moment.
                </p>
              </div>
            )}


            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>


        {/* Additional Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">

          {/* Recipe Suggestions */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">

            <div className="text-4xl">
              💡
            </div>

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Recipe Suggestions
            </h2>

            <p className="text-gray-600 mt-2 leading-6">
              Have a recipe you'd love to see on Cook Book?
              Send us your suggestion!
            </p>

          </div>


          {/* Feedback */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">

            <div className="text-4xl">
              💬
            </div>

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Feedback
            </h2>

            <p className="text-gray-600 mt-2 leading-6">
              Your feedback helps us improve the Cook Book
              experience.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Contact;