import DashboardCard from '@/components/DashboardCards'
import { Flex, Grid, Box, ChakraProvider, SimpleGrid } from '@chakra-ui/react'

function Dashboard() {
  return (
    <>
      <Flex
        flexWrap="wrap"
        gap={12}
        justifyContent="space-between" // Align items with space between
      >
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </Flex>
    </>
  )
}

export default Dashboard
