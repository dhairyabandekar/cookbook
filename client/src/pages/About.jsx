function About() {
  return (
    <main className="min-h-screen bg-orange-50">

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        <div className="text-center max-w-3xl mx-auto">

          <div className="text-5xl sm:text-6xl mb-5">
            🍳
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-orange-600">
            About Cook Book
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-600 leading-8">
            Cook Book is a full-stack recipe discovery platform designed
            to make finding and exploring delicious recipes simple and
            enjoyable. Discover recipes from different cuisines, filter
            them according to your preferences, save your favourites,
            and follow video tutorials for selected recipes.
          </p>

        </div>

      </section>


      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Explore Recipes */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-4xl">
              🍽️
            </div>

            <h2 className="text-xl font-bold text-gray-800 mt-5">
              Explore Recipes
            </h2>

            <p className="mt-3 text-gray-600 leading-6">
              Discover recipes across Indian, Chinese, Italian,
              American and other cuisines.
            </p>

          </div>


          {/* Smart Filters */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-4xl">
              🔍
            </div>

            <h2 className="text-xl font-bold text-gray-800 mt-5">
              Smart Filters
            </h2>

            <p className="mt-3 text-gray-600 leading-6">
              Find recipes quickly using search, diet, cuisine,
              course and subcategory filters.
            </p>

          </div>


          {/* Favourite Recipes */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-4xl">
              ❤️
            </div>

            <h2 className="text-xl font-bold text-gray-800 mt-5">
              Save Favourites
            </h2>

            <p className="mt-3 text-gray-600 leading-6">
              Save recipes you love to your favourites and
              access them whenever you want.
            </p>

          </div>


          {/* Video Tutorials */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-4xl">
              🎥
            </div>

            <h2 className="text-xl font-bold text-gray-800 mt-5">
              Video Tutorials
            </h2>

            <p className="mt-3 text-gray-600 leading-6">
              Follow YouTube video tutorials available for
              selected recipes.
            </p>

          </div>

        </div>

      </section>


      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
            How Cook Book Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

            {/* Step 1 */}
            <div className="text-center">

              <div className="w-12 h-12 mx-auto rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold">
                1
              </div>

              <h3 className="text-lg font-bold text-gray-800 mt-4">
                Discover
              </h3>

              <p className="text-gray-600 mt-2 leading-6">
                Browse the recipe collection and explore dishes
                from different cuisines and categories.
              </p>

            </div>


            {/* Step 2 */}
            <div className="text-center">

              <div className="w-12 h-12 mx-auto rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold">
                2
              </div>

              <h3 className="text-lg font-bold text-gray-800 mt-4">
                Find Your Recipe
              </h3>

              <p className="text-gray-600 mt-2 leading-6">
                Use search and filters to quickly find a recipe
                that matches your preferences.
              </p>

            </div>


            {/* Step 3 */}
            <div className="text-center">

              <div className="w-12 h-12 mx-auto rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold">
                3
              </div>

              <h3 className="text-lg font-bold text-gray-800 mt-4">
                Cook & Save
              </h3>

              <p className="text-gray-600 mt-2 leading-6">
                Follow the ingredients and cooking steps,
                watch available tutorials, and save your favourites.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Admin Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        <div className="bg-orange-100 rounded-2xl p-6 sm:p-8">

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Recipe Management
          </h2>

          <p className="text-gray-600 mt-3 leading-7">
            Cook Book also includes an admin dashboard for managing
            the recipe collection and monitoring application statistics.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

            <div className="bg-white rounded-xl p-4">
              <p className="font-semibold text-gray-800">
                ➕ Add Recipes
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Add new recipes to the collection.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <p className="font-semibold text-gray-800">
                ✏️ Edit Recipes
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Update existing recipe information.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <p className="font-semibold text-gray-800">
                🗑️ Delete Recipes
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Remove recipes from the collection.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <p className="font-semibold text-gray-800">
                📊 Dashboard
              </p>
              <p className="text-sm text-gray-500 mt-1">
                View users, recipes and category statistics.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* Technologies */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Technologies Used
          </h2>

          <p className="text-gray-600 mt-2">
            Built using modern technologies for a responsive
            full-stack web experience.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">

            <span className="bg-orange-500 text-white px-4 py-2 rounded-full">
              React.js
            </span>

            <span className="bg-orange-500 text-white px-4 py-2 rounded-full">
              Tailwind CSS
            </span>

            <span className="bg-orange-500 text-white px-4 py-2 rounded-full">
              React Router
            </span>

            <span className="bg-orange-500 text-white px-4 py-2 rounded-full">
              JavaScript
            </span>

            <span className="bg-orange-500 text-white px-4 py-2 rounded-full">
              Node.js
            </span>

            <span className="bg-orange-500 text-white px-4 py-2 rounded-full">
              Express.js
            </span>

            <span className="bg-orange-500 text-white px-4 py-2 rounded-full">
              MongoDB
            </span>

            <span className="bg-orange-500 text-white px-4 py-2 rounded-full">
              JWT Authentication
            </span>

            <span className="bg-orange-500 text-white px-4 py-2 rounded-full">
              REST API
            </span>

            <span className="bg-orange-500 text-white px-4 py-2 rounded-full">
               WEB3FORMS
            </span>

          </div>

        </div>

      </section>

    </main>
  );
}

export default About;