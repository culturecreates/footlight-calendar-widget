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
import { ReactComponent as ShareIcon } from '../../assets/share.svg';
import { ReactComponent as InformationCircle } from '../../assets/informationCircle.svg';
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
import ImageGalleryCarousel from '../carousel/ImageGallery/ImageGalleryCarousel';
import VideoIframe from '../card/VideoCard/VideoIframe';
import SocialMediaPopup from '../sharePopup/SharePopup';
import RelatedEventsCard from '../card/RelatedEventsCard/RelatedEventsCard';

const EventDetailsModal = ({ isOpen, onClose, eventId }) => {
  const { widgetProps, setError } = useContext(WidgetContext);
  const { locale, calendar } = widgetProps;

  const { t } = useTranslation();

  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [creditDisplayFlag, setCreditDisplayFlag] = useState(false);
  const [showFullImageCreditDescription, setShowFullImageCreditDescription] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const containerRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageCreditRef = useRef(null);

  let relatedPerformersIds = [];

  useEffect(() => {
    if (!eventDetails) return;
    eventDetails?.performers?.forEach((element) => {
      relatedPerformersIds.push(element.id);
    });
  }, [eventDetails]);

  useEffect(() => {
    if (!eventId || !isOpen) return;

    const fetchEventDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}events/${eventId}`);
        if (!response.ok) {
          setError(true);
        }

        const data = await response.json();
        const eventDetails = transformData({ data: [data?.data || []], locale })[0];

        setEventDetails(eventDetails || {});
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId, isOpen]);

  useEffect(() => {
    containerRef.current = document.getElementById('calendar-widget');
  }, []);

  const getFormattedAddress = ({ street, locality, region, postalCode, country }) => {
    const parts = [street, locality, region, postalCode, country].filter(Boolean);
    return parts.length ? parts.join(', ') : null;
  };

  const getGoogleMapsUrl = ({ latitude, longitude, formattedAddress, fallbackUrl }) => {
    if (latitude && longitude) {
      return formattedAddress
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`
        : `https://www.google.com/maps?q=${latitude},${longitude}`;
    }
    return fallbackUrl;
  };

  const handleShowOnMap = () => {
    const formattedAddress = getFormattedAddress({
      street: eventDetails.streetAddress,
      locality: eventDetails.place,
      region: eventDetails.addressRegion,
      postalCode: eventDetails.postalCode,
      country: eventDetails.addressCountry,
    });

    const googleMapsUrl = getGoogleMapsUrl({
      latitude: eventDetails.latitude,
      longitude: eventDetails.longitude,
      formattedAddress,
      fallbackUrl: eventDetails.mapUrl,
    });

    redirectionHandler({ url: googleMapsUrl });
  };

  const handleImageCreditDisplay = () => {
    setCreditDisplayFlag(!creditDisplayFlag);
    setShowFullImageCreditDescription(false);
  };

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
                  alt={eventDetails?.imageCredit?.description || ''}
                  src={eventDetails?.image?.large}
                  width="100%"
                />
              </Box>
              <Box
                position="relative"
                style={{
                  marginLeft: 'auto',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <SocialMediaPopup
                  styles={{ zIndex: 5, right: '48px', top: '-16px' }}
                  eventId={eventId}
                >
                  <Icon
                    className="share-detail-icon"
                    as={ShareIcon}
                    style={{
                      color: '#000000',
                      cursor: 'pointer',
                      width: '63px',
                      height: '63px',
                      borderRadius: '50%',
                      transition:
                        'top 0.8s cubic-bezier(0.25, 1, 0.5, 1), border-radius 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                      top: creditDisplayFlag ? '-39px' : '-78px',
                    }}
                  />
                </SocialMediaPopup>
              </Box>
              <Stack
                className="event-information-section-wrapper"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  borderTopLeftRadius: creditDisplayFlag ? '0' : '54px',
                  borderTopRightRadius: creditDisplayFlag ? '0' : '54px',
                  transition:
                    'margin-top 0.8s cubic-bezier(0.25, 1, 0.5, 1), border-radius 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                  marginTop: creditDisplayFlag ? '0' : '-50px',
                  width: '100%',
                  zIndex: 1,
                  height: 'auto',
                  maxHeight: 'fit-content',
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  backgroundColor: 'var(--primary-white-opaque)',
                  boxShadow: '0px 4px 6px #00000029',
                  position: 'relative',
                  overflowY: 'visible',
                }}
              >
                <Flex style={{ paddingTop: '0.5rem' }}>
                  <Flex
                    direction="column"
                    style={{
                      opacity: creditDisplayFlag ? 1 : 0,
                      overflow: 'auto',
                      width: '100%',
                      maxHeight: creditDisplayFlag ? '110px' : '0px',
                      transition:
                        'all 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                    }}
                    className="image-credit"
                  >
                    {eventDetails?.imageCredit?.creditText && (
                      <Text
                        style={{
                          fontSize: '12px',
                          marginLeft: '24px',
                          maxWidth: 'calc(100% - 90px)',
                          fontWeight: 400,
                          marginBottom: '0.5rem',
                          color: 'var(--secondary-black)',
                        }}
                      >
                        {eventDetails?.imageCredit?.creditText}
                      </Text>
                    )}
                    {eventDetails?.imageCredit?.caption && (
                      <Flex style={{ maxWidth: 'calc(100% - 90px)' }}>
                        <Box
                          className={creditDisplayFlag && 'image-description-display-icon-wrapper'}
                        >
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
                        <Box
                          className={`clamped-text-img-credit ${
                            showFullImageCreditDescription ? 'expanded' : ''
                          }`}
                          ref={imageCreditRef}
                          dangerouslySetInnerHTML={{
                            __html: eventDetails?.imageCredit?.caption || '',
                          }}
                        />
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
                      </Flex>
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
                      <Box
                        ref={descriptionRef}
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        style={{
                          maxHeight: showFullDescription ? '1000px' : '84px',
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
                        dangerouslySetInnerHTML={{
                          __html: eventDetails?.description || '',
                        }}
                      />
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
                            scheduleTimezone: eventDetails?.scheduleTimezone,
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
                        image={performer?.image}
                        name={performer?.name}
                        website={performer?.website}
                        occupation={performer?.occupation}
                        locale={locale}
                        description={performer?.description}
                        socialLinks={performer?.socialMediaLinks}
                        calendar={calendar}
                        eventId={eventId}
                      />
                    ))}
                  </Stack>
                )}
                {eventDetails?.video?.embedUrl && (
                  <Box style={{ marginTop: '1rem' }}>
                    <Stack>
                      {eventDetails?.video?.embedUrl && (
                        <VideoIframe url={eventDetails?.video?.embedUrl} />
                      )}
                    </Stack>
                  </Box>
                )}

                {eventDetails?.imageGallery?.length > 0 && (
                  <Box style={{ marginTop: '1rem' }}>
                    <Stack>
                      <ImageGalleryCarousel
                        images={eventDetails?.imageGallery?.map((image) => {
                          return {
                            src: image?.thumbnail,
                            alt:
                              image?.description?.[locale] ||
                              image?.description?.en ||
                              image?.description?.fr ||
                              Object.values(image?.description ?? {}).find((val) => val) ||
                              '@none',
                          };
                        })}
                      />
                    </Stack>
                  </Box>
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
                          name={organizer?.name}
                          website={organizer?.website}
                          image={organizer?.image}
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
                {eventDetails?.mapUrl && (
                  <Box style={{ marginTop: '1rem', width: '100%' }}>
                    <Heading as="h3" className="section-headings">
                      {t('detailsModal.eventLocation')}
                    </Heading>
                    <Box style={{ marginTop: '0.5rem' }}>
                      <MapComponent
                        mapUrl={eventDetails?.mapUrl}
                        latitude={eventDetails?.latitude}
                        longitude={eventDetails?.longitude}
                        country={eventDetails?.addressCountry}
                        region={eventDetails?.addressRegion}
                        postalCode={eventDetails?.postalCode}
                        locality={eventDetails?.place}
                        street={eventDetails?.streetAddress}
                        getFormattedAddress={getFormattedAddress}
                        getGoogleMapsUrl={getGoogleMapsUrl}
                      />
                    </Box>
                  </Box>
                )}

                <Box style={{ marginTop: '1rem', width: '100%' }}>
                  <Heading as="h3" className="section-headings">
                    {t('detailsModal.alsoPlaying')}
                  </Heading>
                  <RelatedEventsCard
                    dependencyIds={relatedPerformersIds}
                    relationType="performerRelatedEvents"
                    relationParam="performer"
                  />
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
