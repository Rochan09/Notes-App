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
    VStack,
    useColorModeValue
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
    FaBold,
    FaCode,
    FaHighlighter,
    FaItalic,
    FaLink,
    FaListOl,
    FaListUl,
    FaQuoteLeft,
    FaRedo,
    FaSave,
    FaStrikethrough,
    FaTasks,
    FaUndo,
    FaUnderline
} from 'react-icons/fa';

function ToolbarButton({ label, icon, className, value, onClick }) {
    return (
        <Tooltip label={label} hasArrow placement="top">
            <Button
                aria-label={label}
                className={className}
                value={value}
                onClick={onClick}
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

function NoteToolbar({ toolbarColor, borderColor, onStyleChange, onUndo, onRedo }) {
    const [isStyleMenuOpen, setIsStyleMenuOpen] = React.useState(false);
    const [selectedStyle, setSelectedStyle] = React.useState('');
    const styleOptions = [
        { value: '', label: 'Normal' },
        { value: '1', label: 'Heading 1' },
        { value: '2', label: 'Heading 2' },
        { value: '3', label: 'Heading 3' }
    ];

    const applyStyle = (value) => {
        setSelectedStyle(value);
        setIsStyleMenuOpen(false);
    };

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
            <Box className="toolbar-group toolbar-style">
                <Box className="toolbar-select-wrap">
                    <Button
                        className="ql-header-action"
                        aria-label="Text style"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsStyleMenuOpen((open) => !open)}
                        color={toolbarColor}
                        fontWeight="600"
                        minW="76px"
                        justifyContent="flex-start"
                        _hover={{ bg: 'blackAlpha.100', color: '#3182ce' }}
                    >
                        {styleOptions.find((option) => option.value === selectedStyle).label}
                    </Button>
                    {isStyleMenuOpen && (
                        <VStack
                            className="toolbar-style-menu"
                            align="stretch"
                            spacing={1}
                            position="absolute"
                            top="calc(100% + 6px)"
                            left={0}
                            zIndex={10}
                            minW="140px"
                            p={1}
                            bg="white"
                            border="1px solid"
                            borderColor={borderColor}
                            borderRadius="md"
                            boxShadow="0 6px 18px rgba(60, 64, 67, 0.2)"
                        >
                            {styleOptions.map((option) => (
                                <Button
                                    key={option.value || 'normal'}
                                    variant="ghost"
                                    size="sm"
                                    justifyContent="flex-start"
                                    onClick={() => {
                                        applyStyle(option.value);
                                        onStyleChange(option.value);
                                    }}
                                >
                                    {option.label}
                                </Button>
                            ))}
                        </VStack>
                    )}
                </Box>
            </Box>
            <Box className="toolbar-group">
                <ToolbarButton label="Undo" icon={<FaUndo />} onClick={onUndo} />
                <ToolbarButton label="Redo" icon={<FaRedo />} onClick={onRedo} />
            </Box>
            <Box className="toolbar-group">
                <ToolbarButton label="Bold" icon={<FaBold />} className="ql-bold" />
                <ToolbarButton label="Italic" icon={<FaItalic />} className="ql-italic" />
                <ToolbarButton label="Underline" icon={<FaUnderline />} className="ql-underline" />
                <ToolbarButton label="Strikethrough" icon={<FaStrikethrough />} className="ql-strike" />
            </Box>
            <Box className="toolbar-group">
                <ToolbarButton label="Numbered list" icon={<FaListOl />} className="ql-list" value="ordered" />
                <ToolbarButton label="Bulleted list" icon={<FaListUl />} className="ql-list" value="bullet" />
                <ToolbarButton label="Checklist" icon={<FaTasks />} className="ql-list" value="unchecked" />
            </Box>
            <Box className="toolbar-group">
                <ToolbarButton label="Block quote" icon={<FaQuoteLeft />} className="ql-blockquote" />
                <ToolbarButton label="Code block" icon={<FaCode />} className="ql-code-block" />
                <ToolbarButton label="Add link" icon={<FaLink />} className="ql-link" />
            </Box>
            <Box className="toolbar-group toolbar-highlights">
                <ToolbarButton
                    label="Yellow highlight"
                    icon={<FaHighlighter color="#d69e2e" />}
                    className="ql-background"
                    value="#fff3a3"
                />
                <ToolbarButton
                    label="Green highlight"
                    icon={<FaHighlighter color="#38a169" />}
                    className="ql-background"
                    value="#c6f6d5"
                />
                <ToolbarButton
                    label="Blue highlight"
                    icon={<FaHighlighter color="#3182ce" />}
                    className="ql-background"
                    value="#bee3f8"
                />
                <ToolbarButton
                    label="Remove highlight"
                    icon={<FaHighlighter color="#718096" />}
                    className="ql-background"
                    value="white"
                />
            </Box>
            <Box className="toolbar-group toolbar-last">
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
            </Box>
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
    const pageBackground = useColorModeValue('#f1f3f4', '#0f172a');
    const canvasBackground = useColorModeValue('#ffffff', '#151e31');
    const titleColor = useColorModeValue('#1f2937', '#f7fafc');
    const mutedColor = useColorModeValue('#718096', '#a0aec0');
    const editorBackground = useColorModeValue('#ffffff', '#172238');
    const toolbarBackground = useColorModeValue('#f8f9fa', '#1d2a40');
    const borderColor = useColorModeValue('#e8edf3', '#344765');
    const toolbarColor = useColorModeValue('#596579', '#d5def0');
    const [newTag, setNewTag] = React.useState('');
    const quillRef = React.useRef(null);
    const historyRef = React.useRef(null);
    const saveStatusColor = saveStatus === 'saved'
        ? '#16a34a'
        : saveStatus === 'saving'
            ? '#2563eb'
            : saveStatus === 'error'
                ? '#dc2626'
                : mutedColor;

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
                    minH={{ base: '44px', md: '48px' }}
                    mb={{ base: 1, md: 2 }}
                    px={{ base: 1, md: 2 }}
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
                            <Box display={{ base: 'none', sm: 'block' }}>Notes</Box>
                            <Box display={{ base: 'block', sm: 'none' }}>Back</Box>
                        </Button>
                        <Heading size="sm" color={titleColor} fontWeight="600" noOfLines={1}>
                            {isEdit ? 'Edit note' : 'New document'}
                        </Heading>
                    </HStack>
                    <HStack spacing={{ base: 2, md: 3 }} flexShrink={0}>
                        <HStack spacing={1} color={mutedColor} fontSize="xs" display={{ base: 'none', sm: 'flex' }}>
                            <Box w="6px" h="6px" borderRadius="full" bg={saveStatusColor} />
                            <Text>
                                {isEdit && saveStatus !== 'idle'
                                    ? saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Save failed'
                                    : 'Ready'}
                            </Text>
                        </HStack>
                        <Button
                            leftIcon={<FaSave />}
                            colorScheme="blue"
                            onClick={onSubmit}
                            isLoading={isLoading}
                            loadingText={isEdit ? 'Saving...' : 'Creating...'}
                            size="sm"
                            borderRadius="md"
                            px={{ base: 3, md: 4 }}
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
                    position="relative"
                >
                    <Box
                        className="document-accent-bar"
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        h="2px"
                        bgGradient="linear(to-r, #4285f4, #7c4dff, #34a853)"
                    />
                    <Box px={{ base: 5, md: 16 }} pt={{ base: 4, md: 6 }}>
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
                                background: toolbarBackground,
                                minHeight: '52px',
                                boxShadow: '0 2px 7px rgba(60, 64, 67, 0.08)'
                            },
                            '#note-editor-toolbar .toolbar-group': {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px',
                                background: useColorModeValue('#ffffff', '#3c4043'),
                                border: '1px solid',
                                borderColor,
                                borderRadius: '10px',
                                padding: '2px',
                                boxShadow: '0 1px 2px rgba(60, 64, 67, 0.08)'
                            },
                            '#note-editor-toolbar .toolbar-group.toolbar-style': {
                                marginRight: { base: '2px', md: '6px' }
                            },
                            '#note-editor-toolbar .toolbar-group.toolbar-last': {
                                marginLeft: 'auto'
                            },
                            '#note-editor-toolbar .toolbar-select-wrap': {
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center'
                            },
                            '#note-editor-toolbar .toolbar-group button': {
                                borderRadius: '7px'
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
                        <NoteToolbar
                            toolbarColor={toolbarColor}
                            borderColor={borderColor}
                            onStyleChange={(value) => {
                                const editor = quillRef.current?.getEditor();
                                if (editor) {
                                    editor.format('header', value || false);
                                }
                            }}
                            onUndo={() => historyRef.current?.undo()}
                            onRedo={() => historyRef.current?.redo()}
                        />
                        <ReactQuill
                            ref={quillRef}
                            value={safeBody}
                            onChange={onBodyChange}
                            modules={{
                                toolbar: '#note-editor-toolbar',
                                history: { delay: 1000, maxStack: 100, userOnly: true }
                            }}
                            onChangeSelection={() => {
                                historyRef.current = quillRef.current?.getEditor().history;
                            }}
                            onFocus={() => {
                                historyRef.current = quillRef.current?.getEditor().history;
                            }}
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
                        <HStack display={{ base: 'none', sm: 'flex' }} spacing={1}>
                            <Box w="7px" h="7px" borderRadius="full" bg={saveStatusColor} />
                            <Text>
                                {isEdit && saveStatus !== 'idle'
                                    ? saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Save failed'
                                    : 'Ready to write'}
                            </Text>
                        </HStack>
                    </Flex>
                </Box>
            </Container>
        </Box>
    );
}
