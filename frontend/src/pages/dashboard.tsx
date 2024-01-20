import DashboardCard from '@/components/DashboardCards'
import React, { useState } from 'react'

import {
  Flex,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Itinerary } from '@/types/Itinerary'

const data: Itinerary[] = [
  {
    budget: 500.0,
    country: {
      id: 1,
      name: 'Singapore',
    },
    destinations: [
      {
        cost: 50.0,
        country_id: 1,
        id: 1,
        name: 'Marina Bay Sands',
        notes:
          'Iconic hotel with an infinity pool and stunning views of the city skyline. Open 24/7.',
      },
      {
        cost: 30.0,
        country_id: 1,
        id: 2,
        name: 'Gardens by the Bay',
        notes:
          'Futuristic park featuring Supertree Grove and Flower Dome conservatories. Open daily from 9 AM to 9 PM.',
      },
      {
        cost: 40.0,
        country_id: 1,
        id: 3,
        name: 'Sentosa Island',
        notes:
          'Fun-filled island resort with beaches, theme parks, and various attractions. Open daily from 10 AM to 7 PM.',
      },
    ],
    id: 1,
    title: 'Sightseeing in Singapore',
  },
  {
    budget: 800.0,
    country: {
      id: 1,
      name: 'Singapore',
    },
    destinations: [
      {
        cost: 60.0,
        country_id: 1,
        id: 4,
        name: 'Universal Studios Singapore',
        notes:
          'Amusement park with movie-themed rides and entertainment. Open daily from 10 AM to 7 PM.',
      },
      {
        cost: 35.0,
        country_id: 1,
        id: 5,
        name: 'Singapore Zoo',
        notes:
          'Award-winning zoo showcasing diverse wildlife species. Open daily from 8:30 AM to 6 PM.',
      },
    ],
    id: 2,
    title: 'Singapore Adventure',
  },
]

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleSubmit = (value: any) => {
    console.log(value)
  }

  return (
    <>
      <Box p={6}>
        <Breadcrumb separator={<ChevronRightIcon />} spacing="8px">
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="flex-end" m={2}>
          <Box>
            <Button onClick={() => handleOpen()}>Create Itinerary</Button>
          </Box>
        </Flex>
        <Flex flexWrap="wrap" gap={12} justifyContent="space-between">
          {data.map((d) => (
            <DashboardCard itinerary={d} key={'0'} />
          ))}
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Itinerary</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={(v) => handleSubmit(v)}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input type="text" placeholder="Enter your name" />
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel>Budget</FormLabel>
                <Input type="number" placeholder="Enter your budget" />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Country</FormLabel>
                <Input type="text" placeholder="Enter your country" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="green" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Dashboard
