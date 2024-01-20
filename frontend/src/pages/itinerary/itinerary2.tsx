import React, { useEffect, useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import ItineraryPopup from '@/components/ItineraryPopup';

const ItineraryPage2 = () => {
    // const [destinations, setDestinations] = useState(null)

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch("https://jsonplaceholder.typicode.com/posts/1")
    //         const data = await response.json()
    //         setDestinations(data)
    //         console.log(data)
    //     }
    //     fetchData();
    // }, []);

    // if (!destinations) {
    //     return <p>Please create a destination</p>;
    // }

    // if (destinations) {
    //     let total_cost = 0
    //     for (let i = 0; i < destinations.length; i++) {
    //         total_cost += destinations[i].cost
    //     }
    // }
    
    const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const { isOpen: isCreateOpen , onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()

    return (
        <div>
            <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem colSpan={2} h='10'><h1>List of Destinations</h1></GridItem>
                <GridItem colStart={4} colEnd={6} h='10'><Button colorScheme='blackAlpha' onClick={onCreateOpen}>Create Destination</Button></GridItem>
            </Grid>
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
                            <Tr>
                                <Td>Marina Bay Sands</Td>
                                <Td isNumeric>50</Td>
                                <Td>Iconic hotel with an infinity pool and stunning views of the city skyline. Open 24/7.</Td>
                                <Td><Button onClick={onEditOpen} colorScheme='blackAlpha'>Edit</Button></Td>
                                <Td><Button colorScheme='red'>Delete</Button></Td>
                            </Tr>
                            <Tr>
                                <Td>Gardens by the Bay</Td>
                                <Td isNumeric>30</Td>
                                <Td>Futuristic park featuring Supertree Grove and Flower Dome conservatories. Open daily from 9 AM to 9 PM.</Td>
                                <Td><Button colorScheme='blackAlpha'>Edit</Button></Td>
                                <Td><Button colorScheme='red'>Delete</Button></Td>
                            </Tr>
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
    );
};

export default ItineraryPage2;