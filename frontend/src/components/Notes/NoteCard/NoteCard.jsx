import { Button, Card, CardBody, Heading, Text, CardHeader, CardFooter, HStack, Spinner } from "@chakra-ui/react"
import "./notestyle.css"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteNotes, updateNotes } from "../../../redux/notes/note_actions"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Textarea,
    useDisclosure
} from "@chakra-ui/react";
import { toast } from 'react-toastify';

export default function NoteCard({title, body, user, _id}){
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.noteReducer);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [tempTitle, setTitle] = useState(title);
    const [tempBody, setBody] = useState(body);

    const updateNote = ()=>{
        if(!tempTitle.trim() || !tempBody.trim()) {
            toast.error("Please fill in both title and body fields");
            return;
        }
        dispatch(updateNotes(_id, {title: tempTitle, body: tempBody}));
        onClose();
    };

    const handleModalClose = () => {
        setTitle(title);
        setBody(body);
        onClose();
    };

    const handleDelete = () => {
        if(window.confirm("Are you sure you want to delete this note?")) {
            dispatch(deleteNotes(_id));
        }
    };

    return (
        <Card className="card" align={"center"} size='md'>
            <CardHeader height={"20%"} alignItems={'center'}>
                <Heading size='xl' noOfLines={1}>{title}</Heading>
            </CardHeader>
            <CardBody mt={"10px"} height = {"50%"}>
                <Text noOfLines={"8"}>{body}</Text>
            </CardBody>
            <CardFooter height={"30%"}>
                <HStack width = {"100%"}>
                    <Button 
                        bgColor={"#00e9bf"} 
                        onClick={onOpen}
                        isLoading={loading}
                    >
                        Update
                    </Button>
                    <Modal
                        initialFocusRef={initialRef}
                        finalFocusRef={finalRef}
                        isOpen={isOpen}
                        onClose={handleModalClose}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Update Note</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <Input 
                                    value={tempTitle} 
                                    placeholder={title} 
                                    onChange={(e)=>setTitle(e.target.value)}
                                    isRequired
                                    ref={initialRef}
                                />
                                <Textarea 
                                    mt={8} 
                                    value={tempBody} 
                                    placeholder={body} 
                                    onChange={(e)=>setBody(e.target.value)}
                                    isRequired
                                />
                            </ModalBody>

                            <ModalFooter>
                                <Button 
                                    colorScheme="blue" 
                                    mr={3} 
                                    onClick={updateNote}
                                    isLoading={loading}
                                >
                                    Update
                                </Button>
                                <Button onClick={handleModalClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Button 
                        bgColor={"#00e9bf"} 
                        onClick={handleDelete}
                        isLoading={loading}
                    >
                        Delete
                    </Button>
                </HStack>
            </CardFooter>
        </Card>
    );
}