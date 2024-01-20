import React, { useEffect, useState } from 'react';
import ItinerarysAPI from '../api/itinerarys/itinerarys';
import { useParams } from 'react-router-dom';
import ItineraryForm from '../../components/content/ItineraryForm';
import { type ItineraryPostData, type ItineraryData } from '../../types/itinerarys/itinerarys';

export const UpdateItinerary: React.FC = () => {
  const { itineraryId } = useParams();
  let itineraryIdString: string;
  if (itineraryId !== undefined) {
    itineraryIdString = itineraryId;
  } else {
    throw new Error('ID of itinerary is undefined');
  }

  const [dataLoaded, setDataLoaded] = useState(false); // Add this state
  const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null);

  useEffect(() => {
    new ItinerarysAPI()
      .getItinerary(itineraryIdString)
      .then((itineraryData) => {
        setItineraryData(itineraryData);
        setDataLoaded(true); // Mark data as loaded
      })
      .catch((error) => {
        console.error('Error fetching itinerary data:', error);
        setDataLoaded(true);
      });
  }, []);

  const handleData = async (itineraryData: ItineraryPostData): Promise<ItineraryData> =>
    await new ItinerarysAPI().updateItinerary(itineraryIdString, itineraryData);

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
