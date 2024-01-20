import DashboardCard from '@/components/DashboardCards'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'

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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Select,
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
  const [formData, setFormData] = useState({
    title: '',
    budget: '',
    country: '',
  })
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('') // Initialize state for input value
  const [country, setCountry] = useState([])
  useEffect(() => {
    axios
      .get('/countries')
      .then((response: any) => {
        setCountry(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching the data', error)
      })
  }, [])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    console.log(e.target.name)

    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const onClose = () => {
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log(formData)

    const response = await fetch('http://localhost:5000/itinerary', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    if (response.ok) {
      router.push('/1/itinerary') // Replace with your success route
    }
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
          {data.map((d, i) => (
            <DashboardCard itinerary={d} key={i} />
          ))}
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Itinerary</ModalHeader>
          <ModalCloseButton />
          <form>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  name="title"
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel>Budget</FormLabel>
                <Input
                  type="number"
                  value={formData.budget}
                  onChange={handleChange}
                  name="budget"
                  placeholder="Enter your budget"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Country</FormLabel>
                <Select
                  value={formData.country}
                  name="country"
                  onChange={handleChange}
                  placeholder="Enter your country"
                >
                  {country.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="green" onClick={handleSubmit}>
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
