import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
    Box, 
    Input, 
    Button, 
    VStack, 
    Heading, 
    HStack,
    useColorModeValue,
    Container,
    Spinner,
    Text,
    IconButton,
    Divider,
    FormControl,
    FormLabel,
    Flex,
    Textarea,
    Stack,
    Badge
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateNotes } from '../redux/notes/note_actions';
import { toast } from 'react-toastify';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { 
    FaBold, 
    FaItalic, 
    FaUnderline, 
    FaStrikethrough,
    FaListUl,
    FaListOl,
    FaLink,
    FaCode,
    FaQuoteLeft,
    FaSave
} from 'react-icons/fa';

export default function EditNotePage() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [noteFound, setNoteFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, data: notes } = useSelector((state) => state.noteReducer);

    // All useColorModeValue hooks must be called at the top level
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBg = useColorModeValue('white', 'rgba(30, 41, 59, 0.95)');
    const textColor = useColorModeValue('gray.800', 'gray.100');
    const textColor600 = useColorModeValue('gray.600', 'gray.400');
    const textColor700 = useColorModeValue('gray.700', 'white');
    const textColor300 = useColorModeValue('gray.600', 'gray.300');
    const bgHover = useColorModeValue('gray.100', 'gray.700');
    const boxShadow = useColorModeValue('0 4px 24px rgba(0,0,0,0.08)', '0 8px 32px 0 rgba(31, 38, 135, 0.18)');
    const borderColor = useColorModeValue('1.5px solid #e2e8f0', '1.5px solid rgba(255,255,255,0.18)');
    const inputBorderColor = useColorModeValue('#e2e8f0', '#4a5568');
    const placeholderColor = useColorModeValue('#7b8db0', '#a0aec0');
    const outlineBorderColor = useColorModeValue('#e2e8f0', '#4a5568');
    const outlineHoverBg = useColorModeValue('gray.50', 'gray.700');
    const buttonBg = useColorModeValue('gray.100', 'gray.700');
    const buttonHover = useColorModeValue('gray.200', 'gray.600');
    const toolbarBg = useColorModeValue('gray.50', 'gray.800');

    useEffect(() => {
        if (notes && notes.length > 0) {
            const noteToEdit = notes.find(note => note._id === id);
            if (noteToEdit) {
                setTitle(noteToEdit.title);
                setBody(noteToEdit.body);
                setNoteFound(true);
            } else {
                setNoteFound(false);
            }
            setIsLoading(false);
        }
    }, [id, notes]);


    const handleSubmit = () => {
        if (!title.trim() || !body.trim()) {
            toast.error("Please fill in both title and body fields");
            return;
        }
        
        dispatch(updateNotes(id, { 
            title: title.trim(), 
            body: body.trim()
        }));
        navigate('/notes');
    };

    const handleCancel = () => {
        navigate('/notes');
    };

    if (isLoading) {
        return (
            <Box bg={bgColor} minH="100vh" py={8}>
                <Container maxW="4xl">
                    <VStack spacing={6} justify="center" minH="50vh">
                        <Spinner size="xl" color="#4F8CFF" />
                        <Text color={textColor600}>Loading note...</Text>
                    </VStack>
                </Container>
            </Box>
        );
    }

    if (!noteFound) {
        return (
            <Box bg={bgColor} minH="100vh" py={8}>
                <Container maxW="4xl">
                    <VStack spacing={6}>
                        <HStack w="100%" justify="space-between" align="center">
                            <Text fontSize="xl" color={textColor600}>
                                Note not found
                            </Text>
                            <Button
                                leftIcon={<ArrowBackIcon />}
                                variant="ghost"
                                onClick={handleCancel}
                                size="lg"
                                color={textColor300}
                                _hover={{ 
                                    bg: bgHover,
                                    transform: 'translateX(2px)'
                                }}
                            >
                                Back to Notes
                            </Button>
                        </HStack>
                    </VStack>
                </Container>
            </Box>
        );
    }

    return (
        <Box bg={bgColor} minH="100vh" py={4}>
            <Container maxW="6xl">
                {/* Header */}
                <HStack spacing={4} mb={6} justify="space-between">
                    <Heading size="lg" color={textColor700}>
                        Edit Note
                    </Heading>
                    <HStack spacing={3}>
                        <Button
                            leftIcon={<FaSave />}
                            colorScheme="blue"
                            onClick={handleSubmit}
                            isLoading={loading}
                            loadingText="Updating..."
                            size="md"
                        >
                            Update Note
                        </Button>
                        <Button
                            leftIcon={<ArrowBackIcon />}
                            variant="ghost"
                            onClick={handleCancel}
                            size="md"
                            color={textColor300}
                            _hover={{ 
                                bg: bgHover,
                                transform: 'translateX(2px)'
                            }}
                        >
                            Back to Notes
                        </Button>
                    </HStack>
                </HStack>

                {/* Main Editor */}
                <Box
                    bg={cardBg}
                    borderRadius="xl"
                    p={6}
                    boxShadow={boxShadow}
                    border={borderColor}
                    style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
                >
                    <VStack spacing={6} align="stretch">
                        {/* Title Input */}
                        <FormControl>
                            <FormLabel fontSize="sm" color={textColor600} fontWeight="600">
                                Enter A Note Title
                            </FormLabel>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Note Title"
                                size="lg"
                                fontSize="lg"
                                fontWeight="500"
                                borderRadius="lg"
                                borderColor={inputBorderColor}
                                bg="transparent"
                                color={textColor700}
                                _placeholder={{ color: placeholderColor }}
                                _focus={{
                                    borderColor: '#4F8CFF',
                                    boxShadow: '0 0 0 2px #4F8CFF'
                                }}
                            />
                        </FormControl>

                        {/* Content Editor Section */}
                                                <FormControl>
                                                        <FormLabel fontSize="sm" color={textColor600} fontWeight="600">
                                                                Enter A Note Description
                                                        </FormLabel>
                                                        <Box
                                                                bg="white"
                                                                borderRadius="xl"
                                                                boxShadow="0 4px 24px rgba(80,112,255,0.10)"
                                                                border="1.5px solid #e2e8f0"
                                                                p={4}
                                                                mb={2}
                                                                sx={{
                                                                    '.ql-toolbar': {
                                                                        borderRadius: '8px 8px 0 0',
                                                                        background: '#f5f8ff',
                                                                        border: 'none',
                                                                        padding: '8px',
                                                                        fontSize: '1.1rem',
                                                                        button: {
                                                                            margin: '0 4px',
                                                                            borderRadius: '6px',
                                                                            transition: 'background 0.2s',
                                                                        },
                                                                        'button:hover': {
                                                                            background: '#e0e7ff',
                                                                        },
                                                                    },
                                                                    '.ql-container': {
                                                                        borderRadius: '0 0 8px 8px',
                                                                        minHeight: '220px',
                                                                        fontSize: '1.1rem',
                                                                        background: '#fff',
                                                                        border: 'none',
                                                                        padding: '12px',
                                                                    },
                                                                    '.ql-editor': {
                                                                        minHeight: '180px',
                                                                        fontSize: '1.1rem',
                                                                        color: '#222',
                                                                    },
                                                                }}
                                                        >
                                                            <ReactQuill
                                                                value={body}
                                                                onChange={setBody}
                                                                theme="snow"
                                                                placeholder="Start writing..."
                                                            />
                                                        </Box>
                                                </FormControl>

                        {/* Footer Info */}
                        <Box textAlign="right">
                            <Text fontSize="sm" color={textColor600}>
                                {body.length} characters • {body.split(/\s+/).filter(word => word.length > 0).length} words
                            </Text>
                        </Box>
                    </VStack>
                </Box>
            </Container>
        </Box>
    );
}