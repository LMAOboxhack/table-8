import React from 'react';
import ItinerarysAPI from '../../pages/api/itinerarys/itinerarys';
import ItineraryForm from '../../components/content/ItineraryForm';
import { type ItineraryPostData } from '../../types/itinerarys/itinerarys';

export const CreateItinerary: React.FC = () => {
  const handleData = async (itineraryData: ItineraryPostData): Promise<void> =>
    await new ItinerarysAPI().addItinerary(itineraryData);

  return (
    <ItineraryForm
      formTitle={'Create Itinerary'}
      dialogBody={'Are you sure? Any progress on the form will not be saved. This action is irreversible!'}
      dialogHeader={'Cancel Itinerary Creation'}
      handleData={handleData}
      errorTitle={'Itinerary creation failed.'}
      submitButtonLabel={'Submit Itinerary'}
    />
  );
};
