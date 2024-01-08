import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const AdvertisementCarousel = () => {
    return (
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} className="carousel-container">
            <div>
                <img src="/ad3.png" alt="Advert 3" className="carousel-image" />
            </div>
            <div>
                <img src="/ad2.png" alt="Advert 2" className="carousel-image" />
            </div>
            <div>
                <img src="/ad1.png" alt="Advert 1" className="carousel-image" />
            </div>
        </Carousel>
    );
};

export default AdvertisementCarousel;
