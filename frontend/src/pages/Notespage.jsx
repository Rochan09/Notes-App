import { Box, Button, Grid, IconButton, Input, Textarea, useDisclosure, Spinner, Text, FormControl, FormLabel, Tooltip, InputGroup, InputLeftElement, useColorMode, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/Notes/NoteCard/NoteCard";
import { getNotes, updateNotes, deleteNotes, createNotes } from "../redux/notes/note_actions";

function Notespage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Select notes from Redux store
  const notes = useSelector((state) => state.noteReducer.data || []);

  // Search/filter logic
  const searchPlaceholder = colorMode === "dark" ? "#b3d1ff" : "#7b8db0";
  const searchBg = colorMode === "dark" ? "#181f34" : "#f4f7fe";
  const searchColor = colorMode === "dark" ? "#e0e7ff" : "#181f34";
  const searchBorder = colorMode === "dark" ? "1px solid #2a3656" : "1px solid #c3dafe";

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.body.toLowerCase().includes(search.toLowerCase())
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
      {/* Modern Search Bar */}
      <Box mb={12} display="flex" justifyContent="center" alignItems="center" gap={6}>
        <InputGroup maxW="3xl" w="100%">
          <InputLeftElement pointerEvents="none" height="100%" pl={4}>
            <SearchIcon color={colorMode === 'dark' ? '#b3d1ff' : searchPlaceholder} boxSize={9} style={{ marginTop: 2 }} />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search your thoughts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            fontSize="1.5rem"
            pl={16}
            py={8}
            borderRadius="2xl"
            bg={searchBg}
            color={searchColor}
            _placeholder={{ color: searchPlaceholder, fontSize: '1.3rem' }}
            boxShadow={colorMode === 'dark' ? '0 2px 24px #181f34' : '0 2px 24px #e0e7ff'}
            border={searchBorder}
            outline="none"
            transition="all 0.2s"
          />
        </InputGroup>
  {/* Removed ViewToggle, always grid view */}
        <Tooltip label="Add New Note" hasArrow placement="top">
          <IconButton
            boxShadow="0 8px 24px rgba(80, 112, 255, 0.2)"
            w="56px"
            h="56px"
            bg="#4F8CFF"
            color="white"
            icon={<AddIcon fontSize={28} />}
            onClick={handleCreateNote}
            isLoading={loading}
            aria-label="Add note"
            _hover={{
              transform: "scale(1.08)",
              bg: "#6fa8ff",
              boxShadow: "0 12px 32px rgba(80, 112, 255, 0.3)"
            }}
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          />
        </Tooltip>
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
            No notes yet, add your first!
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