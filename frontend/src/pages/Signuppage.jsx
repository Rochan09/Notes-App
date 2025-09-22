import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Spinner,
  } from '@chakra-ui/react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useDispatch, useSelector } from 'react-redux';
  import { registerUser } from '../redux/users/user_actions';
  
  export default function Signuppage() {
    const statusMessages = [
      '🚀 Creating your account...',
      '🔐 Encrypting your data...',
      '✅ Almost there...'
    ];
    // Disable scrolling when this page is mounted
    useEffect(() => {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }, []);
    const { loading, error } = useSelector((state) => state.userReducer);
    const nav = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const [statusIndex, setStatusIndex] = useState(0);
    useEffect(() => {
      let interval;
      if (loading) {
        setStatusIndex(0);
        interval = setInterval(() => {
          setStatusIndex((prev) => (prev + 1) % statusMessages.length);
        }, 2000);
      } else if (!loading && !error) {
        setStatusIndex(-1); // Show success message
      } else {
        setStatusIndex(0);
      }
      return () => clearInterval(interval);
    }, [loading, error]);
  
    // Handles the signup form submission
    const handleSignUp = async () => {
      if (!name || !email || !password) return;
      try {
        await dispatch(registerUser({ name, email, password }));
        if (!loading && !error) {
          nav('/login');
        }
      } catch (e) {}
    };
    return (
      <Flex
        minH={'100vh'}
        h={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1629212/pexels-photo-1629212.jpeg?auto=compress&fit=crop&w=1200&q=100')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Overlay */}
        <Box position="absolute" top={0} left={0} w="100vw" h="100vh" bg="rgba(0,0,0,0.45)" zIndex={0} />
        <Stack spacing={4} mx={'auto'} maxW={{ base: '95vw', sm: '90vw', md: 'md' }} py={0} px={0} position="relative" zIndex={1} w="100%" h="100%" align="center" justify="center">
          <Box
            rounded={'2xl'}
            bg={useColorModeValue('rgba(255,255,255,0.92)', 'rgba(26,32,44,0.92)')}
            boxShadow={'2xl'}
            p={{ base: 3, sm: 4, md: 6 }}
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              minWidth: '0',
              maxWidth: '100vw',
              width: '100%',
              minHeight: '0',
            }}
          >
            <Stack spacing={3}>
              <Heading fontSize={'2xl'} bgGradient="linear(to-r, purple.400, teal.400)" bgClip="text" mb={2} textAlign="center">
                Create your account
              </Heading>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={2} align="center" justify="center" w="100%">
                <FormControl id="userName" flex={1} minW={0} w="100%">
                  <FormLabel color={useColorModeValue("purple.600", "purple.300")} fontSize="sm">Username</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Text fontSize="md">👤</Text>
                    </InputLeftElement>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      borderColor={useColorModeValue("purple.200", "purple.400")}
                      _hover={{ borderColor: useColorModeValue("purple.300", "purple.300") }}
                      _focus={{
                        borderColor: "purple.400",
                        boxShadow: useColorModeValue("0 0 0 1px #9F7AEA", "0 0 0 1px #B794F6")
                      }}
                      fontSize="sm"
                      py={2}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="email" flex={1} minW={0} w="100%">
                  <FormLabel color={useColorModeValue("purple.600", "purple.300")} fontSize="sm">Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Text fontSize="md">📧</Text>
                    </InputLeftElement>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      borderColor={useColorModeValue("purple.200", "purple.400")}
                      _hover={{ borderColor: useColorModeValue("purple.300", "purple.300") }}
                      _focus={{
                        borderColor: "purple.400",
                        boxShadow: useColorModeValue("0 0 0 1px #9F7AEA", "0 0 0 1px #B794F6")
                      }}
                      fontSize="sm"
                      py={2}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
              <FormControl id="password">
                <FormLabel color={useColorModeValue("teal.600", "teal.300")} fontSize="sm">Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Text fontSize="md">🔒</Text>
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
                    fontSize="sm"
                    py={2}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                      size="sm"
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                onClick={handleSignUp}
                bgGradient="linear(to-r, purple.400, teal.400)"
                color={'white'}
                size="md"
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
                loadingText="Signing up..."
                disabled={loading}
                mt={2}
              >
                Sign up
              </Button>
              {loading && (
                <Stack align="center" mt={2}>
                  <Spinner size="md" color="purple.400" />
                  <Text color="purple.500" fontWeight="bold" fontSize="sm">
                    {statusIndex === -1
                      ? '✅ Account created!'
                      : statusMessages[statusIndex]}
                  </Text>
                </Stack>
              )}
              <Text align={'center'} fontSize="sm" pt={2}>
                Already a user?{' '}
                <Link color={'blue.400'} onClick={() => nav('/login')}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
