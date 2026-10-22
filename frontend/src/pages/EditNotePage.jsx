import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Container,
    Spinner,
    Text,
    VStack,
    HStack,
    Button,
    useColorModeValue
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateNotes } from '../redux/notes/note_actions';
import { toast } from 'react-toastify';
import NoteEditor from '../components/Notes/NoteEditor/NoteEditor';

export default function EditNotePage() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [noteFound, setNoteFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState('idle');
    const hasLoadedNote = useRef(false);
    const draftRef = useRef({ title: '', body: '', tags: [] });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, data: notes } = useSelector((state) => state.noteReducer);
    const pageBackground = useColorModeValue('#f7f9fc', '#171d2a');
    const mutedColor = useColorModeValue('#718096', '#a0aec0');

    useEffect(() => {
        if (notes && notes.length > 0) {
            const noteToEdit = notes.find((note) => note._id === id);
            if (noteToEdit) {
                setTitle(noteToEdit.title);
                setBody(noteToEdit.body);
                setTags(noteToEdit.tags || []);
                draftRef.current = { title: noteToEdit.title, body: noteToEdit.body, tags: noteToEdit.tags || [] };
                setNoteFound(true);
                hasLoadedNote.current = true;
                setSaveStatus('saved');
            } else {
                setNoteFound(false);
            }
            setIsLoading(false);
        }
    }, [id, notes]);

    useEffect(() => {
        draftRef.current = { title, body, tags };
    }, [body, tags, title]);

    useEffect(() => {
        if (!hasLoadedNote.current || !noteFound || !title.trim() || !body.trim()) {
            return undefined;
        }

        const snapshot = { title: title.trim(), body: body.trim(), tags };
        const timeoutId = setTimeout(async () => {
            setSaveStatus('saving');
            const didSave = await dispatch(updateNotes(id, snapshot, { silent: true }));
            if (
                draftRef.current.title === snapshot.title &&
                draftRef.current.body === snapshot.body &&
                JSON.stringify(draftRef.current.tags) === JSON.stringify(snapshot.tags)
            ) {
                setSaveStatus(didSave ? 'saved' : 'error');
            }
        }, 1200);

        return () => clearTimeout(timeoutId);
    }, [body, dispatch, id, noteFound, tags, title]);

    const handleSubmit = () => {
        if (!title.trim() || !body.trim()) {
            toast.error('Please fill in both title and body fields');
            return;
        }

        dispatch(updateNotes(id, {
            title: title.trim(),
            body: body.trim(),
            tags
        }));
        navigate('/notes');
    };

    if (isLoading) {
        return (
            <Box bg={pageBackground} minH="100vh" py={8}>
                <Container maxW="4xl">
                    <VStack spacing={6} justify="center" minH="50vh">
                        <Spinner size="xl" color="#4F8CFF" />
                        <Text color={mutedColor}>Loading note...</Text>
                    </VStack>
                </Container>
            </Box>
        );
    }

    if (!noteFound) {
        return (
            <Box bg={pageBackground} minH="100vh" py={8}>
                <Container maxW="4xl">
                    <HStack w="100%" justify="space-between" align="center">
                        <Text fontSize="xl" color={mutedColor}>Note not found</Text>
                        <Button
                            leftIcon={<ArrowBackIcon />}
                            variant="ghost"
                            onClick={() => navigate('/notes')}
                            color={mutedColor}
                        >
                            Back to Notes
                        </Button>
                    </HStack>
                </Container>
            </Box>
        );
    }

    return (
        <NoteEditor
            title={title}
            body={body}
            onTitleChange={setTitle}
            onBodyChange={setBody}
            tags={tags}
            onTagsChange={setTags}
            createdAt={notes.find((note) => note._id === id)?.createdAt}
            updatedAt={notes.find((note) => note._id === id)?.updatedAt}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/notes')}
            isLoading={loading}
            saveStatus={saveStatus}
            mode="edit"
        />
    );
}
