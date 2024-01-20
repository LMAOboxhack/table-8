import { Box, Text, Image } from '@chakra-ui/react'

interface CardProps {
  title: string
  description: string
  imageUrl: string
}

const DashboardCard: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      p={4}
      maxW="md"
    >
      <Image src={imageUrl} alt={title} height="200px" objectFit="cover" />
      <Box mt={4}>
        <Text fontSize="xl" fontWeight="semibold">
          {title}
        </Text>
        <Text mt={2} color="gray.500">
          {description}
        </Text>
      </Box>
    </Box>
  )
}

export default DashboardCard
