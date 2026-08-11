import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";

function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-5 sm:px-6 py-10 sm:py-14 md:py-20 lg:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Left Content */}
                    <div className="text-center md:text-left order-2 md:order-1">
                        <span className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full font-medium mb-4">
                            🍽️ Discover Amazing Recipes
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                            Cook Delicious
                            <span className="text-orange-500"> Meals </span>
                            Every Day
                        </h1>

                        <p className="mt-5 text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                            Explore hand-picked recipes from different cuisines.
                            Find quick meals, delicious desserts, healthy dishes,
                            and step-by-step cooking instructions with videos.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                            <Link
                                to="/recipes"
                                className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-lg font-semibold transition text-center"
                            >
                                Browse Recipes →
                            </Link>

                            <Link
                                to="/about"
                                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-7 py-3 rounded-lg font-semibold transition text-center"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="order-1 md:order-2 flex justify-center">
                        <img
                            src={heroImage}
                            alt="Delicious Food"
                            className="w-full max-w-md md:max-w-full rounded-3xl shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* Popular Categories */}
            <section className="max-w-7xl mx-auto px-5 sm:px-6 py-10 md:py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Browse by Category
                    </h2>
                    <p className="text-gray-600 mt-3">
                        Find recipes based on your favorite meal type.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">

                    <Link
                        to="/recipes?course=Main%20Course"
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-4 md:p-6 text-center"
                    >
                        <div className="text-4xl md:text-5xl mb-4">🍛</div>
                        <h3 className="font-semibold text-sm md:text-base">Main Course</h3>
                    </Link>

                    <Link
                        to="/recipes?course=Main%20Course&subcategory=Noodles"
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-4 md:p-6 text-center"
                    >
                        <div className="text-4xl md:text-5xl mb-4">🍜</div>
                        <h3 className="font-semibold text-sm md:text-base">Noodles</h3>
                    </Link>

                    <Link
                        to="/recipes?course=Dessert"
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-4 md:p-6 text-center"
                    >
                        <div className="text-4xl md:text-5xl mb-4">🍰</div>
                        <h3 className="font-semibold text-sm md:text-base">Dessert</h3>
                    </Link>

                    <Link
                        to="/recipes?course=Snacks&course=Starter"
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-4 md:p-6 text-center"
                    >
                        <div className="text-4xl md:text-5xl mb-4">🥟</div>
                        <h3 className="font-semibold text-sm md:text-base">Snacks & Starters</h3>
                    </Link>

                    <Link
                        to="/recipes?course=Main%20Course&subcategory=Rice"
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-4 md:p-6 text-center"
                    >
                        <div className="text-4xl md:text-5xl mb-4">🍚</div>
                        <h3 className="font-semibold text-sm md:text-base">Rice</h3>
                    </Link>
                    <Link
                        to="/recipes?course=Main%20Course&subcategory=Curry"
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-4 md:p-6 text-center"
                    >
                        <div className="text-4xl md:text-5xl mb-4">🍲</div>
                        <h3 className="font-semibold text-sm md:text-base">Curry</h3>
                    </Link>

                </div>
            </section>
        </div>
    );
}

export default Home;