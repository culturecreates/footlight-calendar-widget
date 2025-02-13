import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  Button,
  Box,
  Icon,
  Flex,
  Image,
  IconButton,
} from '@chakra-ui/react';
import WidgetContext from '../../context/WidgetContext';
import { transformData } from '../../utils/transformData';
import './eventDetailsModal.css';
import { ReactComponent as calendaricon } from '../../assets/calendar.svg';
import { ReactComponent as StageIcon } from '../../assets/locationPin.svg';
import { ReactComponent as InformationCircle } from '../../assets/informationCircle.svg';
import { cleanDescription } from '../../utils/cleanDescription';
import EventTypeBadge from '../badge/EventTypeBadge/EventTypeBadge';
import { redirectionHandler } from '../../utils/redirectionHandler';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ChevronDownIcon } from '../../assets/arrowDown.svg';
import { ReactComponent as ChevronUpIcon } from '../../assets/upChevron.svg';
import DateBadge from '../badge/DateBadge/DateBadge';
import { dateRangeFormatter } from '../../utils/dateRangeFormatter';
import Loader from '../loader/Loader';

const EventDetailsModal = ({ isOpen, onClose, eventId }) => {
  const { widgetProps } = useContext(WidgetContext);
  const { locale } = widgetProps;

  const { t } = useTranslation();

  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [creditDisplayFlag, setCreditDisplayFlag] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullImageCreditDescription, setShowFullImageCreditDescription] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!eventId || !isOpen) return;

    const fetchEventDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}events/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }

        const data = await response.json();
        const eventDetails = transformData({ data: [data?.data || []], locale })[0];

        setEventDetails(eventDetails || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId, isOpen]);

  useEffect(() => {
    containerRef.current = document.getElementById('calendar-widget');
  }, []);

  const handleShowOnMap = () => {
    if (eventDetails?.latitude && eventDetails?.longitude) {
      const url = `https://www.google.com/maps?q=${eventDetails.latitude},${eventDetails.longitude}`;
      redirectionHandler({ url });
    }
  };

  const handleImageCreditDisplay = () => {
    setCreditDisplayFlag(!creditDisplayFlag);
    setShowFullImageCreditDescription(false);
  };

  const ShowMoreTrigger = (setFlag, flag) => {
    return (
      <Button
        size="sm"
        ml="auto"
        p={1}
        variant="link"
        className="show-more-trigger"
        onClick={() => {
          setFlag(!flag);
        }}
      >
        <Text textDecoration="none" color="var(--dynamic-color-700)" mr={1}>
          {t(flag ? 'showLess' : 'loadMore')}
        </Text>
        <Box h={4} w={4} className="show-more-trigger-icon-container">
          {flag ? (
            <ChevronUpIcon height="15px" width="15px" />
          ) : (
            <ChevronDownIcon height="15px" width="15px" />
          )}
        </Box>
      </Button>
    );
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} portalProps={{ containerRef }}>
      <ModalOverlay />
      <ModalContent className="calendar-widget-details-modal">
        <Box className="close-button-wrapper">
          <ModalCloseButton />
        </Box>
        {eventDetails?.imageCredit && (
          <IconButton
            className="image-credit-info-icon"
            icon={<InformationCircle />}
            isRound="true"
            onClick={handleImageCreditDisplay}
          />
        )}
        <ModalBody style={{ overflowY: 'auto', margin: '0px', padding: '0px', height: '100%' }}>
          {loading ? (
            <div className="loader-wrapper">
              <Loader />
            </div>
          ) : (
            <Box style={{ paddingBottom: '1rem', height: '100%' }}>
              <Image
                onClick={(e) => {
                  e.stopPropagation();
                  setCreditDisplayFlag(false);
                  setShowFullImageCreditDescription(false);
                }}
                src={eventDetails?.image}
                width="100%"
              />
              <Stack
                className="event-information-section-wrapper"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  borderTopLeftRadius: creditDisplayFlag ? '0' : '54px',
                  borderTopRightRadius: creditDisplayFlag ? '0' : '54px',
                  transition: 'margin-top 0.5s ease-in-out, border-radius 0.5s ease-in-out',
                  marginTop: creditDisplayFlag ? '0' : '-50px',
                  width: '100%',
                  zIndex: 1,
                  height: '100%',
                  maxHeight: '100%',
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  backgroundColor: 'var(--primary-white-opaque)',
                  boxShadow: '0px 4px 6px #00000029',
                  position: 'relative',
                }}
              >
                <Flex style={{ paddingTop: '0.5rem' }}>
                  <Box className={creditDisplayFlag && 'image-description-display-icon-wrapper'}>
                    <InformationCircle
                      className={
                        creditDisplayFlag
                          ? 'image-description-info-icon'
                          : 'image-description-info-icon-hidden'
                      }
                      style={{
                        opacity: creditDisplayFlag ? 1 : 0,
                        pointerEvents: creditDisplayFlag ? 'auto' : 'none',
                      }}
                    />
                  </Box>
                  <Flex
                    direction="column"
                    style={{
                      opacity: creditDisplayFlag ? 1 : 0,
                      overflow: 'hidden',
                      maxHeight: creditDisplayFlag ? '110px' : '0px',
                      transition: 'all 0.4s ease-in-out, opacity 0.3s ease-in-out',
                    }}
                    className="image-credit"
                  >
                    <Text
                      style={{ fontSize: '12px', fontWeight: 400, color: 'var(--secondary-black)' }}
                    >
                      {eventDetails?.imageCredit?.caption}
                    </Text>
                    <Text
                      className={`clamped-text-img-credit ${
                        showFullImageCreditDescription ? 'expanded' : ''
                      }`}
                    >
                      {cleanDescription(eventDetails?.imageCredit?.description)}
                    </Text>
                    {ShowMoreTrigger(
                      setShowFullImageCreditDescription,
                      showFullImageCreditDescription,
                    )}
                  </Flex>
                </Flex>
                <ModalHeader
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    lineHeight: '29.26px',
                    textAlign: 'left',
                    paddingLeft: 0,
                    paddingBottom: 0,
                    textUnderlinePosition: 'from-font',
                    textDecorationSkipInk: 'none',
                  }}
                >
                  {eventDetails?.title}
                </ModalHeader>
                <Box>
                  <Box>
                    <Flex direction="column" gap={2}>
                      <Text
                        onClick={() => {
                          setShowFullDescription(!showFullDescription);
                        }}
                        style={{
                          maxHeight: showFullDescription ? '1000px' : '84px',
                          transition: 'max-height 0.3s ease-in-out',
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '21.14px',
                          color: 'var(--secondary-black)',
                          textAlign: 'left',
                          overflow: 'hidden',
                        }}
                        className={`clamped-text-description ${
                          showFullDescription ? 'expanded' : ''
                        }`}
                      >
                        {cleanDescription(eventDetails?.description)}
                      </Text>
                      {ShowMoreTrigger(setShowFullDescription, showFullDescription)}
                    </Flex>
                  </Box>
                  <Stack spacing={4}>
                    <Stack direction="row" flexWrap="wrap" spacing={2}>
                      {eventDetails?.eventTypes?.map((type) => (
                        <EventTypeBadge key={type} eventType={type} />
                      ))}
                    </Stack>
                    <Flex className="event-container">
                      <Flex className="event-date">
                        <Icon as={calendaricon} className="event-icon" />
                        <DateBadge
                          startDate={dateRangeFormatter(eventDetails?.startDate)}
                          className="event-date-badge"
                        />
                      </Flex>

                      <Flex className="event-location">
                        <Icon as={StageIcon} className="event-icon" />
                        <Flex className="event-location-details">
                          <Text className="event-place">{eventDetails?.place}</Text>
                          <Text className="event-address">{eventDetails?.streetAddress}</Text>
                          <Button className="event-map-button" onClick={handleShowOnMap}>
                            Show on map
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EventDetailsModal;
