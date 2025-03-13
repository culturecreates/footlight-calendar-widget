import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';

const LoadingCard = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Box
          key={i}
          style={{
            width: '100%',
            padding: '16px',
            boxShadow: 'var(--primary-box-shadow)',
            borderRadius: 'lg',
            backgroundColor: 'var(--primary-white-opaque)',
          }}
        >
          <Skeleton style={{ height: '150px', borderRadius: 'md' }} />
          <SkeletonText style={{ marginTop: '16px' }} noOfLines={2} spacing={3} />
          <Skeleton style={{ height: '40px', marginTop: '16px', borderRadius: 'md' }} />
        </Box>
      ))}
    </>
  );
};

export default LoadingCard;
