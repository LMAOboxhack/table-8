import {
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack
} from '@chakra-ui/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaLock, FaUserAlt } from "react-icons/fa";

type IFormInputs = {
  username: string;
  password: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const onSubmit: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {
    // Handle registration
    console.log(data);
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="teal.400">Register</Heading>
        <Card minW={{ base: "90%", md: "468px" }} mt={3}>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                spacing={4}
                p="1rem"
              >
                <FormControl isInvalid={errors.email === null}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                    >
                      <FaUserAlt color="gray.300" />
                    </InputLeftElement>
                    <Input type="email" placeholder="E-mail Address" {...register('email')} />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.email && errors.email.message?.toString()}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password === null}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                    >
                      <FaLock color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message?.toString()}
                  </FormErrorMessage>
                </FormControl>
                <Button type="submit">
                  Register
                </Button>
              </Stack>
            </form>
          </CardBody>
        </Card>
      </Stack>
    </Flex>
  )
}
