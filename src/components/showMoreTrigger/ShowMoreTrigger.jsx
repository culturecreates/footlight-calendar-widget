import { Box, Button, Text } from '@chakra-ui/react';
import React, { useEffect, forwardRef } from 'react';
import { ReactComponent as ChevronDownIcon } from '../../assets/arrowDown.svg';
import { ReactComponent as ChevronUpIcon } from '../../assets/upChevron.svg';
import { useTranslation } from 'react-i18next';

const ShowMoreTrigger = forwardRef(
  ({ setFlag, flag, handleShowMoreButtonState, containerData, showMoreDisplayStatus }, ref) => {
    const { t } = useTranslation();

    useEffect(() => {
      if (ref?.current) {
        const lineHeight = parseInt(window.getComputedStyle(ref.current).lineHeight, 10);
        const maxHeight = lineHeight * 4 + 1;

        if (ref.current.scrollHeight > maxHeight) {
          handleShowMoreButtonState(true);
        } else {
          handleShowMoreButtonState(false);
        }
      }
    }, [containerData]);

    return (
      showMoreDisplayStatus && (
        <Button
          size="sm"
          style={{
            marginLeft: 'auto',
            padding: '4px',
            variant: 'link',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            marginBottom: '0px',
            alignItems: 'center',
            color: 'var(--main-dynamic-color)',
          }}
          onClick={() => setFlag(!flag)}
          className="show-more-trigger"
        >
          <Text
            style={{
              textDecoration: 'none',
              color: 'var(--main-dynamic-color)',
              marginRight: '4px',
            }}
          >
            {t(flag ? 'showLess' : 'loadMore')}
          </Text>
          <Box
            style={{
              height: '16px',
              width: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="show-more-trigger-icon-container"
          >
            {flag ? (
              <ChevronUpIcon style={{ height: '15px', width: '15px' }} />
            ) : (
              <ChevronDownIcon style={{ height: '15px', width: '15px' }} />
            )}
          </Box>
        </Button>
      )
    );
  },
);

ShowMoreTrigger.displayName = 'ShowMoreTrigger';

export default ShowMoreTrigger;
