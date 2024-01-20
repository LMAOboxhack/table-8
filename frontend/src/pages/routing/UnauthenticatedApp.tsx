import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateItinerary } from '../itinerary/CreateItinerary';
import Itinerary from '../itinerary/Itenary';
import { UpdateItinerary } from '../itinerary/UpdateItinerary';
import ViewItinerary from '../itinerary/ViewItinerary';

const UnauthenticatedApp: React.FC = () => {
  return (
    <Routes>
      <Route path="itinerary/new" element={<CreateItinerary />} />
      <Route path="/" element={<Itinerary />} />
      <Route path="itinerary/:itineraryId/edit" element={<UpdateItinerary />} />
      <Route path="/itinerary/:itineraryId" element={<ViewItinerary />} />
    </Routes>
  );
};

export default UnauthenticatedApp;
