import { Box, Image, Text, Badge, Link, HStack, VStack, IconButton } from '@chakra-ui/react';
import { ReactComponent as AppleMusicIcon } from '../../../assets/appleMusic.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/facebook.svg';
import { ReactComponent as SpotifyIcon } from '../../../assets/spotify.svg';
import { ReactComponent as YouTubeIcon } from '../../../assets/youtube.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/twitter.svg';
import './performerCard.css';

const socialIcons = {
  Facebook: FacebookIcon,
  X: TwitterIcon,
  Spotify: SpotifyIcon,
  YouTube: YouTubeIcon,
  AppleMusic: AppleMusicIcon,
};

const cardStyles = {
  width: '370px',
  height: '258px',
  padding: '16px',
  border: '1px solid #ffffff',
  borderRadius: '25px',
  boxShadow: 'none',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'all 0.3s ease',
};

const PerformerCard = ({ image, name, website, type, description, socialLinks = [] }) => {
  const filteredSocialLinks = socialLinks.filter(({ type }) => socialIcons[type]);

  return (
    <Box className="performer-card" style={cardStyles}>
      <VStack align="start" spacing={2} flex={1} style={{ marginLeft: '16px' }}>
        <HStack spacing={3} style={{ marginTop: '8px' }}>
          <Image src={image} alt={name} borderRadius="full" boxSize="88px" />
          <VStack align="start" spacing={1}>
            <Text
              style={{
                fontSize: 'var(--performer-name-font-size)',
                fontWeight: '700',
                color: 'var(--secondary-black)',
              }}
            >
              {name}
            </Text>
            <Link
              href={website}
              color="var(--dynamic-color-700)"
              isExternal
              style={{ fontSize: 'var(--performer-website-font-size)' }}
            >
              {website}
            </Link>

            <Badge
              style={{
                backgroundColor: 'var(--secondary-grey)',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: 'var(--performer-badge-font-size)',
                fontWeight: '400',
                textTransform: 'capitalize',
                color: 'var(--primary-white-opaque)',
              }}
            >
              {type}
            </Badge>
          </VStack>
        </HStack>

        <Text
          style={{
            fontSize: 'var(--performer-description-font-size)',
            fontWeight: '300',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
          }}
        >
          {description}
        </Text>

        {filteredSocialLinks.length > 0 && (
          <HStack spacing={3} style={{ marginTop: '8px' }}>
            {filteredSocialLinks.map(({ uri, type }, index) => {
              const IconComponent = socialIcons[type];
              return (
                <IconButton
                  key={index}
                  as={Link}
                  href={uri}
                  icon={<IconComponent />}
                  aria-label={type}
                  variant="ghost"
                  isExternal
                  style={{ padding: '4px' }}
                />
              );
            })}
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default PerformerCard;
