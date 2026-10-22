
import { Button, Box, Text, Badge, HStack, VStack, IconButton, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import { FaTrashAlt, FaEdit, FaThumbtack } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotes, updateNotes } from "../../../redux/notes/note_actions";
import { useNavigate } from 'react-router-dom';


export default function NoteCard({title, body, user, _id, createdAt, updatedAt, important, pinned, noteNumber}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.noteReducer);
    const [isPinned, setIsPinned] = useState(Boolean(pinned));
    const [isPinning, setIsPinning] = useState(false);
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const cancelRef = useRef();

    const handleEdit = () => {
        navigate(`/notes/edit/${_id}`);
    };

    const handleDelete = () => {
        dispatch(deleteNotes(_id));
        onDeleteClose();
    };

    const handlePin = () => {
        const nextPinned = !isPinned;
        setIsPinned(nextPinned);
        setIsPinning(true);
        dispatch(updateNotes(_id, { pinned: nextPinned }, { silent: true }))
            .then((didSave) => {
                if (!didSave) {
                    setIsPinned(!nextPinned);
                }
            })
            .finally(() => setIsPinning(false));
    };

    useEffect(() => {
        setIsPinned(Boolean(pinned));
    }, [pinned]);

    // Format timestamp function
    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const now = new Date();
        const diffInMs = now - date;
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        // Get formatted date and time
        const timeString = date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        const dateString = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });

        if (diffInMinutes < 1) return `Just now (${timeString})`;
        if (diffInMinutes < 60) return `${diffInMinutes}m ago (${timeString})`;
        if (diffInHours < 24) return `${diffInHours}h ago (${timeString})`;
        if (diffInDays < 7) return `${diffInDays}d ago (${dateString} ${timeString})`;
        
        // For older notes, show full date and time
        return `${dateString} at ${timeString}`;
    };

    // Determine which timestamp to show and what label to use
    const getDisplayTimestamp = () => {
        const createdTime = createdAt ? new Date(createdAt) : null;
        const updatedTime = updatedAt ? new Date(updatedAt) : null;
        
        // If both timestamps exist and updatedAt is significantly later than createdAt (more than 1 minute)
        if (createdTime && updatedTime && (updatedTime - createdTime) > 60000) {
            return {
                timestamp: updatedAt,
                label: 'Updated',
                icon: '✏️'
            };
        }
        
        // Otherwise show created timestamp
        return {
            timestamp: createdAt,
            label: 'Created',
            icon: '🕒'
        };
    };

    const displayInfo = getDisplayTimestamp();

    const cardBg = useColorModeValue('white', 'rgba(24, 36, 56, 0.94)');
    const cardBorder = useColorModeValue('1.5px solid #e2e8f0', '1px solid rgba(124, 131, 255, 0.34)');
    const cardShadow = useColorModeValue('0 2px 8px rgba(0,0,0,0.08)', '0 14px 32px rgba(2, 6, 23, 0.28)');
    const textColor = useColorModeValue('gray.700', 'gray.50');
    const subTextColor = useColorModeValue('gray.500', '#94a3b8');
    const bodyTextColor = useColorModeValue('gray.600', '#cbd5e1');
    const hoverBg = useColorModeValue('gray.50', 'rgba(30, 44, 68, 0.98)');
    const hoverBorder = useColorModeValue('1.5px solid #cbd5e0', '1px solid rgba(124, 131, 255, 0.72)');
    const hoverShadow = useColorModeValue('0 4px 12px rgba(0,0,0,0.12)', '0 18px 44px rgba(2, 6, 23, 0.48), 0 0 24px rgba(124, 131, 255, 0.12)');
    
    // Badge colors
    const badgeBg = useColorModeValue('green.100', 'rgba(34, 197, 94, 0.15)');
    const badgeColor = useColorModeValue('green.700', 'rgb(34, 197, 94)');
    const badgeBorder = useColorModeValue('none', '1px solid rgba(34, 197, 94, 0.3)');

    return (
        <Box
            bg={cardBg}
            borderRadius="xl"
            boxShadow={cardShadow}
            border={cardBorder}
            style={{backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)'}}
            p={{ base: 4, sm: 4, md: 5 }}
            minW={0}
            w="100%"
            maxW="none"
            minH={{ base: '165px', md: '175px' }}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-start"
            position="relative"
            m={0}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
                bg: hoverBg,
                boxShadow: hoverShadow,
                border: hoverBorder,
                transform: 'translateY(-4px)',
            }}
            cursor="pointer"
            _focusWithin={{
                outline: "3px solid",
                outlineColor: "blue.300",
                outlineOffset: "2px"
            }}
        >
            <HStack w="100%" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <VStack align="flex-start" spacing={1}>
                    <Text 
                        fontSize="xs" 
                        color={subTextColor} 
                        fontWeight="600"
                        textTransform="uppercase"
                        letterSpacing="wide"
                        opacity={0.8}
                    >
                        Note {noteNumber}
                    </Text>
                    {displayInfo.timestamp && (
                        <Text 
                            fontSize="2xs" 
                            color={subTextColor} 
                            opacity={0.7}
                            fontWeight="500"
                        >
                            {displayInfo.icon} {displayInfo.label} {formatTimestamp(displayInfo.timestamp)}
                        </Text>
                    )}
                </VStack>
                <HStack spacing={2}>
                {isPinned && <Badge colorScheme="purple" borderRadius="full">Pinned</Badge>}
                {important && (
                    <Badge 
                        colorScheme="green" 
                        borderRadius="full" 
                        px={3} 
                        py={1} 
                        fontSize="xs"
                        fontWeight="bold"
                        textTransform="uppercase"
                        letterSpacing="wide"
                        bg={badgeBg}
                        color={badgeColor}
                        border={badgeBorder}
                    >
                        Important
                    </Badge>
                )}
                </HStack>
            </HStack>
            <Text 
                fontWeight="bold" 
                fontSize={{ base: 'lg', md: 'xl' }} 
                mb={2} 
                color={textColor}
                lineHeight="1.3"
                letterSpacing="tight"
            >
                {title}
            </Text>
            <Box 
                color={bodyTextColor} 
                fontSize="sm" 
                mb={3} 
                lineHeight="1.5"
                opacity={0.9}
                sx={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                  overflow: 'hidden',
                  'ol, ul': { marginLeft: '1.2em', paddingLeft: '0.5em' },
                  'li': { marginBottom: '0.2em' },
                  'strong': { fontWeight: 'bold' },
                  'em': { fontStyle: 'italic' },
                  'u': { textDecoration: 'underline' },
                }}
                dangerouslySetInnerHTML={{ __html: body }}
            />
            <HStack w="100%" justifyContent="flex-end" alignItems="flex-end" mt="auto">
                <HStack spacing={3}>
                    <IconButton
                        icon={<FaThumbtack />}
                        size="sm"
                        aria-label={`${isPinned ? 'Unpin' : 'Pin'} note: ${title}`}
                        onClick={(event) => {
                            event.stopPropagation();
                            handlePin();
                        }}
                        isLoading={isPinning}
                        color={isPinned ? 'purple.600' : 'gray.400'}
                        bg={isPinned ? 'purple.50' : 'gray.50'}
                        borderRadius="lg"
                    />
                    <IconButton
                        icon={<FaTrashAlt />}
                        size="sm"
                        aria-label={`Delete note: ${title}`}
                        onClick={onDeleteOpen}
                        isLoading={loading}
                        bg={useColorModeValue('red.50', 'rgba(239, 68, 68, 0.1)')}
                        color={useColorModeValue('red.600', 'rgb(248, 113, 113)')}
                        border={useColorModeValue('1px solid #fed7d7', '1px solid rgba(239, 68, 68, 0.2)')}
                        borderRadius="lg"
                        _hover={{
                            bg: useColorModeValue('red.100', 'rgba(239, 68, 68, 0.2)'),
                            color: useColorModeValue('red.700', 'rgb(252, 165, 165)'),
                            transform: 'scale(1.05)',
                        }}
                        transition="all 0.2s"
                    />
                    <IconButton
                        icon={<FaEdit />}
                        size="sm"
                        aria-label={`Edit note: ${title}`}
                        onClick={handleEdit}
                        isLoading={loading}
                        bg={useColorModeValue('blue.50', 'rgba(59, 130, 246, 0.1)')}
                        color={useColorModeValue('blue.600', 'rgb(96, 165, 250)')}
                        border={useColorModeValue('1px solid #bee3f8', '1px solid rgba(59, 130, 246, 0.2)')}
                        borderRadius="lg"
                        _hover={{
                            bg: useColorModeValue('blue.100', 'rgba(59, 130, 246, 0.2)'),
                            color: useColorModeValue('blue.700', 'rgb(147, 197, 253)'),
                            transform: 'scale(1.05)',
                        }}
                        transition="all 0.2s"
                    />
                </HStack>
            </HStack>

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                isOpen={isDeleteOpen}
                leastDestructiveRef={cancelRef}
                onClose={onDeleteClose}
                isCentered
            >
                    <AlertDialogOverlay
                        bg="rgba(30, 41, 59, 0.55)"
                        backdropFilter="blur(6px)"
                    />
                    <AlertDialogContent
                        borderRadius="2xl"
                        bg={useColorModeValue('rgba(255,255,255,0.98)', 'rgba(30, 41, 59, 0.98)')}
                        boxShadow={useColorModeValue('0 8px 32px 0 rgba(31, 38, 135, 0.18)', '0 20px 60px 0 rgba(0, 0, 0, 0.5), 0 8px 25px 0 rgba(99, 179, 237, 0.15)')}
                        style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
                        border={useColorModeValue('none', '1px solid rgba(99, 179, 237, 0.2)')}
                        px={{ base: 2, md: 6 }}
                        py={2}
                    >
                        <AlertDialogHeader fontWeight="bold" fontSize="2xl" letterSpacing="tight" textAlign="left">
                            Delete Note
                        </AlertDialogHeader>
                        <AlertDialogBody fontSize="lg" color={useColorModeValue('gray.700', 'rgba(209, 213, 219, 0.9)')}>
                            Are you sure you want to delete this note? This action cannot be undone.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                onClick={onDeleteClose}
                                bg={useColorModeValue('#e0e7ff', 'rgba(55, 65, 81, 0.8)')}
                                color={useColorModeValue('#232b45', 'rgba(229, 231, 235, 0.9)')}
                                borderRadius="lg"
                                px={8}
                                py={2}
                                fontWeight="bold"
                                fontSize="lg"
                                border={useColorModeValue('none', '1px solid rgba(75, 85, 99, 0.5)')}
                                _hover={{ 
                                    bg: useColorModeValue('#c3dafe', 'rgba(55, 65, 81, 0.9)'),
                                    transform: 'translateY(-1px)'
                                }}
                                transition="all 0.2s"
                            >
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={handleDelete}
                                ml={3}
                                borderRadius="lg"
                                px={8}
                                py={2}
                                fontWeight="bold"
                                fontSize="lg"
                                bg="red.500"
                                _hover={{ 
                                    bg: 'red.400',
                                    transform: 'translateY(-1px)'
                                }}
                                transition="all 0.2s"
                                isLoading={loading}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
        </Box>
    );
}