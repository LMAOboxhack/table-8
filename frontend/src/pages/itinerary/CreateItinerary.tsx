import React from 'react';
// import ItinerarysAPI from '../../pages/api/itinerarys/itinerarys';
import ItineraryCreateForm from '../../components/ItineraryCreateForm';
// import { type ItineraryData } from '../../types/itinerarys/itinerarys';

export const CreateItinerary: React.FC = () => {
  const handleData = async (itineraryData: ItineraryPostData): Promise<void> =>
    await new ItinerarysAPI().addItinerary(itineraryData);

  return (
    <ItineraryCreateForm
      formTitle={'Create Itinerary'}
      handleData={handleData}
      errorTitle={'Itinerary creation failed.'}
      submitButtonLabel={'Submit Itinerary'}
    />
  );
};