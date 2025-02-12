import { Box, Image, Text, Badge, Link, HStack, VStack, IconButton } from '@chakra-ui/react';
import { ReactComponent as AppleMusicIcon } from '../../../assets/appleMusic.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/facebook.svg';
import { ReactComponent as SpotifyIcon } from '../../../assets/spotify.svg';
import { ReactComponent as YouTubeIcon } from '../../../assets/youtube.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/twitter.svg';

const socialIcons = {
  Facebook: FacebookIcon,
  X: TwitterIcon,
  Spotify: SpotifyIcon,
  YouTube: YouTubeIcon,
  AppleMusic: AppleMusicIcon,
};

const PresenterCard = ({ image, name, website, type, description, socialLinks = [] }) => {
  const filteredSocialLinks = socialLinks.filter(({ type }) => socialIcons[type]);

  return (
    <Box
      w={{ base: '370px', sm: '370px', md: '599px', lg: '599px' }}
      h={{ base: '258px', sm: '258px', md: '233px', lg: '233px' }}
      p={4}
      border={'1px solid #ffffff'}
      borderRadius="25px"
      boxShadow="none"
      bg="white"
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems="center"
      backgroundColor={'white'}
    >
      <VStack align="start" gap={2} flex={1} ml={{ md: 4 }}>
        <HStack gap={3} mt={2}>
          <Image src={image} alt={name} borderRadius="full" boxSize="88px" />
          <VStack align="start" gap={1}>
            <Text
              fontSize="var(--presenter-name-font-size)"
              fontWeight="700"
              color={'var(--secondary-black'}
            >
              {name}
            </Text>
            <Link
              href={website}
              color="var(--dynamic-color-700)"
              target="_blank"
              rel="noopener noreferrer"
              fontSize="var(--presenter-website-font-size)"
            >
              {website}
            </Link>

            <Badge
              bg="var(--secondary-grey)"
              px={2}
              py={1}
              borderRadius="4px"
              fontSize={'var(--presenter-badge-font-size)'}
              fontWeight={'400'}
              textTransform={'capitalize'}
              color="var(--primary-white-opaque)"
            >
              {type}
            </Badge>
          </VStack>
        </HStack>

        <Text fontSize="var(--presenter-description-font-size)" fontWeight={'300'} noOfLines={3}>
          {description}
        </Text>

        {filteredSocialLinks.length > 0 && (
          <HStack gap={3} mt={2}>
            {filteredSocialLinks.map(({ uri, type }, index) => {
              const IconComponent = socialIcons[type];
              return (
                <IconButton
                  key={index}
                  as={Link}
                  href={uri}
                  aria-label={type}
                  variant="ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                  children={<IconComponent />}
                ></IconButton>
              );
            })}
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default PresenterCard;
