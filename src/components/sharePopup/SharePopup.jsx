import { useState } from 'react';
import { Tooltip, IconButton, VStack, Collapse, Box } from '@chakra-ui/react';
import { ReactComponent as FacebookIcon } from '../../assets/facebook.svg';
import { ReactComponent as SpotifyIcon } from '../../assets/spotify.svg';
import { ReactComponent as TwitterIcon } from '../../assets/twitter.svg';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';

const ShareTooltip = ({ children, url, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTooltip = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box position="relative" display="inline-block">
      <Tooltip label="Share" aria-label="Share tooltip">
        <IconButton icon={children} onClick={toggleTooltip} aria-label="Share" />
      </Tooltip>
      <Collapse in={isOpen} animateOpacity>
        <VStack
          position="absolute"
          bg="white"
          boxShadow="md"
          p={2}
          borderRadius="md"
          spacing={2}
          mt={2}
        >
          <FacebookShareButton url={url} quote={title}>
            <IconButton icon={<FacebookIcon />} aria-label="Share on Facebook" />
          </FacebookShareButton>
          <TwitterShareButton url={url} title={title}>
            <IconButton icon={<TwitterIcon />} aria-label="Share on Twitter" />
          </TwitterShareButton>
          <WhatsappShareButton url={url} title={title}>
            <IconButton icon={<SpotifyIcon />} aria-label="Share on Instagram" />
          </WhatsappShareButton>
        </VStack>
      </Collapse>
    </Box>
  );
};

export default ShareTooltip;
