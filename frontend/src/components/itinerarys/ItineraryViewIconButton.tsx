import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Tooltip, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface ItineraryViewIconButtonProps {
  itineraryId: number;
  title: string;
}

const ItineraryViewIconButton: React.FC<ItineraryViewIconButtonProps> = ({
  itineraryId,
  title,
}: ItineraryViewIconButtonProps) => {
  const navigate = useNavigate();
  return (
    <Tooltip label={`View Itinerary ${itineraryId}: ${title}`}>
      <IconButton
        colorScheme="blue"
        aria-label="View Itinerary"
        value={itineraryId}
        onClick={() => {
          navigate(`/itinerary/${itineraryId}`);
        }}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ItineraryViewIconButton;
