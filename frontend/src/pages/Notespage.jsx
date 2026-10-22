import { Box, Button, Flex, Grid, Heading, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/Notes/NoteCard/NoteCard";
import { getNotes } from "../redux/notes/note_actions";

function Notespage({ searchQuery }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const headingColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');

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
    <Box
      className="notes-page"
      minH="calc(100vh - 64px)"
      mt={0}
      px={{ base: 4, sm: 6, md: 8, xl: 10 }}
      pt={{ base: 5, md: 8 }}
      pb={{ base: 8, md: 12 }}
    >
      <Flex
        align={{ base: 'flex-start', sm: 'center' }}
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        gap={4}
        mb={{ base: 6, md: 8 }}
      >
        <Box>
          <Heading size="lg" color={headingColor} letterSpacing="-0.02em">
            My Notes
          </Heading>
          <HStack spacing={2} mt={1} color={mutedColor} fontSize="sm">
            <Text>{notes.length} {notes.length === 1 ? 'note' : 'notes'}</Text>
            {searchQuery && <Text>· {filteredNotes.length} matching</Text>}
          </HStack>
        </Box>
        <Button
          leftIcon={<AddIcon />}
          bg="#4F8CFF"
          color="white"
          size="md"
          onClick={handleCreateNote}
          isLoading={loading}
          borderRadius="xl"
          px={{ base: 5, md: 6 }}
          py={{ base: 2, md: 3 }}
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
          New note
        </Button>
      </Flex>

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
        <Grid
          gap={{ base: 4, md: 5, lg: 6 }}
          w="100%"
          margin="auto"
          gridTemplateColumns={{
            base: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))"
          }}
        >
          {filteredNotes.map((el, index) => <NoteCard key={el._id} {...el} createdAt={el.createdAt} updatedAt={el.updatedAt} noteNumber={index + 1} />)}
        </Grid>
      )}
    </Box>
  );
}
export default Notespage;