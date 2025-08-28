import React, { useContext } from 'react';
import WidgetContext from '../../context/WidgetContext';
import NoResult from '../noResult/NoResult';
import ResultHeader from '../resultHeader/ResultHeader';
import Results from '../results/Results';
import './panel.css';
import { Box } from '@chakra-ui/react';
import ServerError from '../error/ServerError/ServerError';
import LoadingCard from '../card/LoadingCard/LoadingCard';

const ResultPanel = () => {
  const { totalCount, isLoading, error, widgetProps } = useContext(WidgetContext);
  if (error) return <ServerError />;
  return (
    <Box className="result-panel-wrapper">
      <ResultHeader />

      <Box className="result-panel" p={4}>
        {!isLoading ? (
          <Box className="results">{totalCount > 0 ? <Results /> : <NoResult />}</Box>
        ) : (
          <Box
            className="loader-wrapper"
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              minHeight: '100px',
              height: '100%',
              gap: '8px',
              flex: '1 1 0%',
              padding: '0px 24px',
            }}
          >
            <div>
              <LoadingCard count={widgetProps?.limit || 5} />
            </div>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ResultPanel;
