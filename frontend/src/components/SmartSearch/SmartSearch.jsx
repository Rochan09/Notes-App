import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Badge,
  Text,
  Flex,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react';
import { SearchIcon, AddIcon } from '@chakra-ui/icons';
import Fuse from 'fuse.js';
import debounce from 'lodash.debounce';

const SmartSearch = ({ 
  notes = [], 
  onSearchResults, 
  onTagFilter, 
  selectedTags = [],
  onAddTag 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestedTags, setSuggestedTags] = useState([]);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Fuse.js configuration for fuzzy search
  const fuseOptions = {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'body', weight: 0.3 },
      { name: 'tags', weight: 0.5 }
    ],
    threshold: 0.3,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2
  };

  const fuse = useMemo(() => new Fuse(notes, fuseOptions), [notes]);

  // Extract all unique tags from notes
  const allTags = useMemo(() => {
    const tagSet = new Set();
    notes.forEach(note => {
      if (note.tags && Array.isArray(note.tags)) {
        note.tags.forEach(tag => tagSet.add(tag.toLowerCase()));
      }
      // Auto-extract keywords from title and body
      const keywords = extractKeywords(note.title + ' ' + note.body);
      keywords.forEach(keyword => tagSet.add(keyword));
    });
    return Array.from(tagSet);
  }, [notes]);

  // Smart keyword extraction
  const extractKeywords = (text) => {
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those'];
    
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3 && !commonWords.includes(word))
      .slice(0, 5); // Limit to top 5 keywords
  };

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((term) => {
      if (!term.trim()) {
        onSearchResults(notes);
        setSuggestedTags([]);
        return;
      }

      const results = fuse.search(term);
      const searchResults = results.map(result => ({
        ...result.item,
        searchScore: result.score,
        matches: result.matches
      }));

      onSearchResults(searchResults);

      // Generate tag suggestions based on search
      const suggestions = allTags
        .filter(tag => 
          tag.includes(term.toLowerCase()) && 
          !selectedTags.includes(tag)
        )
        .slice(0, 5);
      setSuggestedTags(suggestions);
    }, 300),
    [fuse, notes, onSearchResults, allTags, selectedTags]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  // Filter notes by selected tags
  useEffect(() => {
    if (selectedTags.length === 0) {
      onSearchResults(searchTerm ? fuse.search(searchTerm).map(r => r.item) : notes);
      return;
    }

    const filteredNotes = notes.filter(note => {
      const noteTags = note.tags || [];
      const noteKeywords = extractKeywords(note.title + ' ' + note.body);
      const allNoteTags = [...noteTags, ...noteKeywords].map(t => t.toLowerCase());
      
      return selectedTags.some(tag => allNoteTags.includes(tag.toLowerCase()));
    });

    onSearchResults(filteredNotes);
  }, [selectedTags, notes, onSearchResults]);

  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      onTagFilter([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tagToRemove) => {
    onTagFilter(selectedTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <VStack spacing={4} align="stretch">
      {/* Search Input */}
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search notes... (try typing keywords, titles, or content)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg={bgColor}
          borderColor={borderColor}
          _focus={{
            borderColor: 'blue.400',
            boxShadow: '0 0 0 1px blue.400'
          }}
        />
      </InputGroup>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <Box>
          <Text fontSize="sm" color="gray.600" mb={2}>Active Filters:</Text>
          <Flex wrap="wrap" gap={2}>
            {selectedTags.map((tag) => (
              <Tag
                key={tag}
                size="md"
                borderRadius="full"
                variant="solid"
                colorScheme="blue"
              >
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => handleTagRemove(tag)} />
              </Tag>
            ))}
          </Flex>
        </Box>
      )}

      {/* Suggested Tags */}
      {suggestedTags.length > 0 && (
        <Box>
          <Text fontSize="sm" color="gray.600" mb={2}>Suggested Tags:</Text>
          <Flex wrap="wrap" gap={2}>
            {suggestedTags.map((tag) => (
              <Tag
                key={tag}
                size="sm"
                borderRadius="full"
                variant="outline"
                colorScheme="gray"
                cursor="pointer"
                onClick={() => handleTagSelect(tag)}
                _hover={{ bg: 'gray.100' }}
              >
                <TagLabel>{tag}</TagLabel>
                <IconButton
                  size="xs"
                  icon={<AddIcon />}
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTagSelect(tag);
                  }}
                />
              </Tag>
            ))}
          </Flex>
        </Box>
      )}

      {/* Popular Tags */}
      {searchTerm === '' && selectedTags.length === 0 && (
        <Box>
          <Text fontSize="sm" color="gray.600" mb={2}>Popular Tags:</Text>
          <Flex wrap="wrap" gap={2}>
            {allTags.slice(0, 10).map((tag) => (
              <Badge
                key={tag}
                variant="subtle"
                colorScheme="purple"
                cursor="pointer"
                onClick={() => handleTagSelect(tag)}
                _hover={{ bg: 'purple.100' }}
                px={2}
                py={1}
                borderRadius="md"
              >
                {tag}
              </Badge>
            ))}
          </Flex>
        </Box>
      )}
    </VStack>
  );
};

export default SmartSearch;
