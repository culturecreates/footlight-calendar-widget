import { HStack, VStack, Text, Image, Link } from '@chakra-ui/react';
import React from 'react';

function PresenterCard({ name, website, image }) {
  return (
    <HStack spacing={3} mt={2}>
      <Image src={image} alt={name} borderRadius="50px" boxSize="46px" />
      <VStack align="start" spacing={1}>
        <Text
          fontSize="var(--presenter-font-size)"
          fontWeight="var(--presenter-font-weight)"
          color="var(--secondary-black)"
          margin={'0px'}
        >
          {name}
        </Text>
        {website?.trim() && (
          <Link
            href={website}
            color="var(--presenter-link-color)"
            isExternal
            fontSize="var(--presenter-link-size)"
            fontWeight="var(--presenter-link-weight)"
          >
            {website}
          </Link>
        )}
      </VStack>
    </HStack>
  );
}

export default PresenterCard;
