import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Spinner,
    Icon,
  } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/users/user_actions';
import { useNavigate } from 'react-router-dom';

export default function Loginpage() {
    // Disable scrolling when this page is mounted
    useEffect(() => {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }, []);
    const {auth, token, loading, error} = useSelector((state)=>state.userReducer)
    const nav = useNavigate()
    if(auth)
    {
        nav("/notes")
    }
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const handleLogin = ()=>{
        dispatch(getUser({email, password}))
    }
    const [statusIndex, setStatusIndex] = useState(0);
    const statusMessages = [
      '🔐 Logging you in...',
      '📡 Connecting to secure servers...',
      '🔒 Verifying your identity...',
      '🔑 Retrieving your credentials...',
      '📊 Syncing your dashboard...',
      '✅ Almost there, launching now...'

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
        h={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1629212/pexels-photo-1629212.jpeg)',
          backgroundSize: '100vw 100vh',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Overlay */}
        <Box position="absolute" top={0} left={0} w="100vw" h="100vh" bg="rgba(0,0,0,0.45)" zIndex={0} />
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={0} px={0} position="relative" zIndex={1} w="100%" h="100%" align="center" justify="center">
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} bgGradient="linear(to-r, purple.400, teal.400)" bgClip="text">
              Welcome back
            </Heading>
            <Text 
              fontSize={'lg'} 
              color={'white'}
              textShadow="0 2px 8px rgba(0,0,0,0.7)"
            >
              Taking notes is the first step to remembering better✨
            </Text>
          </Stack>
          <Box
            rounded={'2xl'}
            bg={useColorModeValue('rgba(255,255,255,0.92)', 'rgba(26,32,44,0.92)')}
            boxShadow={'2xl'}
            p={10}
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              minWidth: '340px',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            <form
              onSubmit={e => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel color={useColorModeValue("purple.600", "purple.300")}>Email address</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Text fontSize="lg">📧</Text>
                    </InputLeftElement>
                    <Input 
                      value={email} 
                      onChange={(e)=>setEmail(e.target.value)} 
                      type="email" 
                      borderColor={useColorModeValue("purple.200", "purple.400")}
                      _hover={{ borderColor: useColorModeValue("purple.300", "purple.300") }}
                      _focus={{ 
                        borderColor: "purple.400", 
                        boxShadow: useColorModeValue("0 0 0 1px #9F7AEA", "0 0 0 1px #B794F6") 
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="password">
                  <FormLabel color={useColorModeValue("teal.600", "teal.300")}>Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Text fontSize="lg">🔒</Text>
                    </InputLeftElement>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? 'text' : 'password'}
                      borderColor={useColorModeValue("teal.200", "teal.400")}
                      _hover={{ borderColor: useColorModeValue("teal.300", "teal.300") }}
                      _focus={{
                        borderColor: "teal.400",
                        boxShadow: useColorModeValue("0 0 0 1px #38B2AC", "0 0 0 1px #4FD1C7")
                      }}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    type="submit"
                    bgGradient="linear(to-r, purple.400, teal.400)"
                    color={'white'}
                    size="lg"
                    _hover={{
                      bgGradient: "linear(to-r, purple.500, teal.500)",
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                    _active={{
                      transform: "translateY(0px)",
                    }}
                    transition="all 0.2s"
                    isLoading={loading}
                    loadingText="Signing in..."
                    disabled={loading}
                  >
                    Sign in
                  </Button>
                  {loading && (
                    <Stack align="center" mt={4}>
                      <Spinner size="lg" color="purple.400" />
                      <Text color="purple.500" fontWeight="bold">
                        {statusIndex === -1
                          ? '✅ Logged in!'
                          : statusMessages[statusIndex]}
                      </Text>
                    </Stack>
                  )}
                </Stack>
                <Stack pt={6}>
                  <Text align={'center'}>
                    Not a member?{' '}
                    <Link color={'blue.400'} onClick={() => nav('/register')}>
                      Sign up
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    );
}
