import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
    Box, 
    Input, 
    Textarea, 
    Button, 
    VStack, 
    Heading, 
    HStack,
    useColorModeValue,
    Container
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNotes } from '../redux/notes/note_actions';
import { toast } from 'react-toastify';
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function CreateNotePage() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.noteReducer);

    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBg = useColorModeValue('white', 'rgba(40,54,85,0.85)');

    const handleSubmit = () => {
        if (!title.trim() || !body.trim()) {
            toast.error("Please fill in both title and body fields");
            return;
        }
        
        dispatch(createNotes({ title: title.trim(), body: body.trim() }));
        navigate('/notes');
    };

    const handleCancel = () => {
        navigate('/notes');
    };

    return (
        <Box bg={bgColor} minH="100vh" py={8}>
            <Container maxW="4xl">
                <VStack spacing={6} align="stretch">
                    {/* Header */}
                    <HStack spacing={4} justify="space-between" align="center">
                        <Heading size="xl" color={useColorModeValue('gray.700', 'white')}>
                            Create New Note
                        </Heading>
                        <Button
                            leftIcon={<ArrowBackIcon />}
                            variant="ghost"
                            onClick={handleCancel}
                            size="lg"
                            color={useColorModeValue('gray.600', 'gray.300')}
                            _hover={{ 
                                bg: useColorModeValue('gray.100', 'gray.700'),
                                transform: 'translateX(2px)'
                            }}
                        >
                            Back to Notes
                        </Button>
                    </HStack>

                    {/* Note Editor */}
                    <Box
                        bg={cardBg}
                        borderRadius="xl"
                        p={8}
                        boxShadow={useColorModeValue('0 4px 24px rgba(0,0,0,0.08)', '0 8px 32px 0 rgba(31, 38, 135, 0.18)')}
                        border={useColorModeValue('1.5px solid #e2e8f0', '1.5px solid rgba(255,255,255,0.18)')}
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
                                borderColor={useColorModeValue('#e2e8f0', '#4a5568')}
                                _focus={{ borderColor: '#4F8CFF', boxShadow: '0 0 0 2px #4F8CFF' }}
                                _placeholder={{ color: useColorModeValue('#7b8db0', '#a0aec0') }}
                            />
                            
                                                        <Box
                                                                bg="white"
                                                                borderRadius="xl"
                                                                boxShadow="0 4px 24px rgba(80,112,255,0.10)"
                                                                border="1.5px solid #e2e8f0"
                                                                p={2}
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
                                                                placeholder="Write your note here..."
                                                            />
                                                        </Box>

                            {/* Action Buttons */}
                            <HStack spacing={4} justify="flex-end" pt={4}>
                                <Button
                                    onClick={handleCancel}
                                    size="lg"
                                    variant="outline"
                                    px={8}
                                    borderColor={useColorModeValue('#e2e8f0', '#4a5568')}
                                    _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
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
                                    Create Note
                                </Button>
                            </HStack>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
}