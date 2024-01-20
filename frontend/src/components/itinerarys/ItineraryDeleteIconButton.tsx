import { DeleteIcon } from '@chakra-ui/icons';
import { Tooltip, IconButton, useToast } from '@chakra-ui/react';
import React from 'react';
import ItinerarysAPI from '../../api/itinerarys/itinerarys';

interface ItineraryDeleteIconButtonProps {
  itineraryId: number;
  onDelete: (itineraryId: number) => void; // Callback function for handling deletion
}

const ItineraryDeleteIconButton: React.FC<ItineraryDeleteIconButtonProps> = ({
  itineraryId,
  onDelete,
}: ItineraryDeleteIconButtonProps) => {
  const toast = useToast();
  const handleDelete = (): void => {
    new ItinerarysAPI()
      .deleteItinerary(itineraryId)
      .then(() => {
        // Call the onDelete callback when the delete is successful
        onDelete(itineraryId);
      })
      .catch((error) => {
        // Handle errors (e.g., display an error message)
        console.error('Error deleting itinerary:', error);
        toast({
          title: 'Itinerary deletion failed.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Tooltip label={`Delete Itinerary ${itineraryId}`}>
      <IconButton
        aria-label="Delete Itinerary"
        colorScheme="red" // Adjust the color scheme as needed
        onClick={handleDelete} // Use the handleDelete function as the onClick handler
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ItineraryDeleteIconButton;
