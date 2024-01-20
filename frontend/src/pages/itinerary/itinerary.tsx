import React, { useEffect, useState } from 'react';
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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

import ItineraryPopup from '@/components/ItineraryPopup';

const ItineraryPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isCreateOpen , onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()
  const [title, setTitle] = useState(''); 
  const [country, setCountry] = useState(''); 
  const [budget, setBudget] = useState(''); 
  // const { token } = useSession();


  const handleEdit = () => {
    // Set the form values to current itinerary details
    setTitle('');
    setCountry('');
    setBudget('');
    onOpen(); // Open the modal
  };

  // Update this to handle the form submission
  const handleSubmit = () => {
    // const reponse = await fetch()

    console.log('Submit', { title, country, budget });
    onClose(); // Close the modal
  };

  const [destinations, setDestinations] = useState([])

  useEffect(() => {
    async function getDestinations() {
      let response = await fetch('http://127.0.0.1:5000/itinerary', {
          method: 'GET',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6Im5kcDE5OTgifQ.fe3DWtqv4IySx4qK1j_vUetZHdtGZNsvRm2fkTtxzws"}),
        });
      response = await response.json();
      setDestinations(response);
    }

    getDestinations();
  }, []);

  return (
    <>
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
      <div>
        {/* <Grid templateColumns='repeat(5, 1fr)' gap={4}>
            <GridItem colSpan={2} h='10'>
                <Text fontSize="xl" fontWeight="bold">List of Destinations</Text>
            </GridItem>
            <GridItem colStart={4} colEnd={6} h='10'><Button colorScheme='blackAlpha' onClick={onCreateOpen}>Create Destination</Button></GridItem>
        </Grid> */}

        <Flex justifyContent="space-between" alignItems="center">
            <Stack p={5} spacing={4}>
                <Box>
                    <Text fontWeight="bold">List of Destinations</Text>
                </Box>
            </Stack>
            <Box p={5}>
                <Button colorScheme='blackAlpha' onClick={onCreateOpen}>Create Destination</Button>
            </Box>
        </Flex>
        <div>
            <TableContainer>
                <Table size='lg'>
                    <Thead>
                        <Tr>
                            <Th>Destinations</Th>
                            <Th isNumeric>Cost</Th>
                            <Th>Notes</Th>
                            <Th></Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    
                    <Tbody>
                        {/* {destinations.map(destination => {
                            return (
                                <Tr>
                                    <Td>Marina Bay Sands</Td>
                                    <Td isNumeric>50</Td>
                                    <Td>Iconic hotel with an infinity pool and stunning views of the city skyline. Open 24/7.</Td>
                                    <Td><Button onClick={onOpen} colorScheme='blackAlpha'>Edit</Button></Td>
                                    <Td><Button colorScheme='red'>Delete</Button></Td>
                                </Tr>
                            )
                        })} */}
                        {destinations}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Total Cost: {}</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>

            <ItineraryPopup isOpen={isEditOpen} onClose={onEditClose} type="Edit" destination="lalala" amount={0} notes="" />
            <ItineraryPopup isOpen={isCreateOpen} onClose={onCreateClose} type="Create" destination="" amount={0} notes="" />

            {/* <Modal isOpen={isEditOpen} onClose={onEditClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Destination</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <FormControl>
                        <FormLabel>Destination</FormLabel>
                        <Input placeholder='' value={""}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Amount</FormLabel>
                        <NumberInput value={100}>
                            <NumberInputField />
                        </NumberInput>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Notes</FormLabel>
                        <Input placeholder='' value={""}/>
                    </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Destination</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <FormControl>
                        <FormLabel>Destination</FormLabel>
                        <Input placeholder='' value={""}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Amount</FormLabel>
                        <NumberInput value={0}>
                            <NumberInputField />
                        </NumberInput>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Notes</FormLabel>
                        <Input placeholder='' value={""}/>
                    </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */}
        </div>
      
      </div>
    </>
  );
};

export default ItineraryPage;
