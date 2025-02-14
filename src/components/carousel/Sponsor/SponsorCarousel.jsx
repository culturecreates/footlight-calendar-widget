import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './sponsorCarousel.css';

const SponsorsCarousel = ({ sponsors }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    customPaging: (i) => <button className="custom-dot" aria-label={`Go to slide ${i + 1}`} />,
    dotsClass: 'slick-dots custom-dots',
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 4 } }],
  };

  return (
    <div style={getResponsiveStyles().carouselContainer}>
      <Slider {...settings}>
        {sponsors.map((sponsor, index) => (
          <div key={index} style={styles.slideItem}>
            <img src={sponsor.logo} alt={sponsor.name} style={styles.sponsorLogo} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Function to handle responsive max-width dynamically
const getResponsiveStyles = () => {
  const width = window.innerWidth;
  let maxWidth = '602px'; // Default for larger screens

  if (width < 768) maxWidth = '369px'; // For mobile & smaller screens

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
    maxWidth: '75px',
  },
  sponsorLogo: {
    maxHeight: '20px',
    width: '75px',
    objectFit: 'contain',
  },
  customDot: {
    width: '8px',
    height: '8px',
    margin: '0 4px',
    borderRadius: '50%',
    background: '#bbb',
    border: 'none',
    cursor: 'pointer',
  },
};

export default SponsorsCarousel;
