import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Heading,
  Text,
  CardHeader,
  CardFooter,
  HStack,
  VStack,
  Spinner,
  Badge,
  Flex,

  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  Tag,
  TagLabel,
  TagCloseButton,
  Box
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  DownloadIcon,
  ExternalLinkIcon,
  AttachmentIcon,
  TimeIcon,
  StarIcon,
  TagIcon
} from "@chakra-ui/icons";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotes, updateNotes } from "../../../redux/notes/note_actions";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "./notestyle.css";

const EnhancedNoteCard = ({ 
  title, 
  body, 
  user, 
  _id, 
  tags = [], 
  attachments = [],
  createdAt,
  updatedAt,
  searchTerm = "",
  matches = [],
  searchScore,
  onTagUpdate,
  isStarred = false
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.noteReducer);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  
  const [tempTitle, setTitle] = useState(title);
  const [tempBody, setBody] = useState(body);
  const [tempTags, setTempTags] = useState(tags);
  const [newTag, setNewTag] = useState("");
  const [starred, setStarred] = useState(isStarred);

  // Color mode values
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const highlightBg = useColorModeValue("yellow.100", "yellow.800");

  // Extract search terms for highlighting
  const searchWords = searchTerm ? searchTerm.split(/\s+/).filter(word => word.length > 0) : [];

  const updateNote = () => {
    if (!tempTitle.trim() || !tempBody.trim()) {
      toast.error("Please fill in both title and body fields");
      return;
    }
    
    const updatedNote = {
      title: tempTitle,
      body: tempBody,
      tags: tempTags,
      isStarred: starred
    };
    
    dispatch(updateNotes(_id, updatedNote));
    if (onTagUpdate) onTagUpdate(tempTags);
    onClose();
  };

  const handleModalClose = () => {
    setTitle(title);
    setBody(body);
    setTempTags(tags);
    setNewTag("");
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNotes(_id));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tempTags.includes(newTag.trim())) {
      setTempTags([...tempTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTempTags(tempTags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  const exportToPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    
    // Title
    pdf.setFontSize(18);
    pdf.setFont(undefined, 'bold');
    const titleLines = pdf.splitTextToSize(title, maxWidth);
    pdf.text(titleLines, margin, 30);
    
    // Tags
    if (tags.length > 0) {
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      pdf.text(`Tags: ${tags.join(', ')}`, margin, 50);
    }
    
    // Body
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'normal');
    const bodyLines = pdf.splitTextToSize(body, maxWidth);
    pdf.text(bodyLines, margin, tags.length > 0 ? 70 : 50);
    
    // Footer
    pdf.setFontSize(8);
    pdf.text(`Created: ${new Date(createdAt).toLocaleDateString()}`, margin, pdf.internal.pageSize.getHeight() - 20);
    
    pdf.save(`${title.replace(/[^\w\s]/gi, '')}.pdf`);
    toast.success("Note exported to PDF!");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const getSearchRelevanceColor = () => {
    if (!searchScore) return "gray";
    if (searchScore < 0.3) return "green";
    if (searchScore < 0.6) return "yellow";
    return "red";
  };

  return (
    <>
      <Card
        bg={cardBg}
        borderColor={borderColor}
        borderWidth="1px"
        borderRadius="lg"
        shadow="md"
        _hover={{
          shadow: "lg",
          transform: "translateY(-2px)",
          transition: "all 0.2s"
        }}
        position="relative"
        overflow="hidden"
      >
        {/* Search relevance indicator */}
        {searchScore && (
          <Box
            position="absolute"
            top="0"
            right="0"
            w="4px"
            h="100%"
            bg={`${getSearchRelevanceColor()}.400`}
          />
        )}

        <CardHeader pb={2}>
          <Flex justify="space-between" align="start">
            <VStack align="start" spacing={2} flex={1}>
              <Heading size="md" noOfLines={2}>
                <Highlighter
                  highlightStyle={{
                    backgroundColor: highlightBg,
                    padding: "2px 4px",
                    borderRadius: "2px"
                  }}
                  searchWords={searchWords}
                  autoEscape={true}
                  textToHighlight={title}
                />
              </Heading>
              
              {/* Tags */}
              {tags.length > 0 && (
                <Flex wrap="wrap" gap={1}>
                  {tags.slice(0, 3).map((tag, index) => (
                    <Badge
                      key={index}
                      colorScheme="blue"
                      variant="subtle"
                      fontSize="xs"
                      borderRadius="full"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {tags.length > 3 && (
                    <Badge colorScheme="gray" variant="subtle" fontSize="xs">
                      +{tags.length - 3} more
                    </Badge>
                  )}
                </Flex>
              )}
            </VStack>

            <HStack spacing={1}>
              <Tooltip label={starred ? "Unstar" : "Star"}>
                <IconButton
                  size="sm"
                  variant="ghost"
                  icon={<StarIcon />}
                  color={starred ? "yellow.400" : "gray.400"}
                  onClick={() => setStarred(!starred)}
                />
              </Tooltip>
              
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<ExternalLinkIcon />}
                  size="sm"
                  variant="ghost"
                />
                <MenuList>
                  <MenuItem icon={<DownloadIcon />} onClick={exportToPDF}>
                    Export to PDF
                  </MenuItem>
                  <MenuItem icon={<EditIcon />} onClick={onOpen}>
                    Edit Note
                  </MenuItem>
                  <MenuItem icon={<DeleteIcon />} onClick={handleDelete} color="red.500">
                    Delete Note
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </CardHeader>

        <CardBody pt={0}>
          <Text color={textColor} noOfLines={4} fontSize="sm">
            <Highlighter
              highlightStyle={{
                backgroundColor: highlightBg,
                padding: "1px 2px",
                borderRadius: "2px"
              }}
              searchWords={searchWords}
              autoEscape={true}
              textToHighlight={body}
            />
          </Text>
        </CardBody>

        <CardFooter pt={0}>
          <Flex justify="space-between" align="center" w="100%">
            <HStack spacing={3} fontSize="xs" color={textColor}>
              <HStack spacing={1}>
                <TimeIcon />
                <Text>{formatDate(updatedAt || createdAt)}</Text>
              </HStack>
              
              {attachments && attachments.length > 0 && (
                <HStack spacing={1}>
                  <AttachmentIcon />
                  <Text>{attachments.length}</Text>
                </HStack>
              )}
              
              {searchScore && (
                <Badge colorScheme={getSearchRelevanceColor()} variant="subtle" fontSize="2xs">
                  {Math.round((1 - searchScore) * 100)}% match
                </Badge>
              )}
            </HStack>
          </Flex>
        </CardFooter>
      </Card>

      {/* Edit Modal */}
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={handleModalClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Input
                ref={initialRef}
                placeholder="Note title"
                value={tempTitle}
                onChange={(e) => setTitle(e.target.value)}
              />
              
              <Textarea
                placeholder="Write your note here..."
                value={tempBody}
                onChange={(e) => setBody(e.target.value)}
                minH="200px"
                resize="vertical"
              />

              {/* Tags Section */}
              <VStack align="start" w="100%" spacing={2}>
                <Text fontSize="sm" fontWeight="medium">Tags</Text>
                
                <HStack w="100%">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    size="sm"
                  />
                  <Button size="sm" onClick={handleAddTag} leftIcon={<TagIcon />}>
                    Add
                  </Button>
                </HStack>

                {tempTags.length > 0 && (
                  <Flex wrap="wrap" gap={2} w="100%">
                    {tempTags.map((tag, index) => (
                      <Tag key={index} size="md" borderRadius="full" variant="solid" colorScheme="blue">
                        <TagLabel>{tag}</TagLabel>
                        <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                      </Tag>
                    ))}
                  </Flex>
                )}
              </VStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={updateNote} disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Update Note"}
            </Button>
            <Button onClick={handleModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EnhancedNoteCard;
