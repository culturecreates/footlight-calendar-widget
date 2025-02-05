import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import WidgetContext from '../../context/WidgetContext';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { ReactComponent as ClearIcon } from '../../assets/closeCircle.svg';
import FloatingDatePicker from '../FloatingDatePicker/FloatingDatePicker';
import { ReactComponent as FilterIcon } from '../../assets/filter.svg';

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
      justifyContent="center"
      alignItems="center"
      maxW="428px"
      w="100%"
      p="16px 24px"
      mx="auto"
      gap={2}
      boxShadow="var(--primary-box-shadow)"
    >
      <Box borderRadius="full" _hover={{ bg: 'var(--primary-hover-white)' }}>
        <FilterIcon />
      </Box>
      <InputGroup flex={1} maxW="272px" w="100%" position="relative" h="40px">
        <InputLeftElement pointerEvents="none" left="10px" top="50%" transform="translateY(-50%)">
          <SearchIcon width="24px" height="24px" />
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
          border="1px solid #b6c1c9"
          borderRadius="68px"
          fontFamily="var(--calendar-font-family)"
          fontSize="var(--secondary-font-weight)"
          fontWeight={40}
          lineHeight="24px"
          textAlign="left"
        />
        {searchKeyWord && (
          <InputRightElement top="50%" right="10px" transform="translateY(-50%)">
            <IconButton
              aria-label="Clear search"
              icon={<ClearIcon width="21px" height="21px" />}
              onClick={clearSearch}
              variant="ghost"
              _hover={{ background: 'transparent' }}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <FloatingDatePicker />
    </Box>
  );
};

export default Search;
