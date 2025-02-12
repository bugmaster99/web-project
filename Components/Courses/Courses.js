import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import Course from "./Course/Course";
import classes from "./Courses.module.css";

const Courses = (props) => {
  const { courses } = props;
  return (
    <section className={classes.courses}>
      <h2 className={classes.title} id="courses">
        {courses?.title}
      </h2>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        spaceBetween={22.5}
        breakpoints={{
          767: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1080: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        modules={[Pagination, Autoplay]}
        className={classes.courseSwiper}
      >
        {courses.courseList?.map((course) => (
          <SwiperSlide key={course.id}>
            <Course
              imagePath={course?.img?.data?.attributes?.url}
              title={course.title}
              description={course.description}
              cta={course.ctaText}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Courses;
