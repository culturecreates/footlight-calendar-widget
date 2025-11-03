import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';

const LoadingCard = ({ count = 1, styles = {} }) => {
  const { wrapper = {}, skeleton = {}, skeletonText = {} } = styles;
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Box
          key={i}
          className="skeleton-card-wrapper"
          style={{
            ...wrapper,
          }}
        >
          <Skeleton style={{ height: '150px', borderRadius: 'md', ...skeleton }} />
          <SkeletonText style={{ marginTop: '16px', ...skeletonText }} noOfLines={2} spacing={3} />
          <Skeleton style={{ height: '40px', marginTop: '16px', borderRadius: 'md' }} />
        </Box>
      ))}
    </>
  );
};

export default LoadingCard;
