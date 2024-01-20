import { type SortingFn, type ColumnDef, type ColumnHelper, type Row } from '@tanstack/react-table';
import {
  type ItineraryData,
} from '../types/itinerarys/itinerarys';
import { Stack, Tag, Wrap, WrapItem } from '@chakra-ui/react';
import ItineraryViewIconButton from '../components/itinerarys/ItineraryViewIconButton';
import ItineraryEditIconButton from '../components/itinerarys/ItineraryEditIconButton';
import ItineraryDeleteIconButton from '../components/itinerarys/ItineraryDeleteIconButton';
import React, { useEffect, useState } from 'react';
import ItinerarysAPI from '../pages/api/itinerarys/itinerarys';

export interface ItineraryDataRowData extends ItineraryData {
  action?: undefined;
}

export const ItinerarysTableColumns = (
  columnHelper: ColumnHelper<ItineraryDataRowData>,
  // Accept the setItineraryList prop
  setItineraryList: React.Dispatch<React.SetStateAction<ItineraryDataRowData[]>>,
): Array<ColumnDef<ItineraryDataRowData>> => {

  return [
    columnHelper.accessor('id', {
      cell: (id): number => id.getValue(),
      header: 'ID',
    }),
    columnHelper.accessor('title', {
      cell: (title): string => title.getValue(),
      header: 'Title',
    }),
    columnHelper.accessor('action', {
      header: '',
      enableSorting: false,
      enableGlobalFilter: false,
      cell: (cell) => (
        <Stack direction="row" spacing={2}>
          <ItineraryViewIconButton itineraryId={cell.row.original.itineraryID} title={cell.row.original.title} />
          <ItineraryEditIconButton itineraryId={cell.row.original.itineraryID} title={cell.row.original.title} />
          <ItineraryDeleteIconButton
            itineraryId={cell.row.original.itineraryID}
            onDelete={(itineraryId) => {
              // Remove the deleted itinerary from the list
              setItineraryList((prevList) => prevList.filter((itinerary) => itinerary.itineraryID !== itineraryId));
            }}
          />
        </Stack>
      ),
    }),
  ] as Array<ColumnDef<ItineraryDataRowData>>;
};
