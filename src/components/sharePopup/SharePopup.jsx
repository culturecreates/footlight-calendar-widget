import { useRef } from 'react';
import { Tooltip, VStack, Collapse, Box, useOutsideClick, useDisclosure } from '@chakra-ui/react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterIcon,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share';
import { generateDeeplinkUrl } from '../../utils/hooks/useGenerateDeeplinkUrl';

const ShareTooltip = ({ children }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const tooltipRef = useRef(null);

  const url = generateDeeplinkUrl();

  useOutsideClick({
    ref: tooltipRef,
    handler: onClose,
  });

  return (
    <Box position="relative" display="inline-block" ref={tooltipRef}>
      <Tooltip aria-label="Share tooltip" arrowSize={5}>
        <Box onClick={onToggle}>{children}</Box>
      </Tooltip>
      <Collapse in={isOpen} animateOpacity>
        <VStack
          style={{
            position: 'absolute',
            background: 'white',
            boxShadow: 'var(--secondary-box-shadow)',
            padding: '8px',
            borderRadius: '8px',
            marginTop: '8px',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid var(--bg-grey)',
            gap: '8px',
          }}
        >
          <FacebookShareButton url={url}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <RedditShareButton url={url}>
            <RedditIcon size={32} round={true} />
          </RedditShareButton>
        </VStack>
      </Collapse>
    </Box>
  );
};

export default ShareTooltip;
