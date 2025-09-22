
import { Button, Flex, Heading, Stack, Text, Box, SimpleGrid, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRegStickyNote, FaSearch, FaMoon, FaMobileAlt, FaReact, FaPalette } from 'react-icons/fa';

const features = [
  {
    icon: <FaRegStickyNote size={28} className="text-blue-400" />,
    title: 'CRUD Notes',
    desc: 'Create, update, and delete notes with ease.'
  },
  {
    icon: <FaSearch size={28} className="text-purple-400" />,
    title: 'Search',
    desc: 'Find notes instantly with smart search.'
  },
  {
    icon: <FaMoon size={28} className="text-yellow-400" />,
    title: 'Dark Mode',
    desc: 'Switch between light and dark themes.'
  },
  {
    icon: <FaMobileAlt size={28} className="text-green-400" />,
    title: 'Responsive UI',
    desc: 'Looks great on any device.'
  },
];

const techStack = [
  { icon: <FaReact size={28} className="text-cyan-400" />, name: 'React' },
  { icon: <FaPalette size={28} className="text-pink-400" />, name: 'Tailwind CSS' },
  { icon: <FaMoon size={28} className="text-yellow-400" />, name: 'Hooks' },
];

export default function Homepage() {
  const nav = useNavigate();
  const { colorMode } = useColorMode();
  // Deep blue gradient for dark mode, soft blue for light
  const bgHero = useColorModeValue(
    'linear-gradient(120deg, #e0e7ff 0%, #f0f4ff 100%)',
    'linear-gradient(120deg, #181f34 0%, #232b45 60%, #232733 100%)'
  );
  // Cards: white in light, deep navy in dark
  const bgSection = useColorModeValue('white', '#232b45');
  // Text: dark gray in light, white in dark
  const textColor = useColorModeValue('gray.700', 'white');
  // Subtle purple for highlights in dark mode
  const highlightColor = useColorModeValue('#6C63FF', '#a78bfa');
  // Button: blue/purple in both, but more vibrant in dark
  const buttonBg = useColorModeValue('linear-gradient(90deg, #6C63FF, #4F8CFF)', 'linear-gradient(90deg, #7f5af0, #4F8CFF)');
  const buttonText = useColorModeValue('white', 'white');

  return (
    <Box minH="100vh" pt={0} bg={bgHero} transition="background 0.3s" display="flex" flexDirection="column">
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <Flex direction="column" align="center" justify="center" py={16} px={4}>
          <Text fontSize="xl" color={highlightColor} mb={4} fontWeight="extrabold" bg={colorMode === 'dark' ? 'rgba(76,99,255,0.12)' : 'transparent'} px={6} py={2} borderRadius="full" letterSpacing="wide">
            Welcome to the future of note-taking
          </Text>
          <Heading as="h1" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} fontWeight="extrabold" textAlign="center" mb={4} color={textColor} lineHeight={1.1}>
            Your Ideas,{' '}
            <span style={{ color: highlightColor, fontSize: '1.1em' }}>Beautifully Organized</span>
          </Heading>
          <Text fontSize={{ base: 'lg', md: '2xl' }} color={textColor} maxW="2xl" textAlign="center" mb={8} fontWeight="medium">
            You can add and edit your text and It is safe and secure.
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={6} mb={4}>
            <Button size="lg" px={10} py={7} fontSize="xl" onClick={() => nav('/notes')} bg={buttonBg} color={buttonText} _hover={{ filter: 'brightness(1.1)' }} boxShadow="lg" fontWeight="bold">
              Start Taking Notes
            </Button>
          </Stack>
        </Flex>
      </motion.div>

      {/* Features Grid */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
        <Box maxW="6xl" mx="auto" py={8}>
          <Heading as="h2" size="lg" textAlign="center" mb={2} color={textColor}>
            Why Choose NotesApp?
          </Heading>
          <Text color={textColor} textAlign="center" mb={8}>
            Experience the perfect blend of simplicity, security, and powerful features
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {features.map((f, i) => (
              <motion.div key={f.title} whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(76, 110, 245, 0.12)' }}>
                <Box bg={bgSection} borderRadius="xl" boxShadow="md" p={6} textAlign="left" transition="all 0.2s" _hover={{ boxShadow: 'xl', borderColor: highlightColor }} borderWidth={colorMode === 'dark' ? '1px' : '0'} borderColor={highlightColor}>
                  <Flex align="center" mb={2} gap={3}>
                    {f.icon}
                    <Text fontWeight="bold" fontSize="lg" color={highlightColor}>{f.title}</Text>
                  </Flex>
                  <Text color={textColor}>{f.desc}</Text>
                </Box>
              </motion.div>
            ))}
          </SimpleGrid>
        </Box>
      </motion.div>

      {/* Tech Stack */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
        <Box maxW="4xl" mx="auto" py={8}>
          <Heading as="h3" size="md" textAlign="center" mb={4} color={textColor}>
            Tech Stack
          </Heading>
          <Flex justify="center" gap={8}>
            {techStack.map((t) => (
              <Flex key={t.name} direction="column" align="center" bg={bgSection} borderRadius="lg" p={4} boxShadow="sm" minW="120px" borderWidth={colorMode === 'dark' ? '1px' : '0'} borderColor={highlightColor}>
                {t.icon}
                <Text mt={2} fontWeight="semibold" color={highlightColor}>{t.name}</Text>
              </Flex>
            ))}
          </Flex>
        </Box>
      </motion.div>

    {/* Footer */}
    <Box as="footer" w="full" py={6} mt="auto" textAlign="center" color={textColor} fontSize="sm" opacity={0.7}>
      © 2024-2025 Rochan Vardhan Boddepalli. All rights reserved.
    </Box>
  </Box>
  );
}
