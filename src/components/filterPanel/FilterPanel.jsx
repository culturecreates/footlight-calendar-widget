import React, { useContext, useState } from 'react';
import { Box, Button, Collapse, VStack, Checkbox } from '@chakra-ui/react';
import WidgetContext from '../../context/WidgetContext';

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
      <Button width="100%" justifyContent="space-between" onClick={onToggle}>
        {name} {isOpen ? '▲' : '▼'}
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
  const [openFilter, setOpenFilter] = useState(null);
  const { selectedFilters, setSelectedFilters } = useContext(WidgetContext);

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
  return (
    <Collapse in={isFilterOpen} animateOpacity>
      <Box position="absolute" zIndex="10" bg="white" boxShadow="md" p={4} borderRadius="md">
        {filters?.map((filter, index) => (
          <FilterDropdown
            key={index}
            name={filter?.name}
            options={filter?.options}
            isOpen={openFilter === filter?.value}
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

export default FilterPanel;
