import React, { useState, useCallback } from 'react';
import {
  Box,
  VStack,
  HStack,
  Button,
  Input,
  Flex,
  IconButton,
  useColorModeValue,
  Tooltip,
  Select,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
  Badge
} from '@chakra-ui/react';
import {
  AddIcon,
  AttachmentIcon,
  DownloadIcon,
  CopyIcon,
  ViewIcon
} from '@chakra-ui/icons';
import MDEditor from '@uiw/react-md-editor';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

const RichTextEditor = ({ 
  onSave, 
  initialTitle = '', 
  initialContent = '', 
  initialTags = [],
  templates = []
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState(initialTags);
  const [newTag, setNewTag] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  
  const { isOpen: isTemplateOpen, onOpen: onTemplateOpen, onClose: onTemplateClose } = useDisclosure();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // File drop zone configuration
  const onDrop = useCallback((acceptedFiles) => {
    const newAttachments = acceptedFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    
    setAttachments(prev => [...prev, ...newAttachments]);
    toast.success(`${acceptedFiles.length} file(s) attached!`);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf'],
      'text/*': ['.txt', '.md'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  // Note templates
  const noteTemplates = [
    {
      id: 'meeting',
      name: 'Meeting Notes',
      content: `# Meeting Notes - ${new Date().toLocaleDateString()}

## Attendees
- 

## Agenda
1. 
2. 
3. 

## Discussion Points
### Topic 1


### Topic 2


## Action Items
- [ ] 
- [ ] 
- [ ] 

## Next Meeting
Date: 
Time: 
Location: `
    },
    {
      id: 'todo',
      name: 'To-Do List',
      content: `# To-Do List - ${new Date().toLocaleDateString()}

## High Priority
- [ ] 
- [ ] 

## Medium Priority
- [ ] 
- [ ] 

## Low Priority
- [ ] 
- [ ] 

## Completed ✅
- [x] 

## Notes
`
    },
    {
      id: 'project',
      name: 'Project Planning',
      content: `# Project: [Project Name]

## Overview
Brief description of the project...

## Objectives
- 
- 
- 

## Timeline
| Phase | Start Date | End Date | Status |
|-------|------------|----------|--------|
| Planning | | | 🔄 |
| Development | | | ⏳ |
| Testing | | | ⏳ |
| Deployment | | | ⏳ |

## Resources Needed
- 
- 
- 

## Risks & Mitigation
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| | | | |

## Notes
`
    },
    {
      id: 'research',
      name: 'Research Notes',
      content: `# Research: [Topic]

## Research Question
What are we trying to find out?

## Sources
1. **[Source Title]** - [URL/Reference]
   - Key findings: 
   - Relevance: 

2. **[Source Title]** - [URL/Reference]
   - Key findings: 
   - Relevance: 

## Key Insights
- 
- 
- 

## Conclusions
Based on the research...

## Next Steps
- [ ] 
- [ ] 

## References
`
    }
  ];

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleRemoveAttachment = (attachmentId) => {
    setAttachments(attachments.filter(att => att.id !== attachmentId));
  };

  const handleTemplateSelect = (templateId) => {
    const template = noteTemplates.find(t => t.id === templateId);
    if (template) {
      setContent(template.content);
      setTitle(template.name);
      onTemplateClose();
      toast.success(`${template.name} template applied!`);
    }
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please provide both title and content');
      return;
    }

    const noteData = {
      title: title.trim(),
      body: content,
      tags,
      attachments: attachments.map(att => ({
        name: att.name,
        size: att.size,
        type: att.type
      }))
    };

    onSave(noteData);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content).then(() => {
      toast.success('Content copied to clipboard!');
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <VStack spacing={4} align="stretch" p={4}>
      {/* Header with actions */}
      <Flex justify="space-between" align="center">
        <HStack spacing={2}>
          <Button
            leftIcon={<AddIcon />}
            size="sm"
            variant="outline"
            onClick={onTemplateOpen}
          >
            Templates
          </Button>
          
          <Tooltip label="Copy content">
            <IconButton
              icon={<CopyIcon />}
              size="sm"
              variant="ghost"
              onClick={copyToClipboard}
            />
          </Tooltip>
          
          <Tooltip label={isPreview ? "Edit mode" : "Preview mode"}>
            <IconButton
              icon={<ViewIcon />}
              size="sm"
              variant="ghost"
              onClick={() => setIsPreview(!isPreview)}
              colorScheme={isPreview ? "blue" : "gray"}
            />
          </Tooltip>
        </HStack>

        <Button colorScheme="blue" onClick={handleSave}>
          Save Note
        </Button>
      </Flex>

      {/* Title Input */}
      <Input
        placeholder="Enter note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fontSize="lg"
        fontWeight="semibold"
        bg={bgColor}
        borderColor={borderColor}
      />

      {/* Tags Input */}
      <HStack>
        <Input
          placeholder="Add tags..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
          size="sm"
          flex={1}
        />
        <Button size="sm" onClick={handleAddTag}>
          Add Tag
        </Button>
      </HStack>

      {/* Tags Display */}
      {tags.length > 0 && (
        <Flex wrap="wrap" gap={2}>
          {tags.map((tag, index) => (
            <Badge
              key={index}
              colorScheme="blue"
              variant="solid"
              cursor="pointer"
              onClick={() => handleRemoveTag(tag)}
              _hover={{ bg: 'red.500' }}
            >
              {tag} ×
            </Badge>
          ))}
        </Flex>
      )}

      {/* Rich Text Editor */}
      <Box>
        <MDEditor
          value={content}
          onChange={setContent}
          preview={isPreview ? 'preview' : 'edit'}
          hideToolbar={isPreview}
          visibleDragBar={false}
          textareaProps={{
            placeholder: 'Start writing your note... You can use Markdown formatting!',
            style: {
              fontSize: 14,
              lineHeight: 1.6,
              fontFamily: 'inherit'
            }
          }}
          height={400}
        />
      </Box>

      {/* File Drop Zone */}
      <Box
        {...getRootProps()}
        p={4}
        border="2px dashed"
        borderColor={isDragActive ? "blue.400" : borderColor}
        borderRadius="md"
        bg={isDragActive ? "blue.50" : bgColor}
        cursor="pointer"
        transition="all 0.2s"
        _hover={{ borderColor: "blue.400", bg: "blue.50" }}
      >
        <input {...getInputProps()} />
        <VStack spacing={2}>
          <AttachmentIcon color="gray.400" />
          <Text fontSize="sm" color="gray.600" textAlign="center">
            {isDragActive
              ? "Drop files here..."
              : "Drag & drop files here, or click to select files"}
          </Text>
          <Text fontSize="xs" color="gray.500">
            Supports: Images, PDFs, Text files, Word docs (Max 10MB each)
          </Text>
        </VStack>
      </Box>

      {/* Attachments Display */}
      {attachments.length > 0 && (
        <VStack align="stretch" spacing={2}>
          <Text fontSize="sm" fontWeight="semibold">
            Attachments ({attachments.length})
          </Text>
          {attachments.map((attachment) => (
            <Flex
              key={attachment.id}
              justify="space-between"
              align="center"
              p={2}
              bg={bgColor}
              borderRadius="md"
              border="1px solid"
              borderColor={borderColor}
            >
              <HStack>
                <AttachmentIcon />
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" fontWeight="medium">
                    {attachment.name}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {formatFileSize(attachment.size)}
                  </Text>
                </VStack>
              </HStack>
              <Button
                size="xs"
                variant="ghost"
                colorScheme="red"
                onClick={() => handleRemoveAttachment(attachment.id)}
              >
                Remove
              </Button>
            </Flex>
          ))}
        </VStack>
      )}

      {/* Template Selection Modal */}
      <Modal isOpen={isTemplateOpen} onClose={onTemplateClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose a Template</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              {noteTemplates.map((template) => (
                <Box
                  key={template.id}
                  p={4}
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="md"
                  cursor="pointer"
                  w="100%"
                  _hover={{ bg: "gray.50", borderColor: "blue.400" }}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <Text fontWeight="semibold" mb={2}>
                    {template.name}
                  </Text>
                  <Text fontSize="sm" color="gray.600" noOfLines={3}>
                    {template.content.substring(0, 150)}...
                  </Text>
                </Box>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onTemplateClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default RichTextEditor;
