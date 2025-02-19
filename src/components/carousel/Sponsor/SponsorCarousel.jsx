import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './sponsorCarousel.css';

const SponsorsCarousel = ({ sponsors = [] }) => {
  const [slidesToShow, setSlidesToShow] = useState(6);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      const maxSlides = width < 768 ? 4 : 6;
      setSlidesToShow(Math.min(sponsors.length, maxSlides));
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, [sponsors.length]);

  const canScroll = sponsors.length > slidesToShow;

  const settings = {
    dots: canScroll,
    infinite: canScroll,
    speed: 1000,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: canScroll,
    autoplaySpeed: 3000,
    arrows: false,
    customPaging: (i) => <button className="custom-dot" aria-label={`Go to slide ${i + 1}`} />,
    dotsClass: 'slick-dots custom-dots',
    responsive: [{ breakpoint: 768, settings: { slidesToShow: Math.min(sponsors.length, 4) } }],
  };

  return (
    <div style={getResponsiveStyles().carouselContainer}>
      <Slider {...settings}>
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="slide-item"
            style={styles.slideItem}
            onClick={() => sponsor.website && window.open(sponsor.website)}
          >
            <img
              src={sponsor.logo ?? sponsor.image}
              alt={sponsor.name}
              style={styles.sponsorLogo}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Function to handle responsive max-width dynamically
const getResponsiveStyles = () => {
  const width = window.innerWidth;
  let maxWidth = '602px';

  if (width < 768) maxWidth = '100%';

  return {
    carouselContainer: {
      maxWidth,
      margin: '0 auto',
      textAlign: 'center',
      padding: '16px 0',
      maxHeight: '98px',
    },
  };
};

const styles = {
  slideItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    maxHeight: '75px',
  },
  sponsorLogo: {
    maxHeight: '75px',
    height: '75px',
    width: '75px',
    objectFit: 'cover',
  },
};

export default SponsorsCarousel;
