import { Box, Text, Image, Badge, Button } from '@chakra-ui/react'
import { Itinerary } from '@/types/Itinerary'
import { useRouter } from 'next/router'

const DashboardCard: React.FC<{ itinerary: Itinerary; key: number }> = ({
  itinerary,
  key,
}) => {
  const router = useRouter()

  return (
    <Box
      borderWidth="1px"
      display="flex"
      flexDirection="column"
      borderRadius="lg"
      overflow="hidden"
      minWidth="240px"
      onClick={() => {
        router.push('/1/itinerary')
      }}
    >
      <Box
        p="6"
        height="120px"
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-start"
        bgImage="url('https://media.istockphoto.com/id/1344771294/photo/happy-family-in-masks-enjoying-travel-together.webp?b=1&s=612x612&w=0&k=20&c=38vWekRjfDJTxPHNm4N-wpgbp-33XOH8JlBL_GvwBlI=')"
        bgPosition="center"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bgGradient="linear(to-b, whiteAlpha.800, transparent)" // Adjust opacity as needed
        ></Box>
        <Box display="flex" alignItems="flex-start">
          <Badge
            borderRadius="full"
            px="2"
            colorScheme="teal"
            zIndex={2}
            alignItems="top"
          >
            New
          </Badge>
          <Box
            color="primary.text"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
            zIndex={2}
          >
            {itinerary.title}
          </Box>
          <Box
            color="primary.text"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
            zIndex={2}
          >
            <Button size="xs">x</Button>
          </Box>
        </Box>
      </Box>
      <Box display="flex" alignItems="baseline" bg="primary.background" p="3">
        <Box as="span" ml="2" color="primary.text" fontSize="sm">
          <p>{itinerary.country.name}</p>
          <p>${itinerary.budget.toFixed(2)}</p>
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardCard
