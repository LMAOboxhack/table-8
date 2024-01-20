import React, { useState } from 'react';
import {
  VStack,
  Stack,
  StackDivider,
  Box,
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

const ItineraryPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(''); 
  const [country, setCountry] = useState(''); 
  const [budget, setBudget] = useState(''); 

  const handleEdit = () => {
    // Set the form values to current itinerary details
    setTitle('');
    setCountry('');
    setBudget('');
    onOpen(); // Open the modal
  };

  // Update this to handle the form submission
  const handleSubmit = () => {
    console.log('Submit', { title, country, budget });
    onClose(); // Close the modal
  };

  return (
    <div>
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
        
        <Flex justifyContent="space-between" alignItems="center">
        {/* Itinerary Details */}
        <Stack spacing={4}>
        <Box>
          <Text fontWeight="bold">Title: {title}</Text>
        </Box>
        <Box>
          <Text>Country: {country}</Text>
        </Box>
        <Box>
          <Text>Budget: {budget}</Text>
        </Box>
        </Stack>
        <Button colorScheme='teal' variant='solid' onClick={handleEdit}>
          Edit
        </Button>
        </Flex>
      </VStack>
      
        
        
  

      {/* Edit Itinerary Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Itinerary</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder='Title' 
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Country</FormLabel>
              <Input 
                value={country} 
                onChange={(e) => setCountry(e.target.value)} 
                placeholder='Country' 
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Budget</FormLabel>
              <Input 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)} 
                placeholder='Budget' 
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ItineraryPage;
