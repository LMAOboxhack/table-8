import { Box, Text, Image, Badge, Divider } from '@chakra-ui/react'
import { ItineraryDestinations } from '@/types/Itinerary'

const DashboardCard: React.FC<any> = () => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      {/* <Image src={property.imageUrl} alt={property.imageAlt} /> */}

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            Title
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        ></Box>

        <Divider mt={4} />

        <Box display="flex" mt="2" alignItems="baseline">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            <p>Country</p>
            <p>$ Budget</p>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardCard
