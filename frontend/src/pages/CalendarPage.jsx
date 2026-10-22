import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FaCalendarAlt, FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../constants/config";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  SimpleGrid,
  Spinner,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getMonthDays = (month) => {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const leadingDays = firstDay.getDay();
  return Array.from({ length: leadingDays + daysInMonth }, (_, index) => (
    index < leadingDays ? null : new Date(month.getFullYear(), month.getMonth(), index - leadingDays + 1)
  ));
};

const specialDays = {
  "01-01": { title: "New Year's Day", color: "purple" },
  "01-26": { title: "Republic Day", color: "orange" },
  "02-14": { title: "Valentine's Day", color: "pink" },
  "03-08": { title: "International Women's Day", color: "pink" },
  "04-22": { title: "Earth Day", color: "green" },
  "05-01": { title: "Labour Day", color: "orange" },
  "06-05": { title: "World Environment Day", color: "green" },
  "06-21": { title: "International Yoga Day", color: "blue" },
  "08-15": { title: "Independence Day", color: "orange" },
  "08-19": { title: "World Photography Day", color: "purple" },
  "09-05": { title: "Teachers' Day", color: "blue" },
  "10-02": { title: "Gandhi Jayanti", color: "green" },
  "10-31": { title: "Halloween", color: "orange" },
  "11-14": { title: "Children's Day", color: "pink" },
  "12-25": { title: "Christmas Day", color: "red" },
  "12-31": { title: "New Year's Eve", color: "purple" },
};

const getSpecialDay = (date) => date ? specialDays[formatDate(date).slice(5)] : null;

function CalendarPage() {
  const token = useSelector((state) => state.userReducer.token);
  const toast = useToast();
  const [month, setMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => formatDate(new Date()));
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [completed, setCompleted] = useState(false);
  const headingColor = useColorModeValue("gray.800", "white");
  const cardBg = useColorModeValue("white", "gray.800");
  const mutedColor = useColorModeValue("gray.500", "gray.400");
  const pageBg = useColorModeValue("#f4f7ff", "#101827");
  const calendarBg = useColorModeValue("rgba(255, 255, 255, 0.92)", "rgba(30, 41, 59, 0.92)");
  const today = formatDate(new Date());
  const days = useMemo(() => getMonthDays(month), [month]);

  const loadReminders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reminder`, {
        headers: { Authorization: token },
      });
      if (response.data.status === 1) {
        setReminders(response.data.data);
      } else {
        throw new Error(response.data.message || "Failed to load reminders");
      }
    } catch (error) {
      toast({ title: error.response?.data?.message || "Failed to load reminders", status: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReminders();
  }, [token]);

  const selectedReminders = reminders.filter((reminder) => reminder.date === selectedDate);
  const selectedSpecialDay = specialDays[selectedDate.slice(5)];

  const handleDelete = async (reminderId) => {
    setDeletingId(reminderId);
    try {
      const response = await axios.delete(`${API_BASE_URL}/reminder`, {
        headers: { Authorization: token, id: reminderId },
      });
      if (response.data.status !== 1) throw new Error(response.data.message);
      setReminders((current) => current.filter((reminder) => reminder._id !== reminderId));
      toast({ title: "Reminder deleted", status: "success" });
    } catch (error) {
      toast({ title: error.response?.data?.message || error.message || "Failed to delete reminder", status: "error" });
    } finally {
      setDeletingId(null);
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/reminder/create`, {
        title: title.trim(),
        description: description.trim(),
        date: selectedDate,
        time,
        completed,
      }, { headers: { Authorization: token } });
      if (response.data.status !== 1) throw new Error(response.data.message);
      setReminders((current) => [...current, response.data.data]);
      setTitle("");
      setDescription("");
      setTime("");
      setCompleted(false);
      toast({ title: "Reminder added", status: "success" });
    } catch (error) {
      toast({ title: error.response?.data?.message || error.message || "Failed to add reminder", status: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box minH="calc(100vh - 64px)" bg={pageBg} px={{ base: 3, sm: 5, md: 8, xl: 12 }} py={{ base: 5, md: 8 }}>
      <Box maxW="1600px" mx="auto">
        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap={5}
          mb={6}
          p={{ base: 5, md: 7 }}
          borderRadius="3xl"
          color="white"
          bg="linear-gradient(120deg, #356dff 0%, #7356e8 52%, #a457d8 100%)"
          boxShadow="0 18px 45px rgba(79, 92, 225, 0.28)"
          position="relative"
          overflow="hidden"
          _after={{
            content: '""',
            position: "absolute",
            width: "240px",
            height: "240px",
            borderRadius: "full",
            bg: "rgba(255,255,255,0.12)",
            right: "-70px",
            top: "-110px",
          }}
        >
          <Box position="relative" zIndex={1}>
            <Flex align="center" gap={3}>
              <Box bg="rgba(255,255,255,0.2)" p={3} borderRadius="2xl">
                <FaCalendarAlt size={25} />
              </Box>
              <Box>
                <Heading size={{ base: "lg", md: "xl" }}>Your Calendar</Heading>
                <Text color="whiteAlpha.800" mt={1}>Make space for what matters.</Text>
              </Box>
            </Flex>
          </Box>
          <Flex gap={2} position="relative" zIndex={1}>
            <Button bg="whiteAlpha.300" color="white" _hover={{ bg: "whiteAlpha.400" }} onClick={() => setMonth(new Date())}>Today</Button>
            <Button bg="whiteAlpha.300" color="white" _hover={{ bg: "whiteAlpha.400" }} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>←</Button>
            <Button bg="whiteAlpha.300" color="white" _hover={{ bg: "whiteAlpha.400" }} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>→</Button>
          </Flex>
        </Flex>

        <SimpleGrid columns={{ base: 1, xl: 3 }} gap={{ base: 5, xl: 7 }} alignItems="start">
          <Box gridColumn={{ base: "auto", xl: "span 2" }} bg={calendarBg} borderRadius="3xl" p={{ base: 3, sm: 5, md: 7 }} boxShadow="0 12px 35px rgba(58, 76, 130, 0.12)" borderWidth="1px" borderColor="whiteAlpha.600">
            <Flex justify="space-between" align="center" mb={5} px={{ base: 1, md: 2 }}>
              <Box>
                <Heading size="lg" color={headingColor}>
                  {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </Heading>
                <Text color={mutedColor} fontSize="sm" mt={1}>Select a date to see your plans</Text>
              </Box>
              <Box display={{ base: "none", sm: "block" }} color="#4F8CFF" fontWeight="bold" fontSize="sm">
                {reminders.length} total reminder{reminders.length === 1 ? "" : "s"}
              </Box>
            </Flex>
            <Grid templateColumns="repeat(7, 1fr)" gap={{ base: 1, sm: 2, md: 3 }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <Text key={day} textAlign="center" fontSize={{ base: "xs", sm: "sm" }} fontWeight="bold" color={mutedColor} pb={2}>{day}</Text>
            ))}
            {days.map((day, index) => {
              const date = day ? formatDate(day) : `empty-${index}`;
              const count = reminders.filter((reminder) => reminder.date === date).length;
              const specialDay = getSpecialDay(day);
              return (
                <Button
                  key={date}
                  minH={{ base: "58px", sm: "82px", md: "105px" }}
                  h="auto"
                  isDisabled={!day}
                  variant="ghost"
                  bg={selectedDate === date ? "linear-gradient(145deg, #4f8cff, #755be8)" : day && date === today ? "blue.50" : "transparent"}
                  color={selectedDate === date ? "white" : headingColor}
                  borderWidth="1px"
                  borderColor={selectedDate === date ? "transparent" : day && date === today ? "blue.200" : "blackAlpha.100"}
                  borderRadius={{ base: "lg", sm: "xl" }}
                  _hover={{ bg: selectedDate === date ? "linear-gradient(145deg, #4f8cff, #755be8)" : "blue.50", transform: "translateY(-2px)", boxShadow: "sm" }}
                  transition="all 0.2s"
                  onClick={() => day && setSelectedDate(date)}
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  p={{ base: 2, sm: 3 }}
                  gap={2}
                >
                  {day && <Text fontSize={{ base: "sm", sm: "md" }} fontWeight="bold">{day.getDate()}</Text>}
                  {specialDay && <Text fontSize="xs" color={selectedDate === date ? "whiteAlpha.900" : `${specialDay.color}.500`} fontWeight="bold" noOfLines={1} display={{ base: "none", sm: "block" }}>
                    ✦ {specialDay.title}
                  </Text>}
                  {count > 0 && <Box w="full" textAlign="left" display={{ base: "none", sm: "block" }}>
                    <Text fontSize="xs" color={selectedDate === date ? "whiteAlpha.900" : "blue.500"} fontWeight="semibold">
                      • {count} reminder{count === 1 ? "" : "s"}
                    </Text>
                  </Box>}
                </Button>
              );
            })}
            </Grid>
          </Box>

        <Box bg={cardBg} borderRadius="3xl" p={{ base: 5, md: 7 }} boxShadow="0 12px 35px rgba(58, 76, 130, 0.12)" borderWidth="1px" borderColor="blackAlpha.50">
          {selectedSpecialDay && (
            <Box mb={4} p={3} borderRadius="xl" bg={`${selectedSpecialDay.color}.50`} borderWidth="1px" borderColor={`${selectedSpecialDay.color}.200`}>
              <Text fontSize="xs" fontWeight="bold" color={`${selectedSpecialDay.color}.600`} textTransform="uppercase">Special day</Text>
              <Text fontWeight="bold" color={`${selectedSpecialDay.color}.700`}>✦ {selectedSpecialDay.title}</Text>
            </Box>
          )}
          <Heading size="md" mb={4}>
            {new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </Heading>
          <Box as="form" onSubmit={handleCreate} mb={6}>
            <FormControl isRequired mb={3}>
              <FormLabel>Reminder</FormLabel>
              <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What do you need to remember?" />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Description</FormLabel>
              <Textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Add more details" />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Time</FormLabel>
              <Input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
            </FormControl>
            <Checkbox mb={4} isChecked={completed} onChange={(event) => setCompleted(event.target.checked)}>Already completed</Checkbox>
            <Button type="submit" colorScheme="blue" isLoading={saving} w="full">Add reminder</Button>
          </Box>
          <Heading size="sm" mb={3}>Reminders</Heading>
          {loading ? <Spinner /> : selectedReminders.length === 0 ? (
            <Text color={mutedColor}>No reminders for this date.</Text>
          ) : selectedReminders.map((reminder) => (
            <Box key={reminder._id} borderWidth="1px" borderRadius="lg" p={3} mb={2}>
              <Flex justify="space-between" align="flex-start" gap={3}>
                <Box>
                  <Text fontWeight="bold" textDecoration={reminder.completed ? "line-through" : "none"}>{reminder.title}</Text>
                  {reminder.time && <Text fontSize="sm" color={mutedColor}>{reminder.time}</Text>}
                  {reminder.description && <Text fontSize="sm" mt={1}>{reminder.description}</Text>}
                </Box>
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  aria-label={`Delete reminder: ${reminder.title}`}
                  leftIcon={<FaTrashAlt />}
                  isLoading={deletingId === reminder._id}
                  onClick={() => handleDelete(reminder._id)}
                >
                  Delete
                </Button>
              </Flex>
            </Box>
          ))}
          <Flex mt={5} pt={4} borderTopWidth="1px" gap={4} wrap="wrap" color={mutedColor} fontSize="xs">
            <Text>✦ Special day</Text>
            <Text>• Personal reminder</Text>
          </Flex>
        </Box>
      </SimpleGrid>
      </Box>
    </Box>
  );
}

export default CalendarPage;
