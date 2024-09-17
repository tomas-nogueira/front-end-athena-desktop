import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import banner from '../Photos/banner.png'
import banner2 from '../Photos/banner2.png'
import Style from '../Styles/Banner.module.css'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'

function Banner() {
  return (
    <div>
        <div>
        <Swiper
            style={{
            "--swiper-pagination-color": "#235BD5",
            "--swiper-theme-color": "#235BD5",
            "--swiper-pagination-bullet-inactive-color": "#999999",
            "--swiper-pagination-bullet-inactive-opacity": "1",

            }}
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            autoplay={{delay:4500}}
            loop
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            breakpoints={{
            320: {
                slidesPerView: 1,
                spaceBetween: 40,
            },
            425: {
                slidesPerView: 1,
                spaceBetween: 40,
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 40,
            },
            1800: {
                slidesPerView: 3,
                spaceBetween: 80,
            },
            }}
            >
            <SwiperSlide><img src={banner2} alt="Imagem do banner" className={Style.img}/></SwiperSlide>
            <SwiperSlide><img src={banner2} alt="Imagem do banner" className={Style.img}/></SwiperSlide>
            <SwiperSlide><img src={banner2} alt="Imagem do banner" className={Style.img}/></SwiperSlide>
            <SwiperSlide><img src={banner2} alt="Imagem do banner" className={Style.img}/></SwiperSlide>
            <SwiperSlide><img src={banner2} alt="Imagem do banner" className={Style.img}/></SwiperSlide>
            </Swiper>
    </div>
    </div>
  )
}

export default Banner