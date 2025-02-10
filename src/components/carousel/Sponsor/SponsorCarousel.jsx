import React from 'react';
import { Box, Image, Flex } from '@chakra-ui/react';
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
    <Box
      maxW={{
        base: '369px',
        sm: '369px',
        md: '602px',
        lg: '602px',
      }}
      mx="auto"
      textAlign="center"
      py={4}
      maxH={'98px'}
    >
      <Slider {...settings}>
        {sponsors.map((sponsor, index) => (
          <Flex
            key={index}
            justifyContent="center"
            alignItems="center"
            mx="auto"
            maxH={'75px'}
            maxW={'75px'}
          >
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              maxHeight={'20px'}
              width={'75px'}
              objectFit="contain"
            />
          </Flex>
        ))}
      </Slider>
    </Box>
  );
};

export default SponsorsCarousel;
