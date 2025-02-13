import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '690px',
        width: '100%',
        padding: '16px',
        margin: '0 auto',
        gap: '8px',
        boxShadow: 'var(--primary-box-shadow)',
      }}
      className="filter-search-section"
    >
      <FilterSection />
      <InputGroup
        style={{ display: 'flex', flex: 1, width: '100%', position: 'relative', height: '40px' }}
      >
        <InputLeftElement
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
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
          style={{
            height: '40px',
            paddingLeft: '44px',
            borderRadius: '68px',
            fontFamily: 'var(--calendar-font-family)',
            fontSize: 'var(--secondary-font-weight)',
            fontWeight: 40,
            backgroundColor: 'var(--dynamic-color-50)',
            lineHeight: '24px',
            textAlign: 'left',
            width: '100%',
            border: '1px solid transparent',
            outline: 'none',
            transitionProperty: 'var(--chakra-transition-property-common)',
            transitionDuration: 'var(--chakra-transition-duration-normal)',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--dynamic-color-500)')}
          onBlur={(e) => (e.target.style.borderColor = 'transparent')}
        />

        {searchKeyWord && (
          <InputRightElement
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
            }}
          >
            <IconButton
              aria-label="Clear search"
              className="clear-search-icon"
              icon={<ClearIcon width="21px" height="21px" />}
              onClick={clearSearch}
              variant="ghost"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              onMouseOver={(e) => (e.target.style.background = 'transparent')}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <FloatingDatePicker />
    </div>
  );
};

export default Search;
