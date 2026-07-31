function Contact() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold text-center text-orange-600">
        Contact Us
      </h1>

      <p className="text-center mt-4 text-gray-600">
        We'd love to hear your feedback, recipe suggestions,
        or any questions you have.
      </p>

      <div className="bg-white rounded-xl shadow-lg mt-10 p-8">

        <form className="space-y-6">

          <div>

            <label className="block font-semibold mb-2">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

          </div>

          <div>

            <label className="block font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

          </div>

          <div>

            <label className="block font-semibold mb-2">
              Message
            </label>

            <textarea
              rows="6"
              placeholder="Write your message..."
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>

          </div>

          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg transition"
          >
            Send Message
          </button>

        </form>

      </div>

    </main>
  );
}

export default Contact;