import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import classes from "./WhyStudentsLoveUs.module.css";

// import { Pagination } from "swiper";

const WhyStudentsLoveUs = (props) => {
  const { whyStudentsLoveUs } = props;
  return (
    <div className={classes.whyStudentLoveUs} id="testimonials">
      <h2 className={classes.title}>{whyStudentsLoveUs?.title}</h2>
      <div className={classes.testimonials}>
        {/* <Swiper
          slidesPerView={1}
          breakpoints={{
            368: {
              slidesPerView: 2,
            },
          }}
          modules={[Pagination]}
          className={classes.whyStudentsLoveUsSwiper}
        > */}
        {whyStudentsLoveUs?.whyStudentsLoveUsList.map((data) => (
          // <SwiperSlide key={data.id}>
          <a
            key={data.id}
            href={data.youtubeUrl}
            target={"_blank"}
            rel="noopener noreferrer"
            className={classes.link}
          >
            <div className={classes.videoThumb}>
              <Image
                className={classes.videoImg}
                src={data?.img?.data?.attributes?.url}
                width={data?.img?.data?.attributes?.width}
                height={data?.img?.data?.attributes?.height}
                alt={data.title}
                layout={"responsive"}
                // objectFit={"cover"}
              />

              <div className={classes.playBtn}>
                <div className={classes.playArrow}></div>
              </div>
            </div>
            <div className={classes.videoTitle}>{data.title}</div>
            <div className={classes.videoSubtitle}>{data.description}</div>
          </a>
          // </SwiperSlide>
        ))}
        {/* </Swiper> */}
      </div>
    </div>
  );
};

export default WhyStudentsLoveUs;
