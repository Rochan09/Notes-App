import { Box, Button, Grid, IconButton, Input, Textarea, useDisclosure, Spinner, Text, FormControl, FormLabel, Tooltip, InputGroup, InputLeftElement, useColorMode, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useColorModeValue, SimpleGrid } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/Notes/NoteCard/NoteCard";
import { getNotes, updateNotes, deleteNotes, createNotes } from "../redux/notes/note_actions";

function Notespage({ searchQuery }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Select notes from Redux store
  const notes = useSelector((state) => state.noteReducer.data || []);

  // Filter notes based on search query from navbar
  const filteredNotes = notes.filter(
    (note) =>
      !searchQuery ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);
    dispatch(getNotes())
      .catch((err) => setError("Failed to load notes."))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleCreateNote = () => {
    navigate('/notes/create');
  };

  return (
    <Box mt={8} padding={8}>
      {/* Create Button - Left positioned */}
      <Box mb={6} display="flex" justifyContent="flex-start" alignItems="center">
        <Button
          leftIcon={<AddIcon />}
          bg="#4F8CFF"
          color="white"
          size="lg"
          onClick={handleCreateNote}
          isLoading={loading}
          borderRadius="xl"
          px={8}
          py={4}
          fontSize="md"
          fontWeight="semibold"
          _hover={{
            transform: "scale(1.05)",
            bg: "#6fa8ff",
            boxShadow: "0 8px 24px rgba(80, 112, 255, 0.3)"
          }}
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          boxShadow="0 4px 16px rgba(80, 112, 255, 0.2)"
        >
          Create
        </Button>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" minH="50vh">
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              w={4}
              h={4}
              borderRadius="full"
              bg="#4F8CFF"
              animation="bounceDot 1.2s infinite ease-in-out"
              style={{ animationDelay: '0s' }}
            />
            <Box
              w={4}
              h={4}
              borderRadius="full"
              bg="#4F8CFF"
              animation="bounceDot 1.2s infinite ease-in-out"
              style={{ animationDelay: '0.2s' }}
            />
            <Box
              w={4}
              h={4}
              borderRadius="full"
              bg="#4F8CFF"
              animation="bounceDot 1.2s infinite ease-in-out"
              style={{ animationDelay: '0.4s' }}
            />
            <style>{`
              @keyframes bounceDot {
                0%, 80%, 100% { transform: scale(1); opacity: 1; }
                40% { transform: translateY(-16px) scale(1.2); opacity: 0.7; }
              }
            `}</style>
          </Box>
        </Box>
      )}
      {error && (
        <Box display="flex" justifyContent="center" alignItems="center" minH="50vh">
          <Text color="red.500">Error loading notes. Please try again.</Text>
        </Box>
      )}
      {!loading && !error && filteredNotes.length === 0 && (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minH="50vh" gap={6}>
          {/* Cute empty state illustration */}
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="30" width="80" height="60" rx="16" fill="#e0e7ff" />
            <rect x="32" y="44" width="56" height="8" rx="4" fill="#b3c6ff" />
            <rect x="32" y="60" width="36" height="8" rx="4" fill="#b3c6ff" />
            <circle cx="90" cy="80" r="8" fill="#4F8CFF" />
            <ellipse cx="60" cy="100" rx="28" ry="6" fill="#e0e7ff" />
          </svg>
          <Text fontSize="xl" color="gray.500" fontWeight="semibold" textAlign="center">
            {searchQuery ? `No notes found matching "${searchQuery}"` : "No notes yet, add your first!"}
          </Text>
        </Box>
      )}
      {!loading && !error && filteredNotes.length > 0 && (
        <Grid gap={10} w={"100%"} margin={"auto"} gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))">
          {filteredNotes.map((el, index) => <NoteCard key={el._id} {...el} createdAt={el.createdAt} noteNumber={index + 1} />)}
        </Grid>
      )}
    </Box>
  );
}
export default Notespage;