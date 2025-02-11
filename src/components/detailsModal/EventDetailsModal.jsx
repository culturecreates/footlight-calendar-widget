import React, { useContext, useEffect, useState } from 'react';
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
  Spinner,
  Box,
} from '@chakra-ui/react';
import WidgetContext from '../../context/WidgetContext';
import { transformData } from '../../utils/transformData';
import './eventDetailsModal.css';

const EventDetailsModal = ({ isOpen, onClose, eventId }) => {
  const { widgetProps } = useContext(WidgetContext);
  const { locale } = widgetProps;

  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

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
        const eventDetails = transformData({ data: [data?.data || []], locale });

        setEventDetails(eventDetails[0] || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId, isOpen]);

  useEffect(() => {
    console.log(eventDetails);
  }, [eventDetails]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent m={0} height="100%">
        <ModalCloseButton zIndex={2} />
        <div
          style={{
            background: `url(${eventDetails?.image}) no-repeat center center/cover`,
            height: '250px',
            width: '100%',
            position: 'relative',
          }}
        />
        <ModalBody overflowY="auto" m={0} p={0} height="100%">
          {loading ? (
            <Spinner size="xl" />
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : (
            <Box borderTopRadius="54px" mt={-7} width="100%" zIndex={1} height="100%">
              <Stack spacing={3}>
                <ModalHeader
                  fontSize="24px"
                  fontWeight="700"
                  lineHeight="29.26px"
                  textAlign="left"
                  textUnderlinePosition="from-font"
                  textDecorationSkipInk="none"
                  mt={7}
                >
                  {eventDetails?.title}
                </ModalHeader>
                <Box>
                  <Text fontWeight="bold">Event Date:</Text>
                  <Text>{eventDetails?.startDate || 'N/A'}</Text>
                  <Text fontWeight="bold">Stage:</Text>
                  <Text>{eventDetails?.stageName || 'N/A'}</Text>
                  <Text fontWeight="bold">Description:</Text>
                  <Text>
                    {showFullDescription
                      ? eventDetails?.description
                      : `${eventDetails?.description?.split(' ').slice(0, 50).join(' ')}...`}
                  </Text>
                  <Button
                    size="sm"
                    variant="link"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? 'Show Less' : 'Show More'}
                  </Button>
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
