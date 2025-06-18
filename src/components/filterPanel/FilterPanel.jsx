import React, { useContext, useState, useEffect, useRef } from 'react';
import { Box, Button, Collapse, VStack, Checkbox, IconButton, HStack } from '@chakra-ui/react';
import WidgetContext from '../../context/WidgetContext';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import FilterIcon from '../../assets/filter.svg?react';
import Arrow from '../../assets/arrowDown.svg?react';
import './filterPanel.css';

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
    <Box style={{ marginBottom: '2px' }}>
      <Button
        style={{
          width: '100%',
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          border: 'none',
          margin: '0',
        }}
        className="filter-dropdown"
        onClick={onToggle}
        variant="ghost"
      >
        <Box style={{ flex: 1, textAlign: 'left' }}>{name}</Box>
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
      <Collapse in={isOpen} animateOpacity>
        <VStack
          style={{
            alignItems: 'start',
            marginTop: '2px',
            paddingLeft: '2px',
            maxHeight: '150px',
            overflowY: 'auto',
          }}
        >
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
      </Collapse>
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
    <Collapse
      transition={{ exit: { delay: 0 }, enter: { duration: 0 } }}
      in={isFilterOpen}
      animateOpacity
    >
      <Box
        ref={panelRef}
        style={{
          position: 'absolute',
          zIndex: '10',
          backgroundColor: 'white',
          boxShadow: 'md',
          padding: '12px',
          borderRadius: 'md',
          minWidth: '350px',
          maxWidth: '350px',
        }}
      >
        {selectedFilters &&
          Object.values(selectedFilters).some((filters) => filters.length > 0) && (
            <HStack style={{ width: '100%', paddingRight: '2px', justifyContent: 'flex-end' }}>
              <Button
                size="xs"
                variant="link"
                style={{ color: 'var(--dynamic-color-700)' }}
                onMouseOver={(e) => (e.target.style.backgroundColor = 'transparent')}
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
    </Collapse>
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
      <Box
        style={{ borderRadius: 'full', background: 'transparent' }}
        _hover={{ background: 'var(--primary-hover-white)' }}
      >
        <Box style={{ position: 'relative' }}>
          <IconButton
            aria-label="Select Filter"
            icon={<FilterIcon />}
            onClick={handleFilterToggle}
            variant="ghost"
            className="filter-icon"
            ref={iconRef}
          />
          {selectedFilters &&
            Object.values(selectedFilters).some((filters) => filters.length > 0) && (
              <Box
                position="absolute"
                top="2px"
                right="2px"
                w="9px"
                h="9px"
                bg="var(--main-dynamic-color)"
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
