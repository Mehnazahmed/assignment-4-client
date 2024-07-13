import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-green-50 py-20 px-8 md:px-24 lg:px-32 my-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-green-800">
          About Our Nursery
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Welcome to Breath Natural, where we cultivate a passion for plants and
          nature. Our journey began with a simple love for gardening, and today,
          we are proud to share that passion with you. At Breath Natural, we
          offer a wide variety of plants, ranging from exotic tropicals to
          resilient native species, carefully selected to thrive in your garden
          or indoor space. Whether you're a seasoned gardener or just starting
          your green journey, we're here to provide expert advice, quality
          plants, and exceptional service. Join us in nurturing green spaces and
          creating a greener, more vibrant world for everyone.
        </p>
        <Link to="/categories">
          <Button className="bg-gray-200 text-Black bg-yellow-400 hover:bg-yellow-300 py-3 px-8 rounded-lg">
            Explore Our Plants
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
