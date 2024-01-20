import React from 'react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { 
  VStack, 
  StackDivider, 
  Box, 
  Button, 
  Flex, 
  Text, 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  IconButton, 
  Heading 
} from '@chakra-ui/react';


// Define the type for a single destination
type Destination = {
  id: number;
  name: string;
  cost: number;
  notes: string;
};

// Mock data for the destinations
const destinations: Destination[] = [
  { id: 1, name: 'Marina Bay Sands', cost: 1000, notes: 'Hi' },
  { id: 2, name: 'Gardens By The Bay', cost: 500, notes: 'Bye' },
];

const ItineraryPage = () => {
  // Function to calculate total cost
//   const calculateTotalCost = (destinations: Destination[]): number => {
//     return destinations.reduce((total, destination) => total + destination.cost, 0);
//   };

  return (
    <VStack
      divider={<StackDivider borderColor='gray.200' />}
      spacing={4}
      align='stretch'
      p={5}
    >
      {/* User Header */}
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="xl" fontWeight="bold">User's Itinerary</Text>
        <Button colorScheme="red">Log out</Button>
      </Flex>

      {/* Itinerary Details */}
      <Box>
        <Text fontWeight="bold">Title</Text>
        </Box>
        <Box>
        <Text>Country</Text>
        </Box>
        <Box>
        <Text>Budget</Text>
      </Box>

      

      
    </VStack>
  );
};

export default ItineraryPage;
