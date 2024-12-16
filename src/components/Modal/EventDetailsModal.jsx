import React, { useContext } from 'react';
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
import WidgetContext from '../../context/WidgetContext';

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
  const { widgetProps } = useContext(WidgetContext);
  const { height = '600' } = widgetProps;

  const iframeAdjustedHeight = window.innerHeight * 0.8;
  const modalHeight = height ? Math.min(height * 0.8, iframeAdjustedHeight) : iframeAdjustedHeight;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />

      <ModalContent
        maxW={['95%', '80%']}
        height={modalHeight + 'px'}
        boxShadow="0 4px 10px rgba(0, 0, 0, 0.25)"
        borderRadius="12px"
        overflow="hidden"
      >
        <Box
          display="flex"
          height={['38%', '40%']}
          flexDirection={['column', 'row']}
          className="event-details-modal-top-section"
        >
          <Box
            flex="1"
            maxW={['100%', '40%']}
            overflow="hidden"
            minH={['70%', '150px']}
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
            <Heading fontSize={['lg', '2xl']} textAlign="center">
              {name}
            </Heading>
          </Box>
        </Box>

        <Box
          bg="white"
          display="flex"
          gap={['0', '30px']}
          flex="1"
          height={['62%', '60%']}
          overflowY="scroll"
          flexDirection={['column', 'row']}
        >
          <Box
            bg="gray.100"
            borderRadius="8px"
            p="16px"
            flex=".7"
            display="flex"
            m={['20px', '30px 0 30px 30px']}
            flexDirection="column"
            gap="8px"
            height="fit-content"
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

          <Box flex="2" borderRadius="8px">
            <Box
              as="p"
              fontSize="md"
              color="gray.700"
              whiteSpace="pre-wrap"
              lineHeight="1.5"
              pt={[0, 30]}
              px={30}
              pb={30}
            >
              {description + 'lorem ipsum'.repeat(100)}
            </Box>
          </Box>
        </Box>

        <ModalCloseButton
          border="none"
          outline="none"
          color="white"
          _hover={{ bg: 'transparent' }}
          _focus={{ boxShadow: 'none' }}
        />
      </ModalContent>
    </Modal>
  );
};

export default EventDetailsModal;
