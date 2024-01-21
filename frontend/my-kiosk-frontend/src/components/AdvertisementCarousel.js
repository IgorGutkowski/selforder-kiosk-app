import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../App.css';
const AdvertisementCarousel = () => {
    return (
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} className="relative max-w-screen-lg mx-auto">
            <div>
                <img src="/ad3.png" alt="Advert 3" className="block w-full object-contain" style={{ maxHeight: '50vh' }} />
            </div>
            <div>
                <img src="/ad2.png" alt="Advert 2" className="block w-full object-contain" style={{ maxHeight: '50vh' }} />
            </div>
            <div>
                <img src="/ad1.png" alt="Advert 1" className="block w-full object-contain" style={{ maxHeight: '50vh' }} />
            </div>
        </Carousel>
    );



};

export default AdvertisementCarousel;
