import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import banner2 from '../Photos/banner2.png';
import banner3 from '../Photos/banner3.png';
import banner4 from '../Photos/banner4.png';
import banner5 from '../Photos/Banner5.png';
import Style from '../Styles/Banner.module.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

function Banner() {
  return (
    <div>
      <Swiper
        style={{
          "--swiper-pagination-color": "#235BD5",
          "--swiper-theme-color": "#235BD5",
          "--swiper-pagination-bullet-inactive-color": "#999999",
          "--swiper-pagination-bullet-inactive-opacity": "1",
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500 }}
        loop
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 60,
          },
        }}
      >
        <SwiperSlide><img src={banner3} alt="Imagem do banner 1" className={Style.img} /></SwiperSlide>
        <SwiperSlide><img src={banner2} alt="Imagem do banner 2" className={Style.img} /></SwiperSlide>
        <SwiperSlide><img src={banner4} alt="Imagem do banner 3" className={Style.img} /></SwiperSlide>
        <SwiperSlide><img src={banner5} alt="Imagem do banner 4" className={Style.img} /></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Banner;
