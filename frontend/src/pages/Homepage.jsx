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
              <Button
                bgGradient="linear(to-r, purple.400, teal.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, purple.500, teal.500)',
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                _active={{
                  transform: 'translateY(0px)',
                }}
                transition="all 0.2s"
                onClick={() => {
                  nav('/login');
                }}>
                Log In
              </Button>
              <Button
                bgGradient="linear(to-r, purple.400, teal.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, purple.500, teal.500)',
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                _active={{
                  transform: 'translateY(0px)',
                }}
                transition="all 0.2s"
                onClick={() => {
                  nav('/register');
                }}>
                Sign Up
              </Button>
            </Stack>
            <Spacer />
          </Stack>
        </Flex>
      </Stack>
    );
  }
