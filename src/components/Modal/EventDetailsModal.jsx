import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Box,
  Text,
  Image,
  Heading,
  Divider,
} from '@chakra-ui/react';
import './eventDetailsModal.css';

const EventDetailsModal = ({
  isOpen,
  onClose,
  name,
  place,
  image,
  date,
  performers,
  description,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />

      <ModalContent
        maxW="800px"
        maxH="600px"
        boxShadow="0 4px 10px rgba(0, 0, 0, 0.25)"
        borderRadius="12px"
        overflow="hidden"
      >
        <Box display="flex" height="60%" className="event-details-modal-top-section">
          <Box
            flex="1"
            maxW="40%"
            overflow="hidden"
            minH="150px"
            className="event-details-modal-image-wrapper"
          >
            <Image src={image} alt={name} objectFit="cover" h="100%" w="100%" />
          </Box>
          <Box
            flex="1"
            p="16px"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Heading fontSize="2xl" textAlign="center">
              {name}
            </Heading>
          </Box>
        </Box>

        <Box bg="white" p="30px" display="flex" gap="30px" flex="1">
          <Box
            bg="gray.100"
            borderRadius="8px"
            p="16px"
            flex=".7"
            display="flex"
            flexDirection="column"
            gap="8px"
          >
            <Text fontSize="md">
              <strong>Date:</strong> {date}
            </Text>
            <Divider borderColor="gray.300" />
            <Text fontSize="md">
              <strong>Place:</strong> {place}
            </Text>
            <Divider borderColor="gray.300" />
            {performers?.length > 0 && (
              <>
                <Text fontSize="md">
                  <strong>Performers:</strong>
                </Text>
                <Box>
                  {performers.map((performer, index) => (
                    <Text key={index} fontSize="md">
                      {performer}
                    </Text>
                  ))}
                </Box>
              </>
            )}
          </Box>

          <Box flex="2" borderRadius="8px" p="16px">
            <Box
              as="p"
              fontSize="md"
              color="gray.700"
              overflowY="auto"
              maxHeight="200px"
              whiteSpace="pre-wrap"
              lineHeight="1.5"
            >
              {description}
            </Box>
          </Box>
        </Box>

        <ModalCloseButton border="none" outline="none" />
      </ModalContent>
    </Modal>
  );
};

export default EventDetailsModal;
