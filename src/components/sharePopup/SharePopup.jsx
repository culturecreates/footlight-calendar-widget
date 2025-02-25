import { useRef } from 'react';
import {
  Tooltip,
  VStack,
  Collapse,
  Box,
  useOutsideClick,
  useDisclosure,
  Icon,
  useToast,
} from '@chakra-ui/react';
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
import { ReactComponent as CopyLink } from '../../assets/copyLink.svg';
import './shareTooltip.css';
import { useTranslation } from 'react-i18next';

const ShareTooltip = ({ children, styles = {}, eventId }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const tooltipRef = useRef(null);
  const { t } = useTranslation();

  const toast = useToast();
  const toastId = 'footlite-share-popup-toast';

  const url = generateDeeplinkUrl({ eventId });

  useOutsideClick({
    ref: tooltipRef,
    handler: onClose,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    if (!toast.isActive(toastId))
      toast({
        id: toastId,
        title: 'Copied!',
        description: 'Link copied to clipboard.',
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
  };

  return (
    <Box position="relative" display="inline-block" ref={tooltipRef} className="share-tooltip">
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
            ...styles,
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
          <Tooltip label={t('share.copy')} hasArrow>
            <Box onClick={handleCopy}>
              <Icon
                as={CopyLink}
                className="copy-link-icon"
                height={'32px'}
                width={'32px'}
                style={{ border: '1px solid var(--main-dynamic-color)', borderRadius: '100%' }}
              />
            </Box>
          </Tooltip>
        </VStack>
      </Collapse>
    </Box>
  );
};

export default ShareTooltip;
