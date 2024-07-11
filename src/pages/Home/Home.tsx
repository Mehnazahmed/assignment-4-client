import Categories from "../Categories/Categories";
import { HeroSection } from "../Slider/Slider";

const Home = () => {
  return (
    <div className="mx-auto container">
      <HeroSection />
      <Categories />
    </div>
  );
};

export default Home;
