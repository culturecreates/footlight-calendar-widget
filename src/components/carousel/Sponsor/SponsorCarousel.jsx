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
    <div style={styles.carouselContainer}>
      <Slider {...settings}>
        {sponsors.map((sponsor, index) => (
          <div key={index} style={styles.sponsorContainer}>
            <img src={sponsor.logo} alt={sponsor.name} style={styles.sponsorImage} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const styles = {
  carouselContainer: {
    maxWidth: '602px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '16px 0',
    maxHeight: '98px',
  },
  sponsorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    maxHeight: '75px',
    maxWidth: '75px',
  },
  sponsorImage: {
    maxHeight: '20px',
    width: '75px',
    objectFit: 'contain',
  },
};

export default SponsorsCarousel;
