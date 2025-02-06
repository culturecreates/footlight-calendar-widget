import React, { useContext, useState, useEffect } from 'react';
import { Box, Button, Collapse, VStack, Checkbox } from '@chakra-ui/react';
import WidgetContext from '../../context/WidgetContext';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { ReactComponent as FilterIcon } from '../../assets/filter.svg';

const FilterDropdown = ({
  name,
  options,
  isOpen,
  onToggle,
  selectedFilters,
  onFilterChange,
  value,
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
        variant="ghost" // Removes background color
        display="flex"
        alignItems="center"
        gap={4}
      >
        <Box flex="1" textAlign="left">
          {name}
        </Box>
        <Box>{isOpen ? '▲' : '▼'}</Box>
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <VStack align="start" mt={2} pl={2} maxHeight="200px" overflowY="auto">
          {options?.map((option, idx) => (
            <Checkbox
              key={idx}
              isChecked={selectedFilters?.[name]?.includes(option.value)}
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

const FilterPanel = ({ isFilterOpen, filters, setIsFilterOpen }) => {
  const [openFilters, setOpenFilters] = useState([]);
  const { selectedFilters, setSelectedFilters } = useContext(WidgetContext);

  const toggleFilter = (value) => {
    setOpenFilters((prevOpenFilters) =>
      prevOpenFilters?.includes(value)
        ? prevOpenFilters?.filter((filter) => filter !== value)
        : [...prevOpenFilters, value],
    );
  };

  const handleFilterChange = (category, selectedOptions) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: selectedOptions,
    }));
    setIsFilterOpen(false);
  };

  return (
    <Collapse in={isFilterOpen} animateOpacity>
      <Box
        position="absolute"
        zIndex="10"
        bg="white"
        boxShadow="md"
        p={4}
        borderRadius="md"
        minWidth="350px"
        maxWidth="350px"
      >
        {filters?.map((filter, index) => (
          <FilterDropdown
            key={index}
            name={filter?.name}
            options={filter?.options}
            isOpen={openFilters?.includes(filter?.value)}
            onToggle={() => toggleFilter(filter?.value)}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            value={filter?.value}
          />
        ))}
      </Box>
    </Collapse>
  );
};

const FilterSection = () => {
  const { t } = useTranslation();
  const { calendarData, widgetProps } = useContext(WidgetContext);
  const [filterOptions, setFilterOptions] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
          name: name?.[locale] ?? name?.en ?? '',
          value: mappedToField,
          options:
            concepts?.map(({ name, id }) => ({
              label: name?.[locale] ?? name?.en ?? '',
              value: id,
            })) ?? [],
        })) ?? [];
    if (userSelectedfilters?.includes('PLACE')) {
      placesFilterOptions = calendarData.places?.length
        ? {
            name: t('filter.place'),
            value: 'place',
            options: calendarData.places.map(({ name, id }) => ({
              label: name?.[locale] ?? name?.en ?? '',
              value: id,
            })),
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
        <Button onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <FilterIcon />
        </Button>
        <FilterPanel
          isFilterOpen={isFilterOpen}
          filters={filterOptions}
          setIsFilterOpen={setIsFilterOpen}
        />
      </Box>
    )
  );
};

export default FilterSection;
