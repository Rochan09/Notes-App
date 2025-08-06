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
    const { loading, error } = useSelector((state) => state.userReducer);
    const nav = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
  
    const handleSignUp = () => {
      dispatch(registerUser({ name, email, password }));
    };
  
    const [statusIndex, setStatusIndex] = useState(0);
    const statusMessages = [
      '🚀 Creating your account...',
      '🔐 Encrypting your data...',
      '✅ Almost there...',
    ];
  
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
  
    return (
      <Flex
        minH={'100vh'}
        align={'start'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={24} px={6}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <Heading fontSize={'4xl'} bgGradient="linear(to-r, purple.400, teal.400)" bgClip="text" mb={6} textAlign="center">
                Create your account
              </Heading>
              <FormControl id="userName">
                <FormLabel color={useColorModeValue("purple.600", "purple.300")}>Username</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Text fontSize="lg">👤</Text>
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
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="email">
                <FormLabel color={useColorModeValue("purple.600", "purple.300")}>Email address</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Text fontSize="lg">📧</Text>
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
                  onClick={handleSignUp}
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
                  loadingText="Signing up..."
                  disabled={loading}
                >
                  Sign up
                </Button>
                {loading && (
                  <Stack align="center" mt={4}>
                    <Spinner size="lg" color="purple.400" />
                    <Text color="purple.500" fontWeight="bold">
                      {statusIndex === -1
                        ? '✅ Account created!'
                        : statusMessages[statusIndex]}
                    </Text>
                  </Stack>
                )}
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user?{' '}
                  <Link color={'blue.400'} onClick={() => nav('/login')}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
