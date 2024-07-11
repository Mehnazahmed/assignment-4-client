import AboutUs from "../AboutUs/AboutUs";
import Categories from "../Categories/Categories";
import PhotoGallery from "../PhotoGallery/PhotoGallery";
import { HeroSection } from "../Slider/Slider";

const Home = () => {
  return (
    <div className="mx-auto container">
      <HeroSection />
      <Categories />
      <AboutUs />
      <PhotoGallery />
    </div>
  );
};

export default Home;
