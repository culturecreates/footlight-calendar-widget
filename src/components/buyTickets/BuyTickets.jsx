import React from 'react';
import PrimaryButton from '../button/PrimaryButton';
import { useBreakpointValue } from '@chakra-ui/react';
import './buyTickets.css';
import { ReactComponent as TicketIcon } from '../../assets/tickets.svg';
import { useTranslation } from 'react-i18next';
import { redirectionHandler } from '../../utils/redirectionHandler';
import { OFFER_TYPES } from '../../constants/generalConstants';

const BuyTickets = ({ eventDetails }) => {
  const { t } = useTranslation();
  const { offers = [], facebookUrl, eventUrl } = eventDetails;
  const buttonWidth = useBreakpointValue({ base: 'calc(100% - 32px)', md: '460px' });
  const margin = useBreakpointValue({ base: '0px', md: '8px auto' });

  let label = '';
  let redirectionUrl = eventUrl || facebookUrl;

  const getOfferUrl = (type) => offers.find((offer) => offer.additionalType === type)?.url;
  const offer = offers.find((offer) => offer.additionalType);
  const type = offer?.additionalType;

  if (offers.length === 0) label = t('detailsModal.buyTickets.noOffer');

  switch (type) {
    case OFFER_TYPES.PAID:
      label = t('detailsModal.buyTickets.paid');
      redirectionUrl = getOfferUrl('PAID') || redirectionUrl;
      break;
    case OFFER_TYPES.FREE:
      label = t('detailsModal.buyTickets.free');
      break;
    case OFFER_TYPES.REGISTRATION:
      label = t('detailsModal.buyTickets.registration');
      redirectionUrl = getOfferUrl('REGISTRATION') || redirectionUrl;
      break;
  }

  if (!redirectionUrl) return null;

  return (
    <PrimaryButton
      label={label}
      className="buy-tickets-button"
      Icon={TicketIcon}
      onClick={() => {
        redirectionHandler({ url: redirectionUrl });
      }}
      style={{
        backgroundColor: 'var(--main-dynamic-color)',
        color: 'var(--primary-white-opaque)',
        borderRadius: '6px',
        padding: '0 16px',
        maxWidth: buttonWidth,
        width: buttonWidth,
        height: '40px',
        margin: margin,
        gap: '8px',
      }}
    />
  );
};

export default BuyTickets;
