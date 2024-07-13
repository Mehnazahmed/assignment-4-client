import image1 from "@/assets/Images/gallery/photoG1.jpg";
import image2 from "@/assets/Images/gallery/photoG2.jpg";
import image3 from "@/assets/Images/gallery/photoG3.jpg";
import image4 from "@/assets/Images/gallery/photoG4.jpeg";
import image5 from "@/assets/Images/gallery/photoG13.jpg";
import image6 from "@/assets/Images/gallery/photoG6.jpeg";
import image7 from "@/assets/Images/gallery/photoG12.jpg";
import image8 from "@/assets/Images/gallery/photoG8.png";
import image9 from "@/assets/Images/gallery/photoG9.jpg";
import image10 from "@/assets/Images/gallery/photoG10.jpg";
import image11 from "@/assets/Images/gallery/photoG14.jpg";
import image12 from "@/assets/Images/gallery/photoG15.jpg";

const images = [
  { src: image1, colSpan: "md:col-span-1", rowSpan: "md:row-span-2" },
  { src: image2, colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
  { src: image3, colSpan: "md:col-span-1", rowSpan: "md:row-span-2" },
  { src: image12, colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
  { src: image4, colSpan: "md:col-span-2", rowSpan: "md:row-span-1" },
  { src: image5, colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
  { src: image6, colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
  { src: image7, colSpan: "md:col-span-1", rowSpan: "md:row-span-2" },
  { src: image8, colSpan: "md:col-span-2", rowSpan: "md:row-span-1" },
  { src: image9, colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
  { src: image10, colSpan: "md:col-span-2", rowSpan: "md:row-span-2" },
  { src: image11, colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
];

const PhotoGallery = () => {
  return (
    <div className="bg-gray-100 px-4 md:px-28">
      <section className="py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Photo Gallery</h1>
        <div className="container mx-auto w-full md:px-24">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`${image.colSpan} ${image.rowSpan} w-full h-full overflow-hidden rounded-lg shadow-md`}
              >
                <img
                  src={image.src}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PhotoGallery;
