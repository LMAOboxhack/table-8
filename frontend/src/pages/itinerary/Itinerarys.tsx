// import DataTable from '../../components/tables/DataTable';
import React, { useEffect, useState } from 'react';
import ItinerarysAPI from '../api/itinerarys/itinerarys';
import { BiSolidBook } from 'react-icons/bi';
import { Button, Flex, Skeleton, Stack } from '@chakra-ui/react';
import { type ColumnDef, createColumnHelper, type Column } from '@tanstack/react-table';
import { type ItineraryDataRowData, ItinerarysTableColumns } from '../../utils/itinerarys';
import { Link } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';

const Itinerarys: React.FC = () => {
  const columnHelper = createColumnHelper<ItineraryDataRowData>();
  const [itineraryList, setItineraryList] = useState<ItineraryDataRowData[]>([]);
  // Pass setQuestionList as a prop to the QuestionsTableColumns function
  const itineraryColumns: Array<ColumnDef<ItineraryDataRowData>> = ItinerarysTableColumns(columnHelper, setItineraryList);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoaded) {
      new ItinerarysAPI()
        .getItinerarys()
        .then((itinerarys) => {
          setItineraryList(itinerarys);
        })
        .catch(console.error)
        .finally(() => {
          setIsLoaded(true);
        });
    }
  }, []);

  return (
    <Stack paddingX={16} paddingY={8} spacing={6}>
      <Flex justifyContent={'space-between'}>
        <IconWithText fontSize="lg" fontWeight="bold" text="Itinerary Repository" icon={<BiSolidBook size={20} />} />
        <Link to="/itinerary/new">
          <Button leftIcon={<AddIcon />} colorScheme="teal">
            New Itinerary
          </Button>
        </Link>
      </Flex>
      <Skeleton isLoaded={isLoaded}>
        {itineraryList !== undefined && (
          <DataTable
            columns={itineraryColumns}
            tableData={itineraryList}
            getColumnCanGlobalFilter={(column: Column<ItineraryDataRowData>) => column.getCanSort()}
          />
        )}
      </Skeleton>
    </Stack>
  );
};

export default Itinerarys;