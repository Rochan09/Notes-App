import { Box, IconButton, useColorMode } from '@chakra-ui/react';
import { FaThLarge, FaListUl } from 'react-icons/fa';

export default function ViewToggle({ view, setView }) {
  const { colorMode } = useColorMode();
  const bgOuter = colorMode === 'dark' ? '#232b3b' : '#f4f6ff';
  const bgInner = colorMode === 'dark' ? '#2d3546' : '#e9eafc';
  const activeColor = colorMode === 'dark' ? '#4F8CFF' : '#1976d2';
  const inactiveColor = colorMode === 'dark' ? '#b0b8c9' : '#7a869a';

  return (
    <Box display="flex" alignItems="center" bg={bgOuter} borderRadius="2xl" p={2} boxShadow="md" gap={2}>
      <Box
        bg={view === 'grid' ? bgInner : 'transparent'}
        borderRadius="xl"
        p={2}
        transition="all 0.2s"
      >
        <IconButton
          aria-label="Grid View"
          icon={<FaThLarge size={28} color={view === 'grid' ? activeColor : inactiveColor} />}
          variant="ghost"
          onClick={() => setView('grid')}
          _hover={{ bg: bgInner }}
          isActive={view === 'grid'}
        />
      </Box>
      <Box
        bg={view === 'list' ? bgInner : 'transparent'}
        borderRadius="xl"
        p={2}
        transition="all 0.2s"
      >
        <IconButton
          aria-label="List View"
          icon={<FaListUl size={28} color={view === 'list' ? activeColor : inactiveColor} />}
          variant="ghost"
          onClick={() => setView('list')}
          _hover={{ bg: bgInner }}
          isActive={view === 'list'}
        />
      </Box>
    </Box>
  );
}
