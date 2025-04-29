import { Box, Image, Text, Badge, Link, HStack, VStack, IconButton, Stack } from '@chakra-ui/react';
import { ReactComponent as AppleMusicIcon } from '../../../assets/appleMusic.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/facebook.svg';
import { ReactComponent as SpotifyIcon } from '../../../assets/spotify.svg';
import { ReactComponent as YouTubeIcon } from '../../../assets/youtube.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/twitter.svg';
import { ReactComponent as InstagramIcon } from '../../../assets/instagram.svg';
import './performerCard.css';
import ShowMoreTrigger from '../../showMoreTrigger/ShowMoreTrigger';
import { useRef, useState } from 'react';
import { getLocalized } from '../../../utils/getLocalized';
import { trackArtistUrl } from '../../../utils/googleAnalytics';

const socialIcons = {
  Facebook: FacebookIcon,
  X: TwitterIcon,
  Spotify: SpotifyIcon,
  YouTube: YouTubeIcon,
  AppleMusic: AppleMusicIcon,
  Instagram: InstagramIcon,
};

const cardStyles = {
  width: 'auto',
  minHeight: '120px',
  padding: '16px',
  border: '1px solid #ffffff',
  borderRadius: '25px',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  boxShadow: '0px 0px 153px 0px #0000001A',
};

const PerformerCard = ({
  image,
  name,
  website,
  occupation,
  description = '',
  socialLinks = [],
  locale,
  calendar,
  eventId,
}) => {
  const [flag, setFlag] = useState(false);
  const [showMoreDisplayStatus, setShowMoreButtonState] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const descriptionRef = useRef(null);

  const filteredSocialLinks = socialLinks.filter(({ type }) => socialIcons[type]);

  return (
    <Box className="performer-card" style={cardStyles}>
      <VStack align="start" spacing={2} flex={1} style={{ marginLeft: '16px', width: '100%' }}>
        <HStack spacing={!imageLoadError ? 3 : 0} style={{ marginTop: '8px' }}>
          <Box
            style={{
              width: '50px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '100%',
            }}
          >
            <Image
              onError={(e) => {
                e.target.style.display = 'none';
                setImageLoadError(true);
              }}
              src={image}
              alt={name}
              width={'80%'}
              height={'80%'}
              objectFit="contain"
            />
          </Box>
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
              onClick={() => trackArtistUrl(calendar, eventId, website)}
              color="var(--dynamic-color-700)"
              isExternal
              style={{ fontSize: 'var(--performer-website-font-size)' }}
            >
              {website}
            </Link>

            <Stack>
              {occupation?.map((item, index) => {
                return (
                  <Badge
                    key={index}
                    style={{
                      backgroundColor: 'var(--secondary-grey)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: 'var(--performer-badge-font-size)',
                      fontWeight: '400',
                      textTransform: 'capitalize',
                      color: 'var(--primary-white-opaque)',
                      width: 'fit-content',
                    }}
                  >
                    {getLocalized(item?.name, locale)}
                  </Badge>
                );
              })}
            </Stack>
          </VStack>
        </HStack>

        <Box>
          <Box
            className={`clamped-text-performer-description ${flag ? 'expanded' : ''}`}
            ref={descriptionRef}
            onClick={() => {
              setFlag(!flag);
            }}
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <ShowMoreTrigger
            setFlag={setFlag}
            flag={flag}
            handleShowMoreButtonState={(status) => setShowMoreButtonState(status)}
            containerData={description}
            showMoreDisplayStatus={showMoreDisplayStatus}
            ref={descriptionRef}
          />
        </Box>

        {filteredSocialLinks.length > 0 && (
          <HStack spacing={2} style={{ marginTop: '8px' }}>
            {filteredSocialLinks.map(({ uri, type }, index) => {
              const IconComponent = socialIcons[type];
              return (
                <IconButton
                  className={`social-icon social-icon-${type}`}
                  key={index}
                  as={Link}
                  href={uri}
                  icon={<IconComponent onClick={() => trackArtistUrl(calendar, eventId, uri)} />}
                  aria-label={type}
                  variant="ghost"
                  isExternal
                  style={{ padding: '4px', minWidth: '24px', minHeight: '24px' }}
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
