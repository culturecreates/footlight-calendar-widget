import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './imageGalleryCarousel.css';
import ImageCard from '../../card/ImageGalleryCard/ImageGalleryCard'; // Import the ImageCard component

const ImageGalleryCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2, // Show 2 images at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    customPaging: (i) => <button className="custom-dot" aria-label={`Go to slide ${i + 1}`} />,
    dotsClass: 'slick-dots custom-dots',
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 2 } }], // Show 2 images on mobile as well
  };

  return (
    <div style={getResponsiveStyles().carouselContainer}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} style={styles.slideItem}>
            <ImageCard src={image.src} alt={image.alt} />
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
  },
};

export default ImageGalleryCarousel;
