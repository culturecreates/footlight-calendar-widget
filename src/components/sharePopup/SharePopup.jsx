import { useContext, useRef, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  VStack,
  Collapse,
  Box,
  useOutsideClick,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, XIcon } from 'react-share';
import { generateDeeplinkUrl } from '../../utils/hooks/useGenerateDeeplinkUrl';
import { ReactComponent as CopyLink } from '../../assets/copyLink.svg';
import './shareTooltip.css';
import { useTranslation } from 'react-i18next';
import { trackEventShare, trackListShare } from '../../utils/googleAnalytics';
import WidgetContext from '../../context/WidgetContext';

const socialPlatforms = [
  { name: 'Facebook', Component: FacebookShareButton, Icon: FacebookIcon },
  { name: 'X', Component: TwitterShareButton, Icon: XIcon },
  { name: 'WhatsApp', Component: WhatsappShareButton, Icon: WhatsappIcon },
  { name: 'Reddit', Component: RedditShareButton, Icon: RedditIcon },
];

const generateShareUrl = (platform, baseUrl) => {
  const encodedUrl = encodeURIComponent(baseUrl);

  switch (platform) {
    case 'Facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'X':
      return `https://x.com/intent/tweet?url=${encodedUrl}`;
    case 'WhatsApp':
      return `https://api.whatsapp.com/send?text=${encodedUrl}`;
    case 'Reddit':
      return `https://www.reddit.com/web/submit?url=${encodedUrl}`;
    default:
      return baseUrl;
  }
};

const ShareTooltip = ({ children, styles = {}, eventId }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { isOpen: isPopoverOpen, onOpen: openPopover, onClose: closePopover } = useDisclosure();
  const tooltipRef = useRef(null);
  const { t } = useTranslation();

  const [copyState, setCopyState] = useState(false);
  const url = generateDeeplinkUrl({ eventId });
  const { widgetProps } = useContext(WidgetContext);
  const { calendar } = widgetProps;

  useOutsideClick({
    ref: tooltipRef,
    handler: onClose,
  });

  const handleCopy = () => {
    setCopyState(true);
    navigator.clipboard.writeText(url);
    openPopover();

    setTimeout(() => {
      closePopover();
      setCopyState(false);
    }, 2000);
  };

  return (
    <Box position="relative" display="inline-block" ref={tooltipRef} className="share-tooltip">
      <Box onClick={onToggle}>{children}</Box>
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
            ...styles,
          }}
        >
          {socialPlatforms.map(({ name, Component, Icon }) => {
            const finalUrl = generateShareUrl(name, url);
            const searchParams = new URL(finalUrl).search;
            return (
              <Component
                key={name}
                url={url}
                onClick={() => {
                  if (eventId) trackEventShare(calendar, eventId, finalUrl);
                  else trackListShare(calendar, searchParams, finalUrl);
                }}
              >
                <Icon size={32} round />
              </Component>
            );
          })}

          <Popover isOpen={isPopoverOpen} onClose={closePopover} placement="left">
            <PopoverTrigger>
              <Box
                onMouseEnter={() => {
                  if (!copyState) openPopover();
                }}
                onMouseLeave={() => {
                  if (!copyState) closePopover();
                }}
                onClick={handleCopy}
              >
                <Icon
                  as={CopyLink}
                  className="copy-link-icon"
                  height="32px"
                  width="32px"
                  style={{ border: '1px solid var(--main-dynamic-color)', borderRadius: '100%' }}
                />
              </Box>
            </PopoverTrigger>
            <PopoverContent
              style={{
                padding: '0px',
                border: '1px solid var(--bg-grey)',
                borderRadius: '6px',
                boxShadow: 'md',
                width: 'auto',
                top: '20px',
              }}
            >
              <PopoverArrow />
              <PopoverBody fontSize="sm" style={{ padding: '4px 8px' }} textAlign="center">
                {t(copyState ? 'share.copied' : 'share.copy')}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </VStack>
      </Collapse>
    </Box>
  );
};

export default ShareTooltip;
