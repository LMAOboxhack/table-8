import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  Flex,
  HStack,
  useColorModeValue,
  Stack,
  Card,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa6';
import ConfirmationDialog from './ConfirmationDialog';
import ItinerarysAPI from '../../pages/api/itinerarys/itinerarys';
import IconWithText from './IconWithText';
import {
  type ItineraryData,
  type ItineraryPostData,
} from '../../types/itinerarys/itinerarys';
import { BiSolidBookAdd } from 'react-icons/bi';
import { type AxiosError } from 'axios';

interface ItineraryFormProps {
  formTitle: string;
  dialogHeader: string;
  dialogBody: string;
  handleData: (itineraryData: ItineraryPostData) => Promise<void> | Promise<ItineraryData>;
  initialData?: ItineraryData | null;
  isLoading?: boolean;
  errorTitle: string;
  submitButtonLabel: string;
}

const ItineraryForm: React.FC<ItineraryFormProps> = ({
  formTitle,
  dialogHeader,
  dialogBody,
  handleData,
  initialData,
  isLoading = false,
  errorTitle,
  submitButtonLabel,
}) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState<number>();

  useEffect(() => {
    if (initialData !== null && initialData !== undefined) {
      setTitle(initialData.title);
      setBudget(initialData.budget);
    }
  }, [initialData]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    handleData({ title, budget })
      .then(() => {
        navigate('/');
      })
      .catch((err: AxiosError<{ errors: Array<{ msg: string }> }>) => {
        const errors = err?.response?.data?.errors;
        if (errors !== undefined) {
          errors.map((error) =>
            toast({
              title: errorTitle,
              description: error.msg,
              status: 'error',
              duration: 9000,
              isClosable: true,
            }),
          );
        }
      });
  };

  const disableSubmit =
    initialData !== undefined && initialData !== null
      ? title === initialData.title &&
        budget === initialData.budget
      : false;

  return (
    <Card m={12} p={8}>
      <form onSubmit={handleSubmit}>
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <Stack spacing={4}>
            <IconWithText text={formTitle} icon={<BiSolidBookAdd size={25} />} fontSize={'2xl'} fontWeight="bold" />
            <HStack mt={2}>
              <FormControl isRequired width={'250%'}>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  required
                />
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel>Budget</FormLabel>
              <Textarea
                placeholder="Budget of itinerary"
                _placeholder={{ color: useColorModeValue('gray.600', 'gray.400') }}
                value={budget}
                onChange={(e) => {
                  setBudget(parseFloat(e.target.value));
                }}
                required
                rows={8}
              />
            </FormControl>

            <Flex mt={4} justifyContent="space-between">
              <ConfirmationDialog
                dialogHeader={dialogHeader}
                dialogBody={dialogBody}
                mainButtonLabel="Cancel"
                leftButtonLabel="No, stay on this form"
                rightButtonLabel="Yes, bring me back"
                onConfirm={() => {
                  navigate('/');
                }}
              />
              <Button type="submit" colorScheme="teal" leftIcon={<FaCheck size={20} />} isDisabled={disableSubmit}>
                {submitButtonLabel}
              </Button>
            </Flex>
          </Stack>
        )}
      </form>
    </Card>
  );
};

export default ItineraryForm;
