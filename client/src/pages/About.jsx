function About() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold text-center text-orange-600">
        About CookBook
      </h1>

      <p className="mt-8 text-lg text-gray-700 leading-8 text-center">
        CookBook is a modern recipe discovery platform built using
        React.js and Tailwind CSS. It helps food lovers explore
        delicious recipes from different cuisines with an easy-to-use
        search and filtering system.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-14">

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">

          <div className="text-5xl">🍽️</div>

          <h2 className="text-xl font-bold mt-4">
            Explore Recipes
          </h2>

          <p className="mt-3 text-gray-600">
            Browse recipes from Indian, Chinese,
            Italian, American and many more cuisines.
          </p>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">

          <div className="text-5xl">🔍</div>

          <h2 className="text-xl font-bold mt-4">
            Smart Filters
          </h2>

          <p className="mt-3 text-gray-600">
            Filter recipes by cuisine, diet,
            taste, course and search instantly.
          </p>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">

          <div className="text-5xl">🎥</div>

          <h2 className="text-xl font-bold mt-4">
            Video Tutorials
          </h2>

          <p className="mt-3 text-gray-600">
            Watch step-by-step YouTube tutorials
            for every recipe.
          </p>

        </div>

      </div>

      <div className="mt-16 bg-orange-50 rounded-xl p-8">

        <h2 className="text-2xl font-bold">
          Technologies Used
        </h2>

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

        </div>

      </div>

    </main>
  );
}

export default About;