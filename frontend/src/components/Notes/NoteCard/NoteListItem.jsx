import { Card, CardBody, CardHeader, CardFooter, Heading, Text, HStack, Button, Box, Stack, useBreakpointValue, Divider, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Textarea, useDisclosure } from "@chakra-ui/react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useState, useRef } from "react";

export default function NoteListItem({ title, body, createdAt, onUpdate, onDelete, loading }) {
  const [tempTitle, setTitle] = useState(title);
  const [tempBody, setBody] = useState(body);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isReadMoreOpen, onOpen: onReadMoreOpen, onClose: onReadMoreClose } = useDisclosure();
  // Responsive direction: row on md+, column on base
  const actionDirection = useBreakpointValue({ base: 'column', md: 'row' });
  let formattedDate = '';
  if (createdAt) {
    const d = new Date(createdAt);
    formattedDate = d.toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
    });
  }
  // Read More logic
  const MAX_BODY_LINES = 2;
  const isLong = body && body.split(' ').length > 20;
  return (
    <Card className="card" size="md" w="100%" minW="320px" mb={4} boxShadow="md" px={0} py={0}>
      <Flex direction={{ base: 'column', md: 'row' }} align="stretch" w="100%" minH="96px">
        {/* Left: Title, Body, Date */}
        <Box flex="2" px={{ base: 4, md: 6 }} py={4} display="flex" flexDirection="column" justifyContent="center">
          <Flex align="center" justify="space-between" mb={1} gap={2}>
            <Heading size="md" noOfLines={1} fontWeight="bold">{title}</Heading>
            {formattedDate && (
              <Box bg="rgba(36, 174, 199, 0.18)" px={3} py={1} borderRadius="2xl" display="flex" alignItems="center" fontWeight="semibold" color="#2196f3" fontSize="sm" boxShadow="md" style={{backdropFilter:'blur(2px)'}}>
                <FaRegCalendarAlt style={{marginRight:6}} />
                {formattedDate}
              </Box>
            )}
          </Flex>
          <Text color="#222" fontSize="md" noOfLines={MAX_BODY_LINES} opacity={0.95}>{body}</Text>
          {isLong && (
            <Button variant="link" color="#4F8CFF" mt={1} alignSelf="flex-end" fontWeight="bold" fontSize="sm" onClick={onReadMoreOpen}>
              Read More
            </Button>
          )}
          {/* Read More Modal */}
          <Modal isOpen={isReadMoreOpen} onClose={onReadMoreClose} size="lg" isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text whiteSpace="pre-line">{body}</Text>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onReadMoreClose} colorScheme="blue">Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        {/* Divider for desktop */}
        <Divider orientation="vertical" display={{ base: 'none', md: 'block' }} my={4} borderColor="#e0e7ff" />
        {/* Right: Actions */}
        <Flex flex="1" align={{ base: 'stretch', md: 'center' }} justify={{ base: 'center', md: 'flex-end' }} px={{ base: 4, md: 6 }} py={4}>
          <Stack direction={actionDirection} spacing={3} w={{ base: '100%', md: 'auto' }} align={{ base: 'stretch', md: 'center' }}>
            <Button bgColor="#00e9bf" onClick={onOpen} isLoading={loading} w={{ base: '100%', md: '120px' }} fontWeight="bold">Update</Button>
            <Button bgColor="#00e9bf" onClick={onDelete} isLoading={loading} w={{ base: '100%', md: '120px' }} fontWeight="bold">Delete</Button>
          </Stack>
          {/* Update Modal */}
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={() => {
              setTitle(title);
              setBody(body);
              onClose();
            }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Note</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Input
                  value={tempTitle}
                  placeholder={title}
                  onChange={(e) => setTitle(e.target.value)}
                  isRequired
                  ref={initialRef}
                />
                <Textarea
                  mt={8}
                  value={tempBody}
                  placeholder={body}
                  onChange={(e) => setBody(e.target.value)}
                  isRequired
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    if (!tempTitle.trim() || !tempBody.trim()) return;
                    onUpdate(tempTitle, tempBody);
                    onClose();
                  }}
                  isLoading={loading}
                >
                  Update
                </Button>
                <Button onClick={() => {
                  setTitle(title);
                  setBody(body);
                  onClose();
                }}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    </Card>
  );
}
