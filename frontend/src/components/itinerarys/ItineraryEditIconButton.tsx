import { EditIcon } from '@chakra-ui/icons';
import { Tooltip, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface ItineraryEditIconButtonProps {
  itineraryId: number;
  title: string;
}

const ItineraryEditIconButton: React.FC<ItineraryEditIconButtonProps> = ({
  itineraryId,
  title,
}: ItineraryEditIconButtonProps) => {
  const navigate = useNavigate();
  return (
    <Tooltip label={`Edit Itinerary ${itineraryId}: ${title}`}>
      <IconButton
        aria-label="Edit Itinerary"
        value={itineraryId}
        onClick={() => {
          navigate(`/itinerary/${itineraryId}/edit`);
        }}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ItineraryEditIconButton;
