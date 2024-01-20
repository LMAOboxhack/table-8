import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateItinerary } from '../itinerarys/CreateItinerary';
import Itinerary from '../itinerarys/Itinerarys';
import { UpdateItinerary } from '../itinerarys/UpdateItinerary';
import ViewItinerary from '../itinerarys/ViewItinerary';

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
