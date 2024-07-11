import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import slider1 from "@/assets/Images/slider1.jpg";
import slider2 from "@/assets/Images/slider2.jpg";
import slider3 from "@/assets/Images/slider3.jpg";
import slider4 from "@/assets/Images/slider4.jpg";

export function HeroSection() {
  const sliderData = [
    {
      id: 1,
      image: slider1,
    },
    {
      id: 2,
      image: slider2,
    },
    {
      id: 3,
      image: slider3,
    },
    {
      id: 4,
      image: slider4,
    },
  ];

  return (
    <div className="relative w-full h-[500px] mt-6">
      <Carousel
        className=" overflow-hidden rounded-lg shadow-lg"
        plugins={[
          Autoplay({
            delay: 6000,
          }),
        ]}
      >
        <CarouselContent className="flex">
          {sliderData.map((slider) => (
            <CarouselItem key={slider.id} className="min-w-full">
              <Card className="bg-transparent">
                <CardContent className="flex items-center justify-center h-[500px] p-0">
                  <img
                    src={slider?.image}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    alt=""
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9664;
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9654;
        </CarouselNext>
      </Carousel>
    </div>
  );
}
