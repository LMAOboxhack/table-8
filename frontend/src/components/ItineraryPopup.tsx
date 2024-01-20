import {
    Modal as ChakraModal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'

import { Input } from '@chakra-ui/react'

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'

import { Button, ButtonGroup } from '@chakra-ui/react'

import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: string;
    destination: string;
    amount: number;
    notes: string;
}

const ItineraryPopup: React.FC<ModalProps> = ({ isOpen, onClose, type, destination, amount, notes }) => {
    return (
        <ChakraModal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{type} Destination</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <FormControl>
                    <FormLabel>Destination</FormLabel>
                    <Input placeholder='' value={destination}/>
                </FormControl>

                <FormControl>
                    <FormLabel>Amount</FormLabel>
                    <NumberInput value={amount}>
                        <NumberInputField />
                    </NumberInput>
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Notes</FormLabel>
                    <Input placeholder='' value={notes}/>
                </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='blue'>Save</Button>
                </ModalFooter>
            </ModalContent>
        </ChakraModal>
    )
    
}

export default ItineraryPopup;