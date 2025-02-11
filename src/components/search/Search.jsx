/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Input, IconButton } from '@chakra-ui/react';
import WidgetContext from '../../context/WidgetContext';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { ReactComponent as ClearIcon } from '../../assets/closeCircle.svg';
import FloatingDatePicker from '../FloatingDatePicker/FloatingDatePicker';
import FilterSection from '../filterPanel/FilterPanel';

const Search = () => {
  const { t } = useTranslation();
  const { setSearchKeyWord, searchKeyWord, indexedSessionStorageVariableNames } =
    useContext(WidgetContext);
  const clearSearch = () => {
    setSearchKeyWord('');
    sessionStorage.setItem(indexedSessionStorageVariableNames.WidgetSearchKeyWord, '');
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      maxW="690px"
      w="100%"
      p="16px"
      mx="auto"
      gap={2}
      boxShadow={{ base: 'var(--primary-box-shadow)', md: 'none' }}
      className="filter-search-section"
    >
      <FilterSection />
      {/* <InputGroup flex={1} w="100%" position="relative" h="40px">
        <InputLeftElement pointerEvents="none" left="10px" top="50%" transform="translateY(-50%)">
          <SearchIcon className="search-icon" width="24px" height="24px" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder={t('search.placeholder')}
          autoComplete="new-password"
          value={searchKeyWord}
          onChange={(e) => {
            setSearchKeyWord(e.target.value);
            sessionStorage.setItem(
              indexedSessionStorageVariableNames.WidgetSearchKeyWord,
              e.target.value,
            );
          }}
          h="40px"
          pl="44px"
          borderRadius="68px"
          fontFamily="var(--calendar-font-family)"
          fontSize="var(--secondary-font-weight)"
          fontWeight={40}
          bgColor="var(--dynamic-color-50)"
          lineHeight="24px"
          textAlign="left"
          _focusVisible={{ borderColor: 'var(--dynamic-color-500)' }}
        />
        {searchKeyWord && (
          <InputRightElement top="50%" right="10px" transform="translateY(-50%)">
            <IconButton
              aria-label="Clear search"
              className="clear-search-icon"
              icon={<ClearIcon width="21px" height="21px" />}
              onClick={clearSearch}
              variant="ghost"
              _hover={{ background: 'transparent' }}
            />
          </InputRightElement>
        )}
      </InputGroup> */}
      <FloatingDatePicker />
    </Box>
  );
};

export default Search;
