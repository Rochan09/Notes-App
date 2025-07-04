import {
    Button,
    Flex,
    Heading,
    Image,
    Spacer,
    Stack,
    Text,
  } from '@chakra-ui/react';
  import { useNavigate } from 'react-router-dom';

  export default function Homepage() {
    const nav = useNavigate();
    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} alignItems={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} textAlign="center">
              <Text color={'#5b9cf2'} as={'span'}>
                Your Notes
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              A note taking app built using MongoDB, Express, React and Node.JS
            </Text>
            <Stack direction={'row'} spacing={4} justify="center" align="center">
              <button
                className="button-primary"
                onClick={() => {
                  nav("/login");
                }}
              >
                Log In
              </button>
              <button
                className="button-primary"
                onClick={() => {
                  nav("/register");
                }}
              >
                Sign Up
              </button>
            </Stack>
            <Spacer />
            <Image src="/mern.png" maxW="400px" mx="auto" />
          </Stack>
        </Flex>
      </Stack>
    );
  }