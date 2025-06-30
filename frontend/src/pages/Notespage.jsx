import { Box, Button, Grid, IconButton, Input, Textarea, useDisclosure, Spinner, Text, FormControl, FormLabel } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes, createNotes } from "../redux/notes/note_actions";
import NoteCard from "../components/Notes/NoteCard/NoteCard";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { toast } from 'react-toastify';

export default function Notespage()
{
    const dispatch = useDispatch()
    const {loading, error, data} = useSelector((state)=>state.noteReducer)
    const [notes, setNotes] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    useEffect(()=>{
        dispatch(getNotes())
    }, [dispatch])

    useEffect(()=>{
        if(data && Array.isArray(data)) {
            setNotes(data)
        }
    }, [data])

    const createNote = ()=>{
        if(!title.trim() || !body.trim()) {
            toast.error("Please fill in both title and body fields");
            return;
        }
        dispatch(createNotes({title, body}))
        setTitle("")
        setBody("")
        onClose()
    }

    const handleModalClose = () => {
        setTitle("");
        setBody("");
        onClose();
    };

    return <Box mt={20} padding={8}>
        {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minH="50vh">
                <Spinner size="xl" color="blue.500" />
            </Box>
        ) : error ? (
            <Box display="flex" justifyContent="center" alignItems="center" minH="50vh">
                <Text color="red.500">Error loading notes. Please try again.</Text>
            </Box>
        ) : notes.length === 0 ? (
            <Box display="flex" justifyContent="center" alignItems="center" minH="50vh">
                <Text>No notes found. Create your first note!</Text>
            </Box>
        ) : (
            <Grid gap={10} w={"100%"} margin={"auto"} gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))">
                {notes.map((el)=><NoteCard key={el._id} {...el}/>)}
            </Grid>
        )}
        <IconButton 
            boxShadow={"rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;"} 
            position={"fixed"} 
            w={"100px"} 
            h={"100px"} 
            bg={"#5b9cf2"} 
            bottom={0} 
            right={0} 
            margin={16} 
            icon={<AddIcon fontSize={30} />} 
            onClick={onOpen}
            isLoading={loading}
            aria-label="Add note"
        />
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={handleModalClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input ref={initialRef} placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Body</FormLabel>
                <Textarea placeholder='Body' value={body} onChange={(e)=>setBody(e.target.value)} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={createNote}>
                Save
              </Button>
              <Button onClick={handleModalClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </Box>
}