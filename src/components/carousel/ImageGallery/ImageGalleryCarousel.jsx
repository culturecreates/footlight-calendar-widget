import React from 'react';
import Slider from 'react-slick';
import '../slick.css';
import '../slick-theme.css';
import './imageGalleryCarousel.css';
import ImageCard from '../../card/ImageGalleryCard/ImageGalleryCard';

const ImageGalleryCarousel = ({ images }) => {
  const canScroll = images.length > 2;
  const settings = {
    dots: canScroll,
    infinite: false,
    speed: 1000,
    slidesToShow: images.length >= 2 ? 2 : 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    customPaging: (i) => <button className="custom-dot" aria-label={`Go to slide ${i + 1}`} />,
    dotsClass: 'slick-dots custom-dots',
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 2 } }],
  };
  return (
    <div style={getResponsiveStyles().carouselContainer}>
      <Slider {...settings} className="image-gallery-carousel">
        {images.map((image, index) => (
          <div key={index} style={styles.slideItem}>
            <ImageCard src={image.src} alt={image.alt ?? ''} />
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

  if (width < 768) maxWidth = '100%'; // For mobile & smaller screens

  return {
    carouselContainer: {
      maxWidth,
      margin: 'intial',
      textAlign: 'center',
      padding: '16px 0',
    },
  };
};

const styles = {
  slideItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
};

export default ImageGalleryCarousel;
