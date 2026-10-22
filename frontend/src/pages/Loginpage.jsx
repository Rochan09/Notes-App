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
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Spinner,
    useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/users/user_actions';
import { useNavigate } from 'react-router-dom';

export default function Loginpage() {
    const toast = useToast();
    const [forgotLoading, setForgotLoading] = useState(false);
    // All hooks at the top level
    const {auth, token, loading, error} = useSelector((state)=>state.userReducer)
    const nav = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [showMessages, setShowMessages] = useState(false);
        const [showForgotModal, setShowForgotModal] = useState(false);
        const [forgotEmail, setForgotEmail] = useState("");
        const [forgotStatus, setForgotStatus] = useState("");
    const dispatch = useDispatch()
    
    // Sliding messages for user engagement
    const slidingMessages = [
        "💡 Your notes are being prepared...",
        "🚀 Setting up your workspace...",
        "✨ Organizing your ideas...",
        "🔐 Securing your data...",
        "📚 Loading your personal library...",
        "🎨 Customizing your experience...",
        "🌟 Almost ready for you...",
        "🎉 Welcome to your digital our notes!"
    ];
    
    // All useColorModeValue hooks at the top level
    const bgGradient = useColorModeValue(
        'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #bae6fd 50%, #7dd3fc 75%, #38bdf8 100%)',
        'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)'
    );
    const welcomeBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(0, 0, 0, 0.6)');
    const formGlassBg = useColorModeValue('rgba(255, 255, 255, 0.85)', 'rgba(30, 41, 59, 0.9)');
    const borderColor = useColorModeValue('rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)');
    const textColor = useColorModeValue('gray.700', 'white');
    const linkColor = useColorModeValue('blue.600', 'blue.300');
    const inputBg = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)');
    const cardBg = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(30, 41, 59, 0.9)');
    const subtitleColor = useColorModeValue('gray.600', 'gray.100');
    const inspirationColor = useColorModeValue('gray.500', 'gray.200');
    const titleColor = useColorModeValue('gray.800', 'white');
    const formLabelColor = useColorModeValue("blue.600", "blue.200");
    const inputTextColor = useColorModeValue("gray.800", "white");
    const passwordLabelColor = useColorModeValue("purple.600", "purple.200");
    const buttonColor = useColorModeValue('green.700', 'white');
    const signupLinkColor = useColorModeValue("gray.600", "gray.100");
    const welcomeGradient = useColorModeValue(
        'linear(to-br, blue.400, purple.500, cyan.400)',
        'linear(to-br, blue.300, purple.300, cyan.300)'
    );
    const messageColor = useColorModeValue('blue.600', 'yellow.300');

    useEffect(() => {
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = original; };
    }, []);

    useEffect(() => {
        if(auth) {
            setShowMessages(false); // Hide messages when redirecting
            nav("/notes");
        }
    }, [auth, nav]);

    // Cycle through sliding messages only when showMessages is true
    useEffect(() => {
        let interval;
        if (showMessages) {
            interval = setInterval(() => {
                setCurrentMessageIndex((prev) => (prev + 1) % slidingMessages.length);
            }, 3000); // Change message every 3 seconds
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [showMessages, slidingMessages.length]);

    const handleLogin = () => {
        if (!email.trim() || !password.trim()) {
            toast({
                title: 'Please fill in both email and password.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        setShowMessages(true); // Start showing messages when login begins
        setCurrentMessageIndex(0); // Start from first message
        dispatch(getUser({email, password}));
    }

    return (
        <Flex
            minH={'100vh'}
            h={'100vh'}
            bg={bgGradient}
            position="relative"
            overflow="hidden"
        >
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
                    align="center"
                    justify="center"
                    p={{ base: 8, md: 12, lg: 16 }}
                    position="relative"
                    minH={{ base: '40vh', lg: '100vh' }}
                >
                    <Stack spacing={6} align={{ base: 'center', lg: 'flex-start' }} maxW="500px" w="100%">
                        <Heading 
                            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }} 
                            bgGradient={welcomeGradient} 
                            bgClip="text"
                            textAlign={{ base: 'center', lg: 'left' }}
                            fontWeight="800"
                            lineHeight="1.1"
                        >
                            Welcome back
                        </Heading>
                        
                        <Text 
                            fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                            color={subtitleColor}
                            textAlign={{ base: 'center', lg: 'left' }}
                            fontWeight="500"
                            lineHeight="1.6"
                            maxW="400px"
                        >
                            Your digital notebook awaits ✨
                        </Text>
                        
                        <Text 
                            fontSize={{ base: 'md', md: 'lg' }}
                            color={inspirationColor}
                            textAlign={{ base: 'center', lg: 'left' }}
                            lineHeight="1.7"
                            maxW="450px"
                        >
                            Continue your journey of capturing ideas, organizing thoughts, and bringing your notes to life.
                        </Text>
                    </Stack>
                </Flex>

                <Flex
                    flex={{ base: '1', lg: '1' }}
                    align={{ base: 'flex-start', lg: 'center' }}
                    justify="center"
                    p={{ base: 8, md: 12, lg: 16 }}
                    pt={{ base: 2, md: 3, lg: 4 }}
                    position="relative"
                    minH={{ base: '60vh', lg: '100vh' }}
                    bg={formGlassBg}
                    backdropFilter="blur(20px)"
                    borderLeft={{ base: 'none', lg: '1px solid rgba(255, 255, 255, 0.1)' }}
                    borderTop={{ base: '1px solid rgba(255, 255, 255, 0.1)', lg: 'none' }}
                >
                    <Box w="100%" maxW="400px" position="relative">
                        <Heading 
                            fontSize={{ base: '2xl', md: '3xl' }}
                            color={titleColor}
                            textAlign="center"
                            mb={3}
                        >
                            Sign In
                        </Heading>
                        
                        <form onSubmit={e => { e.preventDefault(); handleLogin(); }}>
                            <Stack spacing={6}>
                                <FormControl id="email">
                                    <FormLabel color={formLabelColor}>
                                        Email address
                                    </FormLabel>
                                    <Input 
                                        value={email} 
                                        onChange={(e)=>setEmail(e.target.value)} 
                                        type="email" 
                                        bg={useColorModeValue("rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)")}
                                        backdropFilter="blur(10px)"
                                        border={useColorModeValue("1px solid rgba(79, 140, 255, 0.2)", "1px solid rgba(255, 255, 255, 0.1)")}
                                        borderRadius="xl"
                                        color={inputTextColor}
                                        placeholder="Enter your email"
                                        _placeholder={{ color: useColorModeValue('#7b8db0', '#a0aec0') }}
                                        _focus={{
                                            borderColor: '#4F8CFF',
                                            boxShadow: '0 0 0 2px #4F8CFF'
                                        }}
                                    />
                                </FormControl>
                                
                                <FormControl id="password">
                                    <FormLabel color={passwordLabelColor}>
                                        Password
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type={showPassword ? 'text' : 'password'}
                                            bg={useColorModeValue("rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)")}
                                            backdropFilter="blur(10px)"
                                            border={useColorModeValue("1px solid rgba(168, 85, 247, 0.2)", "1px solid rgba(255, 255, 255, 0.1)")}
                                            borderRadius="xl"
                                            color={inputTextColor}
                                            placeholder="Enter your password"
                                            _placeholder={{ color: useColorModeValue('#7b8db0', '#a0aec0') }}
                                            _focus={{
                                                borderColor: '#A855F7',
                                                boxShadow: '0 0 0 2px #A855F7'
                                            }}
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
                                   <Text align="right" fontSize="sm" color={linkColor} mt={1} cursor="pointer" _hover={{ textDecoration: 'underline' }} onClick={() => setShowForgotModal(true)}>
                                       Forgot password?
                                   </Text>

                                <Button
                                    type="submit"
                                    bg={useColorModeValue("rgba(34, 197, 94, 0.2)", "rgba(34, 197, 94, 0.8)")}
                                    backdropFilter="blur(10px)"
                                    border={useColorModeValue("1px solid rgba(34, 197, 94, 0.3)", "1px solid rgba(34, 197, 94, 0.6)")}
                                    color={buttonColor}
                                    size="lg"
                                    borderRadius="xl"
                                    w="100%"
                                    isLoading={false}
                                    _hover={{
                                        bg: useColorModeValue("rgba(34, 197, 94, 0.3)", "rgba(34, 197, 94, 0.9)"),
                                        transform: "translateY(-1px)",
                                        boxShadow: useColorModeValue("0 4px 12px rgba(34, 197, 94, 0.3)", "0 4px 12px rgba(34, 197, 94, 0.5)")
                                    }}
                                    transition="all 0.2s"
                                    disabled={loading}
                                >
                                    {loading && showMessages ? (
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            gap={3}
                                            width="100%"
                                        >
                                            <Spinner 
                                                size="sm" 
                                                color={messageColor}
                                                thickness="2px"
                                            />
                                            <Text
                                                key={currentMessageIndex}
                                                fontSize="md"
                                                color={messageColor}
                                                fontWeight="500"
                                                animation="slideInUp 3s ease-in-out, pulse-glow 3s ease-in-out"
                                            >
                                                {slidingMessages[currentMessageIndex]}
                                            </Text>
                                        </Box>
                                    ) : (
                                        "📝 Sign in"
                                    )}
                                </Button>

                                <Text 
                                    align={'center'}
                                    color={signupLinkColor}
                                    fontSize="md"
                                >
                                    Not a member?{' '}
                                    <Link 
                                        color={linkColor} 
                                        onClick={() => nav('/register')}
                                    >
                                        Sign up
                                    </Link>
                                </Text>

                                {/* Sliding Messages removed from below button */}
                            </Stack>
                        </form>
                        {/* Forgot Password Modal */}
                        {showForgotModal && (
                            <Box position="fixed" top={0} left={0} right={0} bottom={0} bg="rgba(0,0,0,0.3)" zIndex={9999} display="flex" alignItems="center" justifyContent="center">
                                <Box bg={cardBg} p={{ base: 4, md: 8 }} borderRadius="2xl" boxShadow="2xl" minW={{ base: '90vw', md: '320px' }} maxW={{ base: '95vw', md: '400px' }} w="full" position="relative" m="auto">
                                    <Heading fontSize="xl" mb={4} color={titleColor} textAlign="center">Forgot Password</Heading>
                                    <Text fontSize="md" mb={2} color={subtitleColor} textAlign="center">Enter your registered email address to reset your password.</Text>
                                    <form onSubmit={e => {
                                        e.preventDefault();
                                        setForgotStatus('');
                                        setForgotLoading(true);
                                        fetch('/api/forgot-password', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ email: forgotEmail })
                                        })
                                        .then(res => res.json())
                                        .then(data => {
                                            setForgotLoading(false);
                                            if (data.status === 1) {
                                                setForgotStatus('success');
                                            } else {
                                                setForgotStatus('error');
                                            }
                                        })
                                        .catch(() => { setForgotLoading(false); setForgotStatus('error'); });
                                    }}>
                                        <FormControl mb={4}>
                                            <FormLabel color={formLabelColor}>Email address</FormLabel>
                                            <Input value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} type="email" placeholder="Enter your email" />
                                        </FormControl>
                                        <Button type="submit" colorScheme="blue" w="100%" mb={2} isLoading={forgotLoading} loadingText="Sending...">Send Reset Link</Button>
                                        <Button variant="ghost" w="100%" onClick={() => { setShowForgotModal(false); setForgotEmail(""); setForgotStatus(""); }}>Cancel</Button>
                                    </form>
                                    {forgotStatus === 'success' && <Text color="green.500" mt={3} textAlign="center">Password reset link sent to your email.</Text>}
                                    {forgotStatus === 'error' && <Text color="red.500" mt={3} textAlign="center">Email not found. Please check and try again.</Text>}
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Flex>
            </Stack>
        </Flex>
    );
}