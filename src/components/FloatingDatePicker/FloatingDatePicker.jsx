import React, { useContext, useEffect, useRef } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import WidgetContext from '../../context/WidgetContext';
import { CustomCalendar } from '../customCalendar/CustomCalendar';
import './floatingDatePicker.css';
import { ReactComponent as Date } from '../../assets/Frame.svg';

const FloatingDatePicker = () => {
  const calendarModalRef = useRef(null);
  const { calendarModalToggle, setCalendarModalToggle, startDateSpan, endDateSpan } =
    useContext(WidgetContext);

  const calendarPopOverHandler = () => {
    setCalendarModalToggle(!calendarModalToggle);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        calendarModalRef.current &&
        !calendarModalRef.current.contains(event.target) &&
        calendarModalToggle
      ) {
        setCalendarModalToggle(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [calendarModalToggle]);

  const isDateSelected = startDateSpan || endDateSpan;

  return (
    <Box className="floating-datepicker">
      <Box className="button-container">
        <IconButton
          aria-label="Select Date"
          icon={<Date />}
          onClick={calendarPopOverHandler}
          className={isDateSelected ? 'has-date' : ''}
          variant="ghost"
        />
        {calendarModalToggle && (
          <Box className="calendar-modal-pivot">
            <Box className="calendar-modal-wrapper" ref={calendarModalRef}>
              <CustomCalendar />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FloatingDatePicker;
