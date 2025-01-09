import { useDisclosure } from '@chakra-ui/react';
import { useContext } from 'react';
import WidgetContext from '../../context/WidgetContext';
import { redirectionModes, urlTypes } from '../../constants/generalConstants';
import { getRedirectionUrl, redirectionHandler } from '../redirectionHandler';

const useRedirection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { widgetProps } = useContext(WidgetContext);
  const { locale, calendar, redirectionMode } = widgetProps;

  const handleRedirection = ({ id, type = urlTypes.EVENT }) => {
    const url = getRedirectionUrl(id, type, locale, calendar);
    if (redirectionMode === redirectionModes.EXTERNAL) {
      redirectionHandler({ url });
    } else {
      onOpen();
    }
  };

  return { handleRedirection, isOpen, onClose, getRedirectionUrl };
};

export default useRedirection;
