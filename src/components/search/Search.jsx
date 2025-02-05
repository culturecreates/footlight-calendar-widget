import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Button,
} from '@chakra-ui/react';
import WidgetContext from '../../context/WidgetContext';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { ReactComponent as ClearIcon } from '../../assets/closeCircle.svg';
import FloatingDatePicker from '../FloatingDatePicker/FloatingDatePicker';
import { ReactComponent as FilterIcon } from '../../assets/filter.svg';
import FilterPanel from '../filterPanel/FilterPanel';
import i18next from 'i18next';

const Search = () => {
  const { t } = useTranslation();
  const { setSearchKeyWord, searchKeyWord, indexedSessionStorageVariableNames, calendarData } =
    useContext(WidgetContext);
  const [filterOptions, setFilterOptions] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const clearSearch = () => {
    setSearchKeyWord('');
    sessionStorage.setItem(indexedSessionStorageVariableNames.WidgetSearchKeyWord, '');
  };

  useEffect(() => {
    if (!calendarData) return;

    const locale = i18next.language ?? 'en';
    const availableTaxonomyMappedField = new Set(['EventType', 'Audience']);

    const taxonomiesFilterOptions =
      calendarData.taxonomies
        ?.filter(({ mappedToField }) => availableTaxonomyMappedField.has(mappedToField))
        ?.map(({ name, mappedToField, concepts }) => ({
          name: name?.[locale] ?? name?.en ?? '',
          value: mappedToField,
          options:
            concepts?.map(({ name, id }) => ({
              label: name?.[locale] ?? name?.en ?? '',
              value: id,
            })) ?? [],
        })) ?? [];

    const placesFilterOptions = calendarData.places?.length
      ? {
          name: t('filter.place'),
          value: 'place',
          options: calendarData.places.map(({ name, id }) => ({
            label: name?.[locale] ?? name?.en ?? '',
            value: id,
          })),
        }
      : null;

    setFilterOptions([
      ...taxonomiesFilterOptions,
      ...(placesFilterOptions ? [placesFilterOptions] : []),
    ]);
  }, [calendarData]);

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
        <Button onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <FilterIcon />
        </Button>
        <FilterPanel
          isFilterOpen={isFilterOpen}
          filters={filterOptions}
          setIsFilterOpen={setIsFilterOpen}
        />
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
