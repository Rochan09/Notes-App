import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    Input,
    SimpleGrid,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    Tooltip,
    useColorModeValue
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
    FaBold,
    FaCode,
    FaItalic,
    FaLink,
    FaListOl,
    FaListUl,
    FaQuoteLeft,
    FaSave,
    FaStrikethrough,
    FaUnderline
} from 'react-icons/fa';

function ToolbarButton({ label, icon, className, value }) {
    return (
        <Tooltip label={label} hasArrow placement="top">
            <Button
                aria-label={label}
                className={className}
                value={value}
                variant="ghost"
                size="sm"
                minW="32px"
                h="32px"
                px={2}
                color="inherit"
                _hover={{ bg: 'blackAlpha.100', color: '#3182ce' }}
            >
                {icon}
            </Button>
        </Tooltip>
    );
}

function NoteToolbar({ toolbarColor, borderColor }) {
    return (
        <Flex
            id="note-editor-toolbar"
            align="center"
            wrap="wrap"
            gap={1}
            px={{ base: 2, md: 3 }}
            py={2}
            color={toolbarColor}
            borderBottom="1px solid"
            borderColor={borderColor}
        >
            <select className="ql-header" aria-label="Text style" defaultValue="">
                <option value="">Normal</option>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
            </select>
            <Box className="toolbar-divider" />
            <ToolbarButton label="Bold" icon={<FaBold />} className="ql-bold" />
            <ToolbarButton label="Italic" icon={<FaItalic />} className="ql-italic" />
            <ToolbarButton label="Underline" icon={<FaUnderline />} className="ql-underline" />
            <ToolbarButton label="Strikethrough" icon={<FaStrikethrough />} className="ql-strike" />
            <Box className="toolbar-divider" />
            <ToolbarButton label="Numbered list" icon={<FaListOl />} className="ql-list" value="ordered" />
            <ToolbarButton label="Bulleted list" icon={<FaListUl />} className="ql-list" value="bullet" />
            <Box className="toolbar-divider" />
            <ToolbarButton label="Block quote" icon={<FaQuoteLeft />} className="ql-blockquote" />
            <ToolbarButton label="Code block" icon={<FaCode />} className="ql-code-block" />
            <ToolbarButton label="Add link" icon={<FaLink />} className="ql-link" />
            <Box className="toolbar-divider" />
            <Tooltip label="Clear formatting" hasArrow placement="top">
                <Button
                    aria-label="Clear formatting"
                    className="ql-clean"
                    variant="ghost"
                    size="sm"
                    minW="32px"
                    h="32px"
                    px={2}
                    color="inherit"
                    _hover={{ bg: 'blackAlpha.100', color: '#3182ce' }}
                >
                    Tx
                </Button>
            </Tooltip>
        </Flex>
    );
}

export default function NoteEditor({
    title,
    body,
    onTitleChange,
    onBodyChange,
    onSubmit,
    onCancel,
    isLoading,
    saveStatus = 'idle',
    tags = [],
    onTagsChange,
    createdAt,
    updatedAt,
    mode = 'create'
}) {
    const isEdit = mode === 'edit';
    const safeBody = typeof body === 'string' ? body : '';
    const safeTags = Array.isArray(tags) ? tags : [];
    const pageBackground = useColorModeValue('#f7f9fc', '#171d2a');
    const canvasBackground = useColorModeValue('#ffffff', '#202938');
    const titleColor = useColorModeValue('#1f2937', '#f7fafc');
    const mutedColor = useColorModeValue('#718096', '#a0aec0');
    const editorBackground = useColorModeValue('#fffdf8', '#252f3f');
    const toolbarBackground = useColorModeValue('#faf8f2', '#2d3748');
    const borderColor = useColorModeValue('#e8edf3', '#3d4a5f');
    const toolbarColor = useColorModeValue('#596579', '#cbd5e0');
    const [newTag, setNewTag] = React.useState('');

    const wordCount = safeBody
        .replace(/<[^>]*>/g, ' ')
        .split(/\s+/)
        .filter(Boolean).length;

    const addTag = () => {
        const trimmedTag = newTag.trim();
        if (trimmedTag && !safeTags.includes(trimmedTag)) {
            onTagsChange([...safeTags, trimmedTag]);
            setNewTag('');
        }
    };

    const formatDate = (date) => date
        ? new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
        : 'Not saved yet';

    return (
        <Box bg={pageBackground} minH="100vh" py={{ base: 4, md: 8 }}>
            <Container maxW="5xl">
                <Flex
                    align={{ base: 'flex-start', md: 'center' }}
                    direction={{ base: 'column', md: 'row' }}
                    justify="space-between"
                    gap={4}
                    mb={5}
                >
                    <Heading size="lg" color={titleColor} fontWeight="700">
                        {isEdit ? 'Edit note' : 'New note'}
                    </Heading>
                </Flex>

                <Box
                    bg={canvasBackground}
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius={{ base: 'lg', md: 'xl' }}
                    boxShadow="0 8px 30px rgba(31, 41, 55, 0.07)"
                    overflow="hidden"
                >
                    <Box px={{ base: 5, md: 10 }} pt={{ base: 7, md: 10 }}>
                        <Input
                            aria-label="Note title"
                            value={title}
                            onChange={(event) => onTitleChange(event.target.value)}
                            placeholder="Untitled note"
                            variant="unstyled"
                            color={titleColor}
                            fontSize={{ base: '2xl', md: '3xl' }}
                            fontWeight="700"
                            lineHeight="1.2"
                            _placeholder={{ color: mutedColor }}
                        />
                    </Box>

                    <Box
                        mx={{ base: 5, md: 10 }}
                        mt={5}
                        mb={0}
                        bg={editorBackground}
                        border="1px solid"
                        borderColor={borderColor}
                        borderRadius="lg"
                        overflow="hidden"
                        sx={{
                            '#note-editor-toolbar': {
                                background: toolbarBackground
                            },
                            '#note-editor-toolbar .ql-header': {
                                border: 'none',
                                background: 'transparent',
                                color: toolbarColor,
                                fontSize: '0.875rem',
                                padding: '6px 22px 6px 6px',
                                cursor: 'pointer'
                            },
                            '#note-editor-toolbar .toolbar-divider': {
                                width: '1px',
                                height: '22px',
                                background: borderColor,
                                mx: { base: '2px', md: '5px' }
                            },
                            '.ql-container': {
                                border: 'none',
                                background: editorBackground,
                                minHeight: { base: '300px', md: '400px' },
                                fontSize: { base: '1rem', md: '1.08rem' }
                            },
                            '.ql-editor': {
                                minHeight: { base: '300px', md: '400px' },
                                padding: { base: '22px 18px', md: '28px 24px' },
                                color: titleColor
                            },
                            '.ql-editor.ql-blank::before': {
                                color: mutedColor,
                                fontStyle: 'normal',
                                left: { base: '18px', md: '24px' }
                            }
                        }}
                    >
                        <NoteToolbar toolbarColor={toolbarColor} borderColor={borderColor} />
                        <ReactQuill
                            value={safeBody}
                            onChange={onBodyChange}
                            modules={{ toolbar: '#note-editor-toolbar' }}
                            theme="snow"
                            placeholder="Start writing..."
                        />
                    </Box>

                    <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        gap={4}
                        px={{ base: 5, md: 10 }}
                        py={5}
                    >
                        <Box>
                            <Text color={mutedColor} fontSize="xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" mb={2}>
                                Tags
                            </Text>
                            <HStack wrap="wrap" spacing={2} mb={2}>
                                {safeTags.map((tag) => (
                                    <Tag key={tag} size="sm" borderRadius="full" colorScheme="blue">
                                        <TagLabel>{tag}</TagLabel>
                                        <TagCloseButton onClick={() => onTagsChange(safeTags.filter((item) => item !== tag))} />
                                    </Tag>
                                ))}
                                {!safeTags.length && (
                                    <Text color={mutedColor} fontSize="sm">No tags yet</Text>
                                )}
                            </HStack>
                            <HStack>
                                <Input
                                    aria-label="New tag"
                                    value={newTag}
                                    onChange={(event) => setNewTag(event.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            addTag();
                                        }
                                    }}
                                    placeholder="Add a tag"
                                    size="sm"
                                    maxW="220px"
                                />
                                <Button size="sm" variant="outline" onClick={addTag} isDisabled={!newTag.trim()}>
                                    Add
                                </Button>
                            </HStack>
                        </Box>
                        <Box color={mutedColor} fontSize="sm" textAlign={{ base: 'left', md: 'right' }}>
                            <Text color={titleColor} fontWeight="600" mb={1}>Note details</Text>
                            <Text>Created {formatDate(createdAt)}</Text>
                            <Text>Updated {formatDate(updatedAt)}</Text>
                        </Box>
                    </SimpleGrid>

                    <Flex
                        align="center"
                        justify="space-between"
                        px={{ base: 5, md: 10 }}
                        py={4}
                        color={mutedColor}
                        fontSize="sm"
                    >
                        <Text>{isEdit ? 'Edit freely. Your changes are ready to save.' : 'Capture your thoughts in one place.'}</Text>
                        <Text>{safeBody.length} characters · {wordCount} words</Text>
                    </Flex>

                    <Flex
                        position="sticky"
                        bottom={0}
                        zIndex={1}
                        align={{ base: 'stretch', md: 'center' }}
                        justify="space-between"
                        direction={{ base: 'column-reverse', md: 'row' }}
                        gap={3}
                        px={{ base: 5, md: 10 }}
                        py={4}
                        bg={canvasBackground}
                        borderTop="1px solid"
                        borderColor={borderColor}
                        boxShadow="0 -8px 20px rgba(31, 41, 55, 0.05)"
                    >
                        <HStack spacing={3} color={mutedColor} fontSize="sm">
                            {isEdit && saveStatus !== 'idle' && (
                                <Text>
                                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Save failed'}
                                </Text>
                            )}
                        </HStack>
                        <HStack spacing={3} justify={{ base: 'stretch', md: 'flex-end' }}>
                            <Button
                                leftIcon={<ArrowBackIcon />}
                                variant="ghost"
                                onClick={onCancel}
                                size="md"
                                color={mutedColor}
                            >
                                Back to Notes
                            </Button>
                            <Button
                                leftIcon={<FaSave />}
                                colorScheme="blue"
                                onClick={onSubmit}
                                isLoading={isLoading}
                                loadingText={isEdit ? 'Saving...' : 'Creating...'}
                                size="md"
                            >
                                {isEdit ? 'Save changes' : 'Save note'}
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Container>
        </Box>
    );
}
