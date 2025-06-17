import Image from "next/image";
import Navbar from "./components/Navbar";
import Link from "next/link";
import ratingsImg from "./assets/images/ratings.png";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-6">
        {/* Hero Section */}
        <section className="hero-section text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600">
            Welcome to SurveySnap
          </h1>
          <p className="text-lg mt-4 text-gray-700">
            Your trusted platform for conducting quick and easy polls.
          </p>
          <Link
            href="/create-poll"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition"
          >
            Create a Poll
          </Link>
          <div className="mt-8">
            <Image
              src={ratingsImg}
              alt="Poll illustration"
              width={300}
              height={200}
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section mb-12 text-center">
          <h2 className="text-3xl font-semibold text-blue-600">
            Why Choose SurveySnap?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            <div className="feature bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-blue-600">
                Easy to Use
              </h3>
              <p className="mt-2 text-gray-600">
                Create and share polls in just a few clicks.
              </p>
            </div>
            <div className="feature bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-blue-600">
                Instant Results
              </h3>
              <p className="mt-2 text-gray-600">
                View poll results in real-time as people vote.
              </p>
            </div>
            <div className="feature bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-blue-600">
                Secure and Private
              </h3>
              <p className="mt-2 text-gray-600">
                We prioritize your privacy with secure voting options.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section mb-12">
          <h2 className="text-3xl font-semibold text-center text-blue-600">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="step text-center">
              <h3 className="text-xl font-semibold">1. Create a Poll</h3>
              <p className="mt-2 text-gray-600">
                Choose your question and options, then share it with your
                audience.
              </p>
            </div>
            <div className="step text-center">
              <h3 className="text-xl font-semibold">2. Collect Votes</h3>
              <p className="mt-2 text-gray-600">
                Watch the votes come in as users cast their opinions.
              </p>
            </div>
            <div className="step text-center">
              <h3 className="text-xl font-semibold">3. Analyze Results</h3>
              <p className="mt-2 text-gray-600">
                See the results instantly and get a detailed breakdown of the
                data.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section mb-12 text-center">
          <h2 className="text-3xl font-semibold text-blue-600">
            What Our Users Say
          </h2>
          <div className="testimonials mt-8">
            <blockquote className="text-lg italic text-gray-700">
              <p>"VoteSphere made gathering feedback so easy and fun!"</p>
              <footer>- Alex T.</footer>
            </blockquote>
            <blockquote className="mt-4 text-lg italic text-gray-700">
              <p>
                "A great platform for getting instant insights on my polls."
              </p>
              <footer>- Jamie L.</footer>
            </blockquote>
          </div>
        </section>

        {/* Footer Section */}
        <section className="footer-section text-center text-gray-600 py-6">
          <p>&copy; 2025 VoteSphere. All rights reserved.</p>
        </section>
      </main>
    </div>
  );
}
