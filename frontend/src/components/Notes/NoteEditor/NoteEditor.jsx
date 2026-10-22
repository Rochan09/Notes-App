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
    const pageBackground = useColorModeValue('#f1f3f4', '#202124');
    const canvasBackground = useColorModeValue('#ffffff', '#292a2d');
    const titleColor = useColorModeValue('#1f2937', '#f7fafc');
    const mutedColor = useColorModeValue('#718096', '#a0aec0');
    const editorBackground = useColorModeValue('#ffffff', '#292a2d');
    const toolbarBackground = useColorModeValue('#f8f9fa', '#303134');
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
        <Box bg={pageBackground} minH="calc(100vh - 64px)" py={{ base: 2, md: 4 }}>
            <Container maxW="6xl">
                <Flex
                    align="center"
                    justify="space-between"
                    gap={3}
                    mb={{ base: 2, md: 3 }}
                >
                    <HStack spacing={3} minW={0}>
                        <Button
                            leftIcon={<ArrowBackIcon />}
                            variant="ghost"
                            onClick={onCancel}
                            size="sm"
                            color={mutedColor}
                            flexShrink={0}
                        >
                            <Box display={{ base: 'none', sm: 'block' }}>Back to Notes</Box>
                            <Box display={{ base: 'block', sm: 'none' }}>Back</Box>
                        </Button>
                        <Heading size={{ base: 'sm', md: 'md' }} color={titleColor} fontWeight="600" noOfLines={1}>
                            {isEdit ? 'Edit note' : 'New document'}
                        </Heading>
                    </HStack>
                    <HStack spacing={{ base: 2, md: 3 }} flexShrink={0}>
                        {isEdit && saveStatus !== 'idle' && (
                            <Text color={mutedColor} fontSize="sm" display={{ base: 'none', sm: 'block' }}>
                                {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Save failed'}
                            </Text>
                        )}
                        <Button
                            leftIcon={<FaSave />}
                            colorScheme="blue"
                            onClick={onSubmit}
                            isLoading={isLoading}
                            loadingText={isEdit ? 'Saving...' : 'Creating...'}
                            size="sm"
                        >
                            {isEdit ? 'Save changes' : 'Save note'}
                        </Button>
                    </HStack>
                </Flex>

                <Box
                    bg={canvasBackground}
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius="sm"
                    boxShadow="0 1px 3px rgba(60, 64, 67, 0.25)"
                    overflow="hidden"
                >
                    <Box px={{ base: 5, md: 16 }} pt={{ base: 5, md: 8 }}>
                        <Input
                            aria-label="Note title"
                            value={title}
                            onChange={(event) => onTitleChange(event.target.value)}
                            placeholder="Untitled document"
                            variant="unstyled"
                            color={titleColor}
                            fontSize={{ base: '2xl', md: '3xl' }}
                            fontWeight="700"
                            lineHeight="1.2"
                            _placeholder={{ color: mutedColor }}
                        />
                    </Box>

                    <Box
                        mx={{ base: 0, md: 8 }}
                        mt={3}
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
                                height: isEdit
                                    ? { base: 'calc(100vh - 355px)', md: 'calc(100vh - 310px)' }
                                    : { base: '260px', md: '320px' },
                                minHeight: isEdit ? '240px' : '220px',
                                maxHeight: isEdit ? '520px' : '360px',
                                fontSize: { base: '1rem', md: '1.08rem' }
                            },
                            '.ql-editor': {
                                height: isEdit
                                    ? { base: 'calc(100vh - 355px)', md: 'calc(100vh - 310px)' }
                                    : { base: '260px', md: '320px' },
                                minHeight: isEdit ? '240px' : '220px',
                                maxHeight: isEdit ? '520px' : '360px',
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
                        gap={{ base: 3, md: 6 }}
                        px={{ base: 5, md: 16 }}
                        py={3}
                    >
                        <Box>
                            <HStack wrap="wrap" spacing={2}>
                                <Text color={mutedColor} fontSize="xs" fontWeight="700" textTransform="uppercase">
                                    Tags
                                </Text>
                                {safeTags.map((tag) => (
                                    <Tag key={tag} size="sm" borderRadius="full" colorScheme="blue">
                                        <TagLabel>{tag}</TagLabel>
                                        <TagCloseButton onClick={() => onTagsChange(safeTags.filter((item) => item !== tag))} />
                                    </Tag>
                                ))}
                                {!safeTags.length && (
                                    <Text color={mutedColor} fontSize="sm">None</Text>
                                )}
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
                                    maxW="150px"
                                />
                                <Button size="sm" variant="outline" onClick={addTag} isDisabled={!newTag.trim()}>
                                    + Add
                                </Button>
                            </HStack>
                        </Box>
                        {isEdit && <Box color={mutedColor} fontSize="sm" textAlign={{ base: 'left', md: 'right' }}>
                            <Text color={titleColor} fontWeight="600" mb={1}>Details</Text>
                            <Text>Created {formatDate(createdAt)} · Updated {formatDate(updatedAt)}</Text>
                        </Box>}
                    </SimpleGrid>

                    <Flex
                        align="center"
                        justify="space-between"
                        px={{ base: 5, md: 16 }}
                        py={2}
                        color={mutedColor}
                        fontSize="sm"
                    >
                        <Text>{safeBody.length} characters · {wordCount} words</Text>
                        <Text display={{ base: 'none', sm: 'block' }}>
                            {isEdit && saveStatus !== 'idle'
                                ? saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Save failed'
                                : 'Ready to write'}
                        </Text>
                    </Flex>
                </Box>
            </Container>
        </Box>
    );
}
