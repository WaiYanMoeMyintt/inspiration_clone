import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { Pagination, Navigation } from "swiper/modules";
import "../css/rated.css";

const Rated = () => {
  const api =
    "https://api.themoviedb.org/3/tv/top_rated?api_key=1b7c076a0e4849aeefd1f3c429c99a36&language=en-US&page=2";
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const [rated, setrated] = useState([]);

  useEffect(() => {
    const fetchTated = async () => {
      try {
        const fetchData = await fetch(api);
        const responseData = await fetchData.json();
        setrated(responseData.results);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchTated();
  }, []);

  const [slidesPerView, setSlidesPerView] = useState(5);
  useEffect(() => {
    const handleResize = () => {
      // Update slidesPerView based on screen width
      if (window.innerWidth < 768) {
        setSlidesPerView(3); // For mobile devices
      } else {
        setSlidesPerView(5); // For larger screens
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set the initial value
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="rated_list mt-5">
      <div className="rated_title">
        <h2>Top Trending Series</h2>
      </div>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={20}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper rated_swiper"
      >
        {rated.map((items, index) => (
          <SwiperSlide key={items.id}>
            <Link to={`/series/${items.id}/${items.original_name}`}>
              <div className="poster">
                <img
                  src={imgUrl + items.poster_path}
                  alt={items.original_title}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                  />
                </svg>
                <p className="vote">{items.vote_average}</p>
              </div>
              <div className="detail">
                <div className="detail_info">
                  <p>{items.first_air_date.slice(0, 4)}</p>
                </div>
                <div className="detail_title">
                  <h1>{items.original_name}</h1>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Rated;
