import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router";

interface Slide {
  id: number;
  image: string;
  title: string;
  title2: string;
  description: string;
}

export default function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    cssEase: "ease-in-out",
  };

  const slides: Slide[] = [
    {
      id: 1,
      image: "https://i.ibb.co.com/mVLmVXZz/truckload-9483157-1280.webp",
      title: "Fast & Reliable Parcel Delivery",
      title2: "Send Anywhere, Anytime",
      description:
        "From local deliveries to nationwide shipments, our system ensures your parcels are tracked and delivered securely.",
    },
    {
      id: 2,
      image: "https://i.ibb.co.com/kgV5yd6c/pexels-kindelmedia-6995138.jpg",
      title: "Track Every Step",
      title2: "Real-Time Parcel Updates",
      description:
        "Stay updated with live tracking, delivery logs, and instant notifications for every parcel you send or receive.",
    },
    {
      id: 3,
      image: "https://i.ibb.co.com/TBcWMb6n/pexels-kampus-7844011.jpg",
      title: "Simple & Secure Management",
      title2: "For Senders, Receivers & Admins",
      description:
        "Create, cancel, and confirm parcels with ease. Admins can manage users and monitor all deliveries in one dashboard.",
    },
  ];

  return (
    <div className="w-full mb-5">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative max-h-[calc(100vh-100px)]">
            <div className="relative w-full">
              {/* Background Overlay */}
              <div className="absolute inset-0 bg-black opacity-20 z-10"></div>

              {/* Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-screen object-cover object-bottom z-0"
              />
            </div>

            {/* Text Overlay */}
            <div className="absolute top-0 left-0 z-30 flex flex-col justify-center items-center text-center h-[calc(100vh-100px)] w-full px-6 text-white space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {slide.title}
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                {slide.title2}
              </h2>
              <p className="lg:w-2/3 text-white text-base md:text-lg font-normal">
                {slide.description}
              </p>
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="btn bg-primary text-white px-6 py-2 rounded-full shadow-md hover:opacity-90 transition"
                >
                  Send Parcel Now
                </Link>
                <Link
                  to="/track"
                  className="btn bg-primary text-white px-6 py-2 rounded-full shadow-md hover:opacity-90 transition"
                >
                  Track Your Parcel
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
