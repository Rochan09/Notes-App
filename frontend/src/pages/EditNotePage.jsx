import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Input, 
    Textarea, 
    Button, 
    VStack, 
    Heading, 
    HStack,
    useColorModeValue,
    Container,
    Spinner,
    Text
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateNotes } from '../redux/notes/note_actions';
import { toast } from 'react-toastify';
import { ArrowBackIcon } from '@chakra-ui/icons';

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
    const cardBg = useColorModeValue('white', 'rgba(40,54,85,0.85)');
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
        
        dispatch(updateNotes(id, { title: title.trim(), body: body.trim() }));
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
                        <Button
                            leftIcon={<ArrowBackIcon />}
                            variant="ghost"
                            onClick={handleCancel}
                            size="lg"
                            alignSelf="flex-start"
                            color={textColor300}
                            _hover={{ 
                                bg: bgHover,
                                transform: 'translateX(-2px)'
                            }}
                        >
                            Back to Notes
                        </Button>
                        <Text fontSize="xl" color={textColor600}>
                            Note not found
                        </Text>
                    </VStack>
                </Container>
            </Box>
        );
    }

    return (
        <Box bg={bgColor} minH="100vh" py={8}>
            <Container maxW="4xl">
                <VStack spacing={6} align="stretch">
                    {/* Header */}
                    <HStack spacing={4}>
                        <Button
                            leftIcon={<ArrowBackIcon />}
                            variant="ghost"
                            onClick={handleCancel}
                            size="lg"
                            color={textColor300}
                            _hover={{ 
                                bg: bgHover,
                                transform: 'translateX(-2px)'
                            }}
                        >
                            Back to Notes
                        </Button>
                        <Heading size="xl" color={textColor700}>
                            Edit Note
                        </Heading>
                    </HStack>

                    {/* Note Editor */}
                    <Box
                        bg={cardBg}
                        borderRadius="xl"
                        p={8}
                        boxShadow={boxShadow}
                        border={borderColor}
                        style={{backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)'}}
                    >
                        <VStack spacing={6} align="stretch">
                            <Input
                                placeholder="Enter note title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                size="lg"
                                fontSize="xl"
                                fontWeight="bold"
                                borderRadius="lg"
                                borderColor={inputBorderColor}
                                _focus={{ borderColor: '#4F8CFF', boxShadow: '0 0 0 2px #4F8CFF' }}
                                _placeholder={{ color: placeholderColor }}
                            />
                            
                            <Textarea
                                placeholder="Write your note here..."
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                minH="400px"
                                fontSize="md"
                                borderRadius="lg"
                                resize="vertical"
                                borderColor={inputBorderColor}
                                _focus={{ borderColor: '#4F8CFF', boxShadow: '0 0 0 2px #4F8CFF' }}
                                _placeholder={{ color: placeholderColor }}
                            />

                            {/* Action Buttons */}
                            <HStack spacing={4} justify="flex-end" pt={4}>
                                <Button
                                    onClick={handleCancel}
                                    size="lg"
                                    variant="outline"
                                    px={8}
                                    borderColor={outlineBorderColor}
                                    _hover={{ bg: outlineHoverBg }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    size="lg"
                                    bgGradient="linear(to-r, #4F8CFF, #01d8fb)"
                                    color="white"
                                    px={8}
                                    isLoading={loading}
                                    _hover={{ 
                                        bgGradient: 'linear(to-r, #6fa8ff, #4F8CFF)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: 'lg'
                                    }}
                                    transition="all 0.2s"
                                >
                                    Update Note
                                </Button>
                            </HStack>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
}