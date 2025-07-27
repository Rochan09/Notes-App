import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Spinner,
  } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/users/user_actions';
import { useNavigate } from 'react-router-dom';

export default function Loginpage() {
    const {auth, token, loading, error} = useSelector((state)=>state.userReducer)
    const nav = useNavigate()
    if(auth)
    {
        nav("/notes")
    }
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const handleLogin = ()=>{
        dispatch(getUser({email, password}))
    }
    const [statusIndex, setStatusIndex] = useState(0);
    const statusMessages = [
      '🔐 Logging you in...',
      '📡 Connecting to secure servers...',
      '⚙️ Authenticating your credentials...',
      '📄 Fetching your notes...'
    ];
    useEffect(() => {
      let interval;
      if (loading) {
        setStatusIndex(0);
        interval = setInterval(() => {
          setStatusIndex((prev) => (prev + 1) % statusMessages.length);
        }, 2000);
      } else if (auth) {
        setStatusIndex(-1); // Show success message
      } else {
        setStatusIndex(0);
      }
      return () => clearInterval(interval);
    }, [loading, auth]);
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  onClick={handleLogin}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  isLoading={loading}
                  loadingText="Signing in..."
                  disabled={loading}
                >
                  Sign in
                </Button>
                {loading && (
                  <Stack align="center" mt={4}>
                    <Spinner size="lg" color="blue.400" />
                    <Text color="blue.400" fontWeight="bold">
                      {statusIndex === -1
                        ? '✅ Logged in!'
                        : statusMessages[statusIndex]}
                    </Text>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
}