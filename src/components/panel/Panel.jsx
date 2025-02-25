import React, { useContext } from 'react';
import WidgetContext from '../../context/WidgetContext';
import Loader from '../loader/Loader';
import NoResult from '../noResult/NoResult';
import ResultHeader from '../resultHeader/ResultHeader';
import Results from '../results/Results';
import './panel.css';
import { Box } from '@chakra-ui/react';
import ServerError from '../error/ServerError/ServerError';

const ResultPanel = () => {
  const { totalCount, isLoading, error } = useContext(WidgetContext);
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
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
            <Loader />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ResultPanel;
