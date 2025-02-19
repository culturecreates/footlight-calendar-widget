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
  Heading,
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
import DateBadge from '../badge/DateBadge/DateBadge';
import { dateRangeFormatter } from '../../utils/dateRangeFormatter';
import Loader from '../loader/Loader';
import ShowMoreTrigger from '../showMoreTrigger/ShowMoreTrigger';
import PerformerCard from '../card/PerformerCard/PerformerCard';
import PresenterCard from '../card/PresenterCard/PresenterCard';
import SponsorsCarousel from '../carousel/Sponsor/SponsorCarousel';
import MapComponent from '../googleMap/MapComponent';

const EventDetailsModal = ({ isOpen, onClose, eventId, scheduleTimezone }) => {
  const { widgetProps } = useContext(WidgetContext);
  const { locale } = widgetProps;

  const { t } = useTranslation();

  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [creditDisplayFlag, setCreditDisplayFlag] = useState(false);
  const [showFullImageCreditDescription, setShowFullImageCreditDescription] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const containerRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageCreditRef = useRef(null);

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
    const url = `https://www.google.com/maps?q=${eventDetails.latitude},${eventDetails.longitude}`;
    redirectionHandler({ url });
  };

  const handleImageCreditDisplay = () => {
    setCreditDisplayFlag(!creditDisplayFlag);
    setShowFullImageCreditDescription(false);
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
              <Box className="sticky-image-wrapper" style={{ position: 'sticky', top: 0 }}>
                <Image
                  onClick={(e) => {
                    e.stopPropagation();
                    if (eventDetails?.imageCredit) {
                      setCreditDisplayFlag(!creditDisplayFlag);
                      setShowFullImageCreditDescription(!showFullImageCreditDescription);
                    }
                  }}
                  src={eventDetails?.image?.large}
                  width="100%"
                />
              </Box>
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
                  overflowY: 'auto',
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
                    {eventDetails?.imageCredit?.creditText && (
                      <Text
                        style={{
                          fontSize: '12px',
                          fontWeight: 400,
                          color: 'var(--secondary-black)',
                        }}
                      >
                        {eventDetails?.imageCredit?.creditText}
                      </Text>
                    )}
                    {eventDetails?.imageCredit?.caption && (
                      <>
                        <Text
                          className={`clamped-text-img-credit ${
                            showFullImageCreditDescription ? 'expanded' : ''
                          }`}
                          ref={imageCreditRef}
                        >
                          {cleanDescription(eventDetails?.imageCredit?.caption)}
                        </Text>
                        <ShowMoreTrigger
                          setFlag={setShowFullImageCreditDescription}
                          flag={showFullImageCreditDescription}
                          handleShowMoreButtonState={(status) =>
                            setShowMoreButton({ ...showMoreButton, imageCredit: status })
                          }
                          ref={imageCreditRef}
                          containerData={eventDetails?.imageCredit?.caption}
                          showMoreDisplayStatus={showMoreButton?.imageCredit}
                        />
                      </>
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
                        ref={descriptionRef}
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
                          cursor: 'pointer',
                        }}
                        className={`clamped-text-description ${
                          showFullDescription ? 'expanded' : ''
                        }`}
                      >
                        {cleanDescription(eventDetails?.description)}
                      </Text>
                      <ShowMoreTrigger
                        setFlag={setShowFullDescription}
                        flag={showFullDescription}
                        handleShowMoreButtonState={(status) =>
                          setShowMoreButton({ ...showMoreButton, description: status })
                        }
                        ref={descriptionRef}
                        containerData={eventDetails?.description}
                        showMoreDisplayStatus={showMoreButton?.description}
                      />
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
                          startDate={dateRangeFormatter({
                            startDate: eventDetails?.startDate,
                            scheduleTimezone,
                          })}
                          color="var(--primary-black)"
                          bgcolor="transparent"
                        />
                      </Flex>

                      <Flex className="event-location">
                        <Icon as={StageIcon} className="event-icon" />
                        <Flex className="event-location-details">
                          <Text className="event-place">{eventDetails?.place}</Text>
                          <Text className="event-address">{eventDetails?.streetAddress}</Text>
                          {eventDetails?.latitude && eventDetails?.longitude && (
                            <Button className="event-map-button" onClick={handleShowOnMap}>
                              {t('detailsModal.showOnMap')}
                            </Button>
                          )}
                        </Flex>
                      </Flex>
                    </Flex>
                  </Stack>
                </Box>
                {eventDetails?.performers?.length && (
                  <Stack>
                    {eventDetails?.performers?.map((performer, index) => (
                      <PerformerCard
                        key={index}
                        image={performer?.image?.thumbnail}
                        name={performer?.name}
                        website={performer?.website}
                        type={performer?.type}
                        description={performer?.description}
                        socialLinks={performer?.socialMediaLinks}
                      />
                    ))}
                  </Stack>
                )}
                {eventDetails?.organizers?.length && (
                  <Box style={{ marginTop: '1rem' }}>
                    <Heading as="h3" className="section-headings">
                      {eventDetails?.organizers?.length > 1
                        ? t('detailsModal.presenters')
                        : t('detailsModal.presenter')}
                    </Heading>
                    <Stack>
                      {eventDetails?.organizers.map((organizer, index) => (
                        <PresenterCard
                          key={index}
                          name={organizer.name}
                          website={organizer.website}
                          image={organizer.logo}
                        />
                      ))}
                    </Stack>
                  </Box>
                )}
                {eventDetails?.sponsor?.length && (
                  <Box style={{ marginTop: '1rem' }}>
                    <Heading as="h3" className="section-headings">
                      {eventDetails?.sponsor?.length > 1
                        ? t('detailsModal.sponsors')
                        : t('detailsModal.sponsor')}
                    </Heading>
                    <SponsorsCarousel sponsors={eventDetails?.sponsor} />
                  </Box>
                )}
                <Box style={{ marginTop: '1rem', width: '100%', height: '248px' }}>
                  <Heading as="h3" className="section-headings">
                    {t('detailsModal.eventLocation')}
                  </Heading>
                  <Box style={{ marginTop: '0.5rem' }}>
                    <MapComponent
                      mapUrl={eventDetails?.mapUrl}
                      latitude={eventDetails?.latitude}
                      longitude={eventDetails?.longitude}
                    />
                  </Box>
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
