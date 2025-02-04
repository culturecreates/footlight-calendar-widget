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
import { ReactComponent as SearchIcon } from '../../assets/Search.svg';
import { ReactComponent as ClearIcon } from '../../assets/close-Circle.svg';
import FloatingDatePicker from '../FloatingDatePicker/FloatingDatePicker';
import { ReactComponent as FilterIcon } from '../../assets/filter.svg';
import './search.css';

const Search = () => {
  const { t } = useTranslation();
  const { setSearchKeyWord, searchKeyWord, indexedSessionStorageVariableNames } =
    useContext(WidgetContext);

  const clearSearch = () => {
    setSearchKeyWord('');
    sessionStorage.setItem(indexedSessionStorageVariableNames.WidgetSearchKeyWord, '');
  };

  return (
    <Box display="flex" alignItems="center" gap={2} className="filter-search-container">
      <Box>
        <FilterIcon className="filter-icon" />
      </Box>
      <InputGroup
        width="auto"
        sx={{
          maxWidth: 272,
          flex: 1,
        }}
      >
        <InputLeftElement pointerEvents="none">
          <SearchIcon className="search-icon" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder={t('search.placeholder')}
          className="widget-search-bar"
          autoComplete="new-password"
          value={searchKeyWord}
          onChange={(e) => {
            setSearchKeyWord(e.target.value);
            sessionStorage.setItem(
              indexedSessionStorageVariableNames.WidgetSearchKeyWord,
              e.target.value,
            );
          }}
        />
        {searchKeyWord && (
          <InputRightElement>
            <IconButton
              aria-label="Clear search"
              icon={<ClearIcon className="clear-icon" />}
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
