import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper";
import classes from "./WatchUsYourself.module.css";
import { useEffect } from "react";

const WatchUsYourself = (props) => {
  const { watchUsYourself } = props;
  return (
    <section className={classes.watchUsYourself}>
      <h2 className={classes.title}>{watchUsYourself.title}</h2>
      <Swiper
        navigation={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        // }}
        slidesPerView={1}
        spaceBetween={30}
        // loop={true}
        pagination={{
          clickable: true,
        }}
        // slidesPerView={1}
        // spaceBetween={22.5}
        breakpoints={{
          767: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1080: {
            slidesPerView: 3,
            spaceBetween: 20,
            // initialSlide: 1,
            // centeredSlides: true,
          },
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className={classes.watchUsYourselfSwiper}
      >
        {watchUsYourself?.watchUsYourselfList?.map((video, index) => (
          <SwiperSlide key={video.id}>
            <div className={classes.myIframe}>
              <iframe
                height="315"
                src={video.youtubeUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default WatchUsYourself;
