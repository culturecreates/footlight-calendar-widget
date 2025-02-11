import React, { useContext, useState, useEffect, useRef } from 'react';
import { Box, Button, VStack, Checkbox, IconButton, HStack, Collapsible } from '@chakra-ui/react';
import WidgetContext from '../../context/WidgetContext';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { ReactComponent as FilterIcon } from '../../assets/filter.svg';
import { ReactComponent as Arrow } from '../../assets/arrowDown.svg';

const FilterDropdown = ({
  name,
  options,
  isOpen,
  onToggle,
  selectedFilters,
  onFilterChange,
  value,
  isSingleFilter,
}) => {
  const handleCheckboxChange = (option) => {
    const updatedFilters = selectedFilters?.[value]?.includes(option.value)
      ? selectedFilters?.[value].filter((item) => item !== option.value)
      : [...(selectedFilters?.[value] || []), option.value];

    onFilterChange(value, updatedFilters);
  };

  return (
    <Box mb={2}>
      <Button
        width="100%"
        justifyContent="space-between"
        onClick={onToggle}
        variant="ghost"
        display="flex"
        alignItems="center"
        gap={4}
        _hover={{
          bg: 'var(--dynamic-color-100)',
          border: 'none',
        }}
      >
        <Box flex="1" textAlign="left">
          {name}
        </Box>
        <Box>
          <Arrow
            style={{
              display: isSingleFilter ? 'none' : 'block',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </Box>
      </Button>
      <Collapsible in={isOpen} animateOpacity>
        <VStack align="start" mt={2} pl={2} maxHeight="200px" overflowY="auto">
          {options?.map((option, idx) => (
            <Checkbox
              key={idx}
              isChecked={selectedFilters?.[value]?.includes(option.value) ?? false}
              onChange={() => handleCheckboxChange(option)}
            >
              {option.label}
            </Checkbox>
          ))}
        </VStack>
      </Collapsible>
    </Box>
  );
};

const FilterPanel = ({ isFilterOpen, filters, setIsFilterOpen, iconRef, t }) => {
  const [openFilter, setOpenFilter] = useState([]);
  const { selectedFilters, setSelectedFilters } = useContext(WidgetContext);
  const panelRef = useRef(null);

  const isSingleFilter = filters?.length === 1;

  const toggleFilter = (value) => {
    setOpenFilter(openFilter === value ? null : value);
  };

  const handleFilterChange = (category, selectedOptions) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: selectedOptions,
    }));
    setIsFilterOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      panelRef.current &&
      !panelRef.current.contains(event.target) &&
      !iconRef.current.contains(event.target)
    ) {
      setIsFilterOpen(false);
    }
  };

  const handleClearAllFilters = () => {
    setSelectedFilters({});
    setIsFilterOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Collapsible in={isFilterOpen} animateOpacity>
      <Box
        position="absolute"
        zIndex="10"
        bg="white"
        boxShadow="md"
        p={4}
        borderRadius="md"
        minWidth="350px"
        maxWidth="350px"
        ref={panelRef}
      >
        {selectedFilters &&
          Object.values(selectedFilters).some((filters) => filters.length > 0) && (
            <HStack width="100%" pr={2} justifyContent="flex-end">
              <Button
                size="xs"
                variant="link"
                color="var(--dynamic-color-700)"
                onClick={handleClearAllFilters}
              >
                {t('filter.clearAll')}
              </Button>
            </HStack>
          )}
        {filters?.map((filter, index) => (
          <FilterDropdown
            key={index}
            name={filter?.name}
            options={filter?.options}
            isOpen={isSingleFilter || openFilter === filter?.value}
            onToggle={() => toggleFilter(filter?.value)}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            value={filter?.value}
            isSingleFilter={isSingleFilter}
          />
        ))}
      </Box>
    </Collapsible>
  );
};

const FilterSection = () => {
  const { t } = useTranslation();
  const { calendarData, widgetProps, selectedFilters } = useContext(WidgetContext);
  const [filterOptions, setFilterOptions] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const iconRef = useRef(null);

  const handleFilterToggle = () => {
    setIsFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!calendarData && !widgetProps?.filterOptions) return;

    const locale = i18next.language ?? 'en';
    const userSelectedfilters = widgetProps.filterOptions?.split('|');
    const userSelectedTaxonomyMappedFields =
      calendarData.taxonomies
        ?.filter(({ id }) => userSelectedfilters.includes(id))
        ?.map(({ mappedToField }) => mappedToField) ?? [];

    let taxonomiesFilterOptions = [],
      placesFilterOptions = {};
    taxonomiesFilterOptions =
      calendarData.taxonomies
        ?.filter(({ mappedToField }) => userSelectedTaxonomyMappedFields.includes(mappedToField))
        ?.map(({ name, mappedToField, concepts }) => ({
          name:
            name?.[locale] ||
            name?.en ||
            name?.fr ||
            Object.values(name ?? {}).find((val) => val) ||
            '@none',
          value: mappedToField,
          options:
            concepts?.map(({ name, id }) => ({
              label:
                name?.[locale] ||
                name?.en ||
                name?.fr ||
                Object.values(name ?? {}).find((val) => val) ||
                '@none',
              value: id,
            })) ?? [],
        })) ?? [];

    if (userSelectedfilters?.includes('PLACE')) {
      placesFilterOptions = calendarData.places?.length
        ? {
            name: t('filter.place'),
            value: 'place',
            options: calendarData.places
              .map(({ name, id }) => ({
                label:
                  name?.[locale] ||
                  name?.en ||
                  name?.fr ||
                  Object.values(name ?? {}).find((val) => val) ||
                  '@none',
                value: id,
              }))
              .sort((a, b) =>
                a.label.localeCompare(b.label, locale || 'en', { sensitivity: 'base' }),
              ),
          }
        : null;
    }
    let filtersDisplayed = [];
    if (userSelectedfilters?.includes('PLACE')) filtersDisplayed.push(placesFilterOptions);
    if (userSelectedTaxonomyMappedFields?.length) filtersDisplayed.push(...taxonomiesFilterOptions);
    setFilterOptions(filtersDisplayed);
  }, [calendarData]);

  return (
    filterOptions.length > 0 && (
      <Box borderRadius="full" _hover={{ bg: 'var(--primary-hover-white)' }}>
        <Box position="relative">
          <IconButton
            aria-label="Select Filter"
            icon={<FilterIcon />}
            onClick={handleFilterToggle}
            variant="ghost"
            ref={iconRef}
            _hover={{
              bg: 'var(--dynamic-color-100)',
              borderRadius: '50%',
              border: '1px solid var(--dynamic-color-100)',
            }}
            borderRadius="50%"
          />
          {selectedFilters &&
            Object.values(selectedFilters).some((filters) => filters.length > 0) && (
              <Box
                position="absolute"
                top="2px"
                right="2px"
                w="9px"
                h="9px"
                bg="var(--dynamic-color-700)"
                borderRadius="50%"
              />
            )}
        </Box>
        <FilterPanel
          isFilterOpen={isFilterOpen}
          filters={filterOptions}
          setIsFilterOpen={setIsFilterOpen}
          iconRef={iconRef}
          t={t}
        />
      </Box>
    )
  );
};

export default FilterSection;
