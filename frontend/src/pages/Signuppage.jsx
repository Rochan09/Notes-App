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
    useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/users/user_actions';

export default function Signuppage() {
    const toast = useToast();
    const statusMessages = [
        { emoji: '👨‍💼', text: 'Creating your secure account...' },
        { emoji: '🔐', text: 'Encrypting your data...' },
        { emoji: '🛡️', text: 'Setting up security protocols...' },
        { emoji: '✅', text: 'Welcome aboard!' }
    ];

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
            }, 1800);
        } else if (!loading && !error) {
            setStatusIndex(-1);
        } else {
            setStatusIndex(0);
        }
        return () => clearInterval(interval);
    }, [loading, error]);

    // All useColorModeValue hooks must be called at the top level
    const particleBg = useColorModeValue('rgba(79, 140, 255, 0.3)', 'rgba(79, 140, 255, 0.5)');
    const loadingTextColor = useColorModeValue("green.600", "green.200");
    const backgroundGradientLight = 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #bae6fd 50%, #7dd3fc 75%, #38bdf8 100%)';
    const backgroundGradientDark = 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)';
    const particleBgImageLight = 'radial-gradient(circle at 20% 80%, rgba(79, 140, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)';
    const particleBgImageDark = 'radial-gradient(circle at 20% 80%, rgba(79, 140, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)';

    const handleSignUp = async () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            toast({
                title: 'Please fill in all fields.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
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
            bg={useColorModeValue(
                backgroundGradientLight,
                backgroundGradientDark
            )}
            position="relative"
            overflow="hidden"
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: useColorModeValue(
                    particleBgImageLight,
                    particleBgImageDark
                ),
                animation: 'float-bg 20s ease-in-out infinite',
            }}
            sx={{
                '@keyframes float-bg': {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                    '33%': { transform: 'translate(-10px, -10px) scale(1.02)' },
                    '66%': { transform: 'translate(10px, -5px) scale(0.98)' },
                },
            }}
        >
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                pointerEvents="none"
                zIndex={0}
            >
                {[...Array(8)].map((_, i) => (
                    <Box
                        key={i}
                        position="absolute"
                        w="4px"
                        h="4px"
                        bg={particleBg}
                        borderRadius="50%"
                        left={`${Math.random() * 100}%`}
                        top={`${Math.random() * 100}%`}
                        animation={`float-particle-${i % 3} ${4 + i}s ease-in-out infinite`}
                        sx={{
                            [`@keyframes float-particle-0`]: {
                                '0%, 100%': { transform: 'translateY(0px) scale(1)', opacity: 0.3 },
                                '50%': { transform: 'translateY(-20px) scale(1.2)', opacity: 0.8 },
                            },
                            [`@keyframes float-particle-1`]: {
                                '0%, 100%': { transform: 'translateY(0px) translateX(0px) scale(1)', opacity: 0.4 },
                                '50%': { transform: 'translateY(-15px) translateX(10px) scale(1.1)', opacity: 0.9 },
                            },
                            [`@keyframes float-particle-2`]: {
                                '0%, 100%': { transform: 'translateY(0px) translateX(0px) scale(1)', opacity: 0.2 },
                                '50%': { transform: 'translateY(-25px) translateX(-5px) scale(1.3)', opacity: 0.7 },
                            },
                        }}
                    />
                ))}
            </Box>
            
            <Stack 
                direction={{ base: 'column', lg: 'row' }} 
                spacing={0} 
                h="100vh" 
                w="100%" 
                position="relative" 
                zIndex={1}
            >
                <Flex
                    flex={{ base: '1', lg: '1' }}
                    align="flex-start"
                    justify="center"
                    p={{ base: 8, md: 12, lg: 16 }}
                    pt={{ base: 6, md: 8, lg: 10 }}
                    position="relative"
                    minH={{ base: '40vh', lg: '100vh' }}
                >
                    <Stack spacing={6} align={{ base: 'center', lg: 'flex-start' }} maxW="500px" w="100%">
                        <Heading 
                            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }} 
                            bgGradient={useColorModeValue(
                                "linear(to-br, green.600, emerald.600, teal.500)", 
                                "linear(to-br, green.300, emerald.300, teal.300)"
                            )} 
                            bgClip="text"
                            textAlign={{ base: 'center', lg: 'left' }}
                            fontWeight="800"
                            lineHeight="1.1"
                            filter="drop-shadow(0 4px 12px rgba(34, 197, 94, 0.2))"
                        >
                            Join the journey
                        </Heading>
                        
                        <Text 
                            fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                            color={useColorModeValue('gray.600', 'gray.100')}
                            textAlign={{ base: 'center', lg: 'left' }}
                            fontWeight="500"
                            lineHeight="1.6"
                            maxW="400px"
                        >
                            Start your note-taking adventure ✨
                        </Text>
                        
                        <Text 
                            fontSize={{ base: 'md', md: 'lg' }}
                            color={useColorModeValue('gray.500', 'gray.200')}
                            textAlign={{ base: 'center', lg: 'left' }}
                            lineHeight="1.7"
                            maxW="450px"
                        >
                            Create your free account and unlock the power of organized thinking. Join thousands of users who trust us with their ideas.
                        </Text>
                        
                        {/* Animated floating elements */}
                        <Box 
                            position="relative" 
                            h="80px" 
                            w="100%" 
                            maxW="300px" 
                            justify={{ base: 'center', lg: 'flex-start' }} 
                            pt={4}
                            sx={{
                                '@keyframes float-bubble-1': {
                                    '0%, 100%': { 
                                        transform: 'translateY(0px) translateX(0px) scale(1) rotate(0deg)',
                                        opacity: '0.8'
                                    },
                                    '33%': { 
                                        transform: 'translateY(-15px) translateX(10px) scale(1.1) rotate(5deg)',
                                        opacity: '1'
                                    },
                                    '66%': { 
                                        transform: 'translateY(5px) translateX(-5px) scale(0.95) rotate(-3deg)',
                                        opacity: '0.9'
                                    },
                                },
                                '@keyframes float-bubble-2': {
                                    '0%, 100%': { 
                                        transform: 'translateY(0px) translateX(0px) scale(1) rotate(0deg)',
                                        opacity: '0.7'
                                    },
                                    '50%': { 
                                        transform: 'translateY(-20px) translateX(-8px) scale(1.15) rotate(-8deg)',
                                        opacity: '1'
                                    },
                                },
                                '@keyframes create-account-animation': {
                                    '0%': { 
                                        transform: 'translateY(0px) scale(1)',
                                        opacity: '0.6'
                                    },
                                    '25%': { 
                                        transform: 'translateY(-10px) scale(1.1)',
                                        opacity: '1'
                                    },
                                    '50%': { 
                                        transform: 'translateY(-5px) scale(1.05)',
                                        opacity: '0.9'
                                    },
                                    '75%': { 
                                        transform: 'translateY(-15px) scale(1.15)',
                                        opacity: '1'
                                    },
                                    '100%': { 
                                        transform: 'translateY(0px) scale(1)',
                                        opacity: '0.8'
                                    },
                                },
                                '@keyframes glow-pulse': {
                                    '0%, 100%': { 
                                        boxShadow: '0 0 20px rgba(34, 197, 94, 0.3), 0 0 40px rgba(34, 197, 94, 0.1)',
                                    },
                                    '50%': { 
                                        boxShadow: '0 0 30px rgba(34, 197, 94, 0.5), 0 0 60px rgba(34, 197, 94, 0.2)',
                                    },
                                }
                            }}
                        >
                            {/* Floating bubble 1 */}
                            <Box
                                position="absolute"
                                left="20px"
                                top="10px"
                                w="50px"
                                h="50px"
                                bg="linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.3))"
                                borderRadius="full"
                                border="2px solid rgba(34, 197, 94, 0.3)"
                                backdropFilter="blur(10px)"
                                animation="float-bubble-1 4s ease-in-out infinite, glow-pulse 3s ease-in-out infinite"
                                _before={{
                                    content: '""',
                                    position: 'absolute',
                                    top: '15px',
                                    left: '15px',
                                    w: '20px',
                                    h: '20px',
                                    bg: 'rgba(255, 255, 255, 0.4)',
                                    borderRadius: 'full',
                                    filter: 'blur(1px)',
                                }}
                            />
                            
                            {/* Floating bubble 2 */}
                            <Box
                                position="absolute"
                                right="30px"
                                top="5px"
                                w="35px"
                                h="35px"
                                bg="linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(20, 184, 166, 0.35))"
                                borderRadius="full"
                                border="2px solid rgba(16, 185, 129, 0.4)"
                                backdropFilter="blur(8px)"
                                animation="float-bubble-2 5s ease-in-out infinite 0.5s, glow-pulse 4s ease-in-out infinite 1s"
                                _before={{
                                    content: '""',
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    w: '15px',
                                    h: '15px',
                                    bg: 'rgba(255, 255, 255, 0.5)',
                                    borderRadius: 'full',
                                    filter: 'blur(1px)',
                                }}
                            />
                            
                            {/* Account Creation Animation */}
                            <Box
                                position="absolute"
                                left="120px"
                                top="25px"
                                w="45px"
                                h="45px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                bg="linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(16, 185, 129, 0.4))"
                                borderRadius="full"
                                border="2px solid rgba(34, 197, 94, 0.5)"
                                backdropFilter="blur(15px)"
                                animation="create-account-animation 4s ease-in-out infinite, glow-pulse 3s ease-in-out infinite 0.5s"
                                boxShadow="0 4px 20px rgba(34, 197, 94, 0.3)"
                            >
                                <Text 
                                    fontSize="18px" 
                                    filter="drop-shadow(0 0 4px rgba(255,255,255,0.8))"
                                    sx={{
                                        '@keyframes user-create': {
                                            '0%, 100%': { transform: 'scale(1)' },
                                            '50%': { transform: 'scale(1.2)' }
                                        },
                                        animation: 'user-create 2s ease-in-out infinite'
                                    }}
                                >
                                    👤
                                </Text>
                                {/* Plus sign for "creating" */}
                                <Text 
                                    position="absolute"
                                    top="-5px"
                                    right="-5px"
                                    fontSize="12px"
                                    color="white"
                                    bg="rgba(34, 197, 94, 0.8)"
                                    borderRadius="full"
                                    w="16px"
                                    h="16px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    fontWeight="bold"
                                    sx={{
                                        '@keyframes plus-pulse': {
                                            '0%, 100%': { transform: 'scale(0.8)', opacity: '0.7' },
                                            '50%': { transform: 'scale(1.1)', opacity: '1' }
                                        },
                                        animation: 'plus-pulse 1.5s ease-in-out infinite'
                                    }}
                                >
                                    +
                                </Text>
                            </Box>
                        </Box>
                    </Stack>
                </Flex>

                <Flex
                    flex={{ base: '1', lg: '1' }}
                    align={{ base: 'flex-start', lg: 'center' }}
                    justify="center"
                    p={{ base: 6, md: 8, lg: 12 }}
                    pt={{ base: 2, md: 3, lg: 4 }}
                    position="relative"
                    minH={{ base: '60vh', lg: '100vh' }}
                    bg={useColorModeValue(
                        'rgba(255, 255, 255, 0.95)',
                        'rgba(30, 41, 59, 0.15)'
                    )}
                    backdropFilter="blur(20px)"
                    borderLeft={{ base: 'none', lg: '1px solid rgba(255, 255, 255, 0.1)' }}
                    borderTop={{ base: '1px solid rgba(255, 255, 255, 0.1)', lg: 'none' }}
                >
                    <Box w="100%" maxW="400px" position="relative">
                        <Heading 
                            fontSize={{ base: '2xl', md: '3xl' }}
                            color={useColorModeValue('gray.800', 'white')}
                            textAlign="center"
                            mb={2}
                        >
                            Create Account
                        </Heading>
                        
                        <form onSubmit={e => { e.preventDefault(); handleSignUp(); }}>
                            <Stack spacing={4}>
                                <FormControl id="userName">
                                    <FormLabel color={useColorModeValue("green.600", "green.200")}>
                                        Username
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none">
                                            <Text fontSize="lg">👤</Text>
                                        </InputLeftElement>
                                        <Input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            type="text"
                                            bg="rgba(255, 255, 255, 0.1)"
                                            backdropFilter="blur(10px)"
                                            border="1px solid rgba(34, 197, 94, 0.2)"
                                            borderRadius="xl"
                                            color={useColorModeValue("gray.800", "white")}
                                            placeholder="Enter your username"
                                            py={4}
                                        />
                                    </InputGroup>
                                </FormControl>

                                <FormControl id="email">
                                    <FormLabel color={useColorModeValue("emerald.600", "emerald.200")}>
                                        Email
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none">
                                            <Text fontSize="lg">📧</Text>
                                        </InputLeftElement>
                                        <Input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            bg="rgba(255, 255, 255, 0.1)"
                                            backdropFilter="blur(10px)"
                                            border="1px solid rgba(16, 185, 129, 0.2)"
                                            borderRadius="xl"
                                            color={useColorModeValue("gray.800", "white")}
                                            placeholder="Enter your email"
                                            py={4}
                                        />
                                    </InputGroup>
                                </FormControl>

                                <FormControl id="password">
                                    <FormLabel color={useColorModeValue("teal.600", "teal.200")}>
                                        Password
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none">
                                            <Text fontSize="lg">🔒</Text>
                                        </InputLeftElement>
                                        <Input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type={showPassword ? 'text' : 'password'}
                                            bg="rgba(255, 255, 255, 0.1)"
                                            backdropFilter="blur(10px)"
                                            border="1px solid rgba(20, 184, 166, 0.2)"
                                            borderRadius="xl"
                                            color={useColorModeValue("gray.800", "white")}
                                            placeholder="Enter your password"
                                            py={4}
                                        />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>

                                <Button
                                    type="submit"
                                    bg={useColorModeValue("rgba(34, 197, 94, 0.2)", "rgba(34, 197, 94, 0.8)")}
                                    backdropFilter="blur(10px)"
                                    border={useColorModeValue("1px solid rgba(34, 197, 94, 0.3)", "1px solid rgba(34, 197, 94, 0.6)")}
                                    color={useColorModeValue('green.700', 'white')}
                                    size="lg"
                                    borderRadius="xl"
                                    fontWeight="bold"
                                    fontSize="md"
                                    letterSpacing="wide"
                                    py={5}
                                    w="100%"
                                    boxShadow={useColorModeValue("0 8px 25px rgba(34, 197, 94, 0.2)", "0 8px 25px rgba(34, 197, 94, 0.4)")}
                                    _hover={{
                                        bg: useColorModeValue("rgba(34, 197, 94, 0.3)", "rgba(34, 197, 94, 0.9)"),
                                        borderColor: useColorModeValue("rgba(34, 197, 94, 0.5)", "rgba(34, 197, 94, 0.8)"),
                                        boxShadow: useColorModeValue("0 12px 35px rgba(34, 197, 94, 0.3), 0 0 0 3px rgba(34, 197, 94, 0.1)", "0 12px 35px rgba(34, 197, 94, 0.5), 0 0 0 3px rgba(34, 197, 94, 0.2)"),
                                        transform: "translateY(-2px)",
                                    }}
                                    _active={{
                                        transform: "translateY(0px)",
                                        boxShadow: useColorModeValue("0 4px 15px rgba(34, 197, 94, 0.3)", "0 4px 15px rgba(34, 197, 94, 0.5)"),
                                    }}
                                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                    isLoading={loading}
                                    loadingText="Signing up..."
                                    disabled={loading}
                                >
                                    📝 Sign up
                                </Button>

                                <Text 
                                    align={'center'}
                                    color={useColorModeValue("gray.600", "gray.100")}
                                    fontSize="md"
                                    pt={4}
                                >
                                    Already a user?{' '}
                                    <Link 
                                        color={useColorModeValue('blue.600', 'blue.300')} 
                                        fontWeight="600"
                                        onClick={() => nav('/login')}
                                        _hover={{
                                            color: useColorModeValue('blue.700', 'blue.200'),
                                            textDecoration: 'none',
                                            textShadow: '0 0 8px rgba(79, 140, 255, 0.5)'
                                        }}
                                        transition="all 0.2s ease"
                                    >
                                        Login
                                    </Link>
                                </Text>
                            </Stack>
                        </form>
                        
                        {loading && (
                            <Box 
                                position="absolute" 
                                top="0" 
                                left="0" 
                                right="0" 
                                bottom="0" 
                                bg="rgba(255, 255, 255, 0.1)"
                                backdropFilter="blur(15px)"
                                WebkitBackdropFilter="blur(15px)"
                                borderRadius="xl"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                zIndex="10"
                            >
                                <Box
                                    fontSize="4xl"
                                    mb={4}
                                    style={{
                                        animation: 'bounce 1.5s infinite',
                                        transformOrigin: 'center bottom',
                                        filter: 'drop-shadow(0 4px 8px rgba(34, 197, 94, 0.3))'
                                    }}
                                    sx={{
                                        '@keyframes bounce': {
                                            '0%, 20%, 50%, 80%, 100%': {
                                                transform: 'translateY(0)'
                                            },
                                            '40%': {
                                                transform: 'translateY(-20px) scale(1.1)'
                                            },
                                            '60%': {
                                                transform: 'translateY(-10px) scale(1.05)'
                                            }
                                        }
                                    }}
                                >
                                    {statusIndex === -1 ? '🎉' : statusMessages[statusIndex]?.emoji}
                                </Box>
                                <Box
                                    mb={4}
                                    p={3}
                                    borderRadius="full"
                                    bg="rgba(34, 197, 94, 0.1)"
                                    border="1px solid rgba(34, 197, 94, 0.2)"
                                >
                                    <Spinner size="lg" color="green.400" />
                                </Box>
                                <Text 
                                    color={loadingTextColor} 
                                    fontWeight="600" 
                                    textAlign="center"
                                    fontSize="md"
                                    px={4}
                                    lineHeight="1.5"
                                    bg="rgba(255, 255, 255, 0.1)"
                                    backdropFilter="blur(10px)"
                                    borderRadius="lg"
                                    p={3}
                                    border="1px solid rgba(34, 197, 94, 0.2)"
                                >
                                    {statusIndex === -1
                                        ? '🎉 Account created successfully!'
                                        : statusMessages[statusIndex]?.text}
                                </Text>
                            </Box>
                        )}
                    </Box>
                </Flex>
            </Stack>
        </Flex>
    );
}