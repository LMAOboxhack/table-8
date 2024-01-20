import React from 'react';
import ItinerarysAPI from '../../pages/api/itinerarys/itinerarys';
// import ItineraryForm from '../../components/content/ItineraryForm';
import { type ItenaryPostData } from '../../types/itinerarys/itinerarys';

export const CreateItinerary: React.FC = () => {
  const handleData = async (itineraryData: ItineraryPostData): Promise<void> =>
    await new ItinerarysAPI().addItinerary(itineraryData);

  return (
    // <ItineraryForm
    //   formTitle={'Create Question'}
    //   dialogBody={'Are you sure? Any progress on the form will not be saved. This action is irreversible!'}
    //   dialogHeader={'Cancel Question Creation'}
    //   handleData={handleData}
    //   errorTitle={'Question creation failed.'}
    //   submitButtonLabel={'Submit Question'}
    // />
  );
};
