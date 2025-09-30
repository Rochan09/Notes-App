import {
  Box,
  Flex,
  Text,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorMode,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, SearchIcon } from '@chakra-ui/icons';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaRegStickyNote } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../../redux/users/user_types';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function Navbar({ onSearch }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const {auth, user} = useSelector((state)=>state.userReducer)
  const location = useLocation();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    dispatch({type: LOGOUT});
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    nav("/");
  };

  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  return (
    <Box
      zIndex={"9999"}
      top={0}
      position={"sticky"}
      w={"100%"}
      boxShadow={
        colorMode === 'light'
          ? "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 2px 8px 0 rgba(31, 38, 135, 0.2)"
          : "0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 2px 8px 0 rgba(0, 0, 0, 0.2)"
      }
      bg={
        colorMode === 'light'
          ? 'rgba(255, 255, 255, 0.25)'
          : 'rgba(40, 54, 85, 0.25)'
      }
      backdropFilter="blur(12px)"
      WebkitBackdropFilter="blur(12px)"
      borderBottom={
        colorMode === 'light'
          ? '1px solid rgba(255, 255, 255, 0.18)'
          : '1px solid rgba(255, 255, 255, 0.1)'
      }
      px={{ base: 2, sm: 4 }}
      style={{ 
        transition: 'all 0.3s ease-in-out', 
        marginBottom: 0,
        background: colorMode === 'light' 
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)'
          : 'linear-gradient(135deg, rgba(40, 54, 85, 0.3) 0%, rgba(79, 140, 255, 0.15) 100%)'
      }}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box 
          fontWeight={"bold"} 
          cursor="pointer" 
          fontSize={{ base: 'lg', sm: 'xl' }} 
          onClick={()=>{nav("/")}}
          color={colorMode === 'light' ? '#4F8CFF' : '#fff'}
          textShadow={colorMode === 'light' ? '0 0 20px rgba(79, 140, 255, 0.3)' : '0 0 20px rgba(255, 255, 255, 0.2)'}
          transition="all 0.3s ease"
          _hover={{
            transform: 'scale(1.05)',
            textShadow: colorMode === 'light' ? '0 0 25px rgba(79, 140, 255, 0.5)' : '0 0 25px rgba(255, 255, 255, 0.4)'
          }}
        >
          📝 Notes App
        </Box>
        {/* Theme toggle and Hamburger for mobile */}
        <Flex alignItems="center" display={{ base: 'flex', md: 'none' }}>
          <Button 
            bg={colorMode === 'dark' ? 'rgba(20, 25, 40, 0.4)' : 'rgba(249, 115, 22, 0.15)'}
            backdropFilter="blur(10px)"
            border={colorMode === 'dark' ? '1px solid rgba(30, 35, 50, 0.5)' : '1px solid rgba(249, 115, 22, 0.25)'}
            color={colorMode === 'light' ? 'orange.600' : 'orange.200'}
            onClick={toggleColorMode} 
            _hover={{ 
              bg: colorMode === 'dark' ? 'rgba(25, 30, 45, 0.5)' : 'rgba(249, 115, 22, 0.25)',
              transform: 'translateY(-2px) scale(1.05)',
              boxShadow: colorMode === 'dark' ? '0 4px 15px rgba(20, 25, 40, 0.4)' : '0 8px 20px rgba(249, 115, 22, 0.2)'
            }} 
            size="sm" 
            mr={2}
            borderRadius="12px"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Box
            onClick={isDrawerOpen ? onDrawerClose : onDrawerOpen}
            cursor="pointer"
            aria-label="Open menu"
            p={2}
            borderRadius="12px"
            bg={colorMode === 'dark' ? 'rgba(15, 20, 35, 0.4)' : 'rgba(22, 163, 74, 0.1)'}
            backdropFilter="blur(10px)"
            border={colorMode === 'dark' ? '1px solid rgba(25, 30, 45, 0.5)' : '1px solid rgba(22, 163, 74, 0.15)'}
            color={colorMode === 'light' ? 'green.600' : 'green.200'}
            _hover={{
              bg: colorMode === 'dark' ? 'rgba(20, 25, 40, 0.5)' : 'rgba(22, 163, 74, 0.15)',
              transform: 'scale(1.02)',
              boxShadow: colorMode === 'dark' ? '0 2px 8px rgba(15, 20, 35, 0.4)' : '0 2px 8px rgba(22, 163, 74, 0.15)'
            }}
            _active={{
              transform: 'scale(0.98)',
            }}
            transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </Box>
        </Flex>
        {/* Desktop Nav */}
        <Flex alignItems={'center'} display={{ base: 'none', md: 'flex' }} gap={4}>
          {/* Search Bar - Only show on notes page AND when user is logged in */}
          {auth && location.pathname === '/notes' && (
            <InputGroup maxW="400px" w="300px">
              <InputLeftElement pointerEvents="none" height="100%" pl={2}>
                <SearchIcon color={colorMode === 'dark' ? '#b3d1ff' : '#7b8db0'} boxSize={4} />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  onSearch && onSearch(e.target.value);
                }}
                fontSize="sm"
                pl={10}
                py={2}
                borderRadius="lg"
                bg={colorMode === 'dark' ? 'rgba(40, 54, 85, 0.4)' : 'rgba(255, 255, 255, 0.4)'}
                color={colorMode === 'dark' ? '#e0e7ff' : '#181f34'}
                _placeholder={{ color: colorMode === 'dark' ? '#b3d1ff' : '#7b8db0', fontSize: 'sm' }}
                boxShadow={colorMode === 'dark' ? '0 2px 12px rgba(0,0,0,0.3)' : '0 2px 12px rgba(79,140,255,0.1)'}
                border={colorMode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(79,140,255,0.2)'}
                backdropFilter="blur(10px)"
                outline="none"
                transition="all 0.2s"
                _focus={{
                  boxShadow: colorMode === 'dark' ? '0 0 0 2px rgba(79,140,255,0.3)' : '0 0 0 2px rgba(79,140,255,0.2)',
                  borderColor: '#4F8CFF'
                }}
              />
            </InputGroup>
          )}
          <Stack alignItems = {"center"} direction={'row'} spacing={5}>
            {!auth && (
              <NavLink
                to="/"
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6em', position: 'relative' }}
                className={({ isActive }) => {
                  const isDark = colorMode === 'dark';
                  return `flex items-center px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 text-base nav-card ` +
                    (isActive
                      ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-600 shadow-lg border border-blue-500/30 backdrop-blur-md'
                      : isDark
                        ? 'text-gray-200 hover:bg-yellow-500/20 hover:text-yellow-300 hover:shadow-md hover:border hover:border-yellow-400/30'
                        : 'text-gray-700 hover:bg-yellow-100/80 hover:text-yellow-800 hover:shadow-md hover:border hover:border-yellow-300/50');
                }}
              >
                <FaHome style={{ fontSize: 20, marginRight: '0.4em', filter: 'drop-shadow(0 0 6px currentColor)' }} /> Home
              </NavLink>
            )}
            <NavLink
              to="/notes"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6em', position: 'relative' }}
              className={({ isActive }) => {
                const isDark = colorMode === 'dark';
                return `flex items-center px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 text-base nav-card ` +
                  (isActive
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-emerald-600 shadow-lg border border-emerald-500/30 backdrop-blur-md'
                    : isDark
                      ? 'text-gray-200 hover:bg-emerald-500/20 hover:text-emerald-300 hover:shadow-md hover:border hover:border-emerald-400/30'
                      : 'text-gray-700 hover:bg-emerald-50/80 hover:text-emerald-700 hover:shadow-md hover:border hover:border-emerald-300/50');
              }}
            >
              <FaRegStickyNote style={{ fontSize: 20, marginRight: '0.4em', filter: 'drop-shadow(0 0 6px currentColor)' }} /> Notes
            </NavLink>
            <Button 
              bg={colorMode === 'dark' ? 'rgba(251, 146, 60, 0.2)' : 'rgba(249, 115, 22, 0.15)'}
              backdropFilter="blur(10px)"
              border={colorMode === 'dark' ? '1px solid rgba(251, 146, 60, 0.3)' : '1px solid rgba(249, 115, 22, 0.25)'}
              color={colorMode === 'light' ? 'orange.600' : 'orange.300'}
              onClick={toggleColorMode} 
              _hover={{ 
                bg: colorMode === 'dark' ? 'rgba(251, 146, 60, 0.3)' : 'rgba(249, 115, 22, 0.25)',
                transform: 'translateY(-2px) scale(1.05)',
                boxShadow: colorMode === 'dark' ? '0 8px 20px rgba(251, 146, 60, 0.3)' : '0 8px 20px rgba(249, 115, 22, 0.2)'
              }}
              borderRadius="12px"
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              size="md"
              px={4}
            >{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
            <Menu>
              <MenuButton
                display={auth?"block":"none"}
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
                className="avatar-glass"
                bg="rgba(79, 140, 255, 0.15)"
                backdropFilter="blur(10px)"
                border="2px solid rgba(79, 140, 255, 0.3)"
                _focus={{ 
                  boxShadow: '0 0 0 3px rgba(79, 140, 255, 0.4)',
                  transform: 'scale(1.05)'
                }}
                _hover={{ 
                  boxShadow: '0 0 0 4px rgba(79, 140, 255, 0.5), 0 8px 20px rgba(79, 140, 255, 0.3)', 
                  transform: 'scale(1.08)',
                  bg: 'rgba(79, 140, 255, 0.2)'
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                p={1}
              >
                <Avatar size={'sm'} src={'/astronaut.png'} />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Center><Avatar size={'2xl'} src={'/astronaut.png'} /></Center>
                <br />
                <Center><p>{user}</p></Center>
                <br />
                <MenuDivider />
                <MenuItem
                  onClick={handleLogout}
                  colorScheme="red"
                  fontWeight="bold"
                  color="red.500"
                  _hover={{ bg: 'red.50', color: 'red.600' }}
                  _dark={{ color: 'red.400', _hover: { bg: 'red.900', color: 'red.300' } }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
      {/* Glass morphism navigation card styles */}
      <style>{`
        .nav-card {
          position: relative;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-card:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 
            0 10px 25px rgba(79, 140, 255, 0.2),
            0 5px 15px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        
        .nav-card.active {
          box-shadow: 
            0 8px 20px rgba(79, 140, 255, 0.3),
            0 3px 10px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        
        .avatar-glass {
          position: relative;
          overflow: hidden;
        }
        
        .avatar-glass::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: rotate(45deg);
          transition: all 0.5s;
          opacity: 0;
        }
        
        .avatar-glass:hover::before {
          opacity: 1;
          transform: rotate(45deg) translate(100%, 100%);
        }
        
        /* Glass card animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        
        .nav-card:nth-child(odd) {
          animation: float 6s ease-in-out infinite;
        }
        
        .nav-card:nth-child(even) {
          animation: float 6s ease-in-out infinite reverse;
        }
      `}</style>
        </Flex>
      </Flex>
      {/* Mobile Nav Drawer */}
      <Drawer placement="right" onClose={onDrawerClose} isOpen={isDrawerOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent
          bg={colorMode === 'light' ? 'rgba(255,255,255,0.98)' : 'rgba(30,41,59,0.95)'}
          maxW="240px"
          maxH="auto"
          h="fit-content"
          mt="80px"
          mr="16px"
          borderRadius="16px"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: colorMode === 'light' 
              ? '1px solid rgba(0, 0, 0, 0.1)' 
              : '1px solid rgba(255,255,255,0.1)',
            boxShadow: colorMode === 'light'
              ? '0 10px 25px rgba(0, 0, 0, 0.25)'
              : '0 10px 25px rgba(0, 0, 0, 0.3)'
          }}
        >
          <DrawerCloseButton 
            size="sm"
            mt={2} 
            mr={2}
            bg="transparent"
            color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
            _hover={{
              bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
            }}
          />
          <DrawerBody p={4} pt={8} pb={4}>
            {/* Mobile Search Bar - Only show when user is logged in */}
            {auth && (
              <Box mb={3}>
                <InputGroup size="sm">
                  <InputLeftElement pointerEvents="none" height="100%" pl={2}>
                    <Text fontSize="sm">🔍</Text>
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Search notes..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      onSearch && onSearch(e.target.value);
                    }}
                    fontSize="xs"
                    pl={8}
                    py={1}
                    h="32px"
                    borderRadius="full"
                    bg={colorMode === 'dark' ? 'rgba(40, 54, 85, 0.4)' : 'rgba(255, 255, 255, 0.9)'}
                    color={colorMode === 'dark' ? '#e0e7ff' : '#374151'}
                    _placeholder={{ color: colorMode === 'dark' ? '#b3d1ff' : '#6b7280', fontSize: 'xs' }}
                    boxShadow="none"
                    border={colorMode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'}
                    _focus={{
                      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.3)',
                      borderColor: '#3b82f6'
                    }}
                  />
                </InputGroup>
              </Box>
            )}
            
            <Stack spacing={2}>
              {/* Navigation Section */}
              <Stack spacing={1}>
                {!auth && (
                  <Box
                    as={NavLink}
                    to="/"
                    onClick={onDrawerClose}
                    display="flex"
                    alignItems="center"
                    px={3}
                    py={2.5}
                    borderRadius="lg"
                    fontSize="sm"
                    fontWeight="medium"
                    color={colorMode === 'dark' ? 'gray.200' : 'gray.700'}
                    bg="transparent"
                    _hover={{
                      bg: colorMode === 'dark' ? 'blue.500/20' : 'blue.50',
                      color: colorMode === 'dark' ? 'blue.300' : 'blue.600',
                      boxShadow: 'sm'
                    }}
                    transition="all 0.2s"
                    cursor="pointer"
                  >
                    <Text fontSize="md" mr={3}>🏠</Text> Home
                  </Box>
                )}
                
                <Box
                  as={NavLink}
                  to="/notes"
                  onClick={onDrawerClose}
                  display="flex"
                  alignItems="center"
                  px={3}
                  py={2.5}
                  borderRadius="lg"
                  fontSize="sm"
                  fontWeight="medium"
                  color={colorMode === 'dark' ? 'gray.200' : 'gray.700'}
                  bg="transparent"
                  _hover={{
                    bg: colorMode === 'dark' ? 'blue.500/20' : 'blue.50',
                    color: colorMode === 'dark' ? 'blue.300' : 'blue.600',
                    boxShadow: 'sm'
                  }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  <Text fontSize="md" mr={3}>📝</Text> Notes
                </Box>
                
                {auth && (
                  <Box
                    as={NavLink}
                    to="/notes/create"
                    onClick={onDrawerClose}
                    display="flex"
                    alignItems="center"
                    px={3}
                    py={2.5}
                    borderRadius="lg"
                    fontSize="sm"
                    fontWeight="medium"
                    color={colorMode === 'dark' ? 'gray.200' : 'gray.700'}
                    bg="transparent"
                    _hover={{
                      bg: colorMode === 'dark' ? 'green.500/20' : 'green.50',
                      color: colorMode === 'dark' ? 'green.300' : 'green.600',
                      boxShadow: 'sm'
                    }}
                    transition="all 0.2s"
                    cursor="pointer"
                  >
                    <Text fontSize="md" mr={3}>➕</Text> New Note
                  </Box>
                )}
              </Stack>
              
              {auth && (
                <>
                  {/* Divider */}
                  <Divider borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'} />
                  
                  {/* User Profile Section */}
                  <Box px={1}>
                    <Flex align="center" mb={3} px={2} py={1}>
                      <Text fontSize="md" mr={3}>👤</Text>
                      <Text fontSize="sm" fontWeight="medium" color={colorMode === 'dark' ? 'gray.100' : 'gray.700'} isTruncated>
                        {user}
                      </Text>
                    </Flex>
                    
                    {/* Settings removed */}
                  </Box>
                  
                  {/* Divider */}
                  <Divider borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'} />
                  
                  {/* Logout Section */}
                  <Box px={1}>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      fontSize="sm"
                      fontWeight="medium"
                      w="full"
                      h="auto"
                      py={2.5}
                      px={3}
                      justifyContent="flex-start"
                      borderRadius="lg"
                      color={colorMode === 'dark' ? 'red.300' : 'red.600'}
                      bg="transparent"
                      _hover={{
                        bg: colorMode === 'dark' ? 'red.500/20' : 'red.50',
                        color: colorMode === 'dark' ? 'red.200' : 'red.700',
                        boxShadow: 'sm'
                      }}
                      transition="all 0.2s"
                    >
                      <Text fontSize="md" mr={3}>🚪</Text> Logout
                    </Button>
                  </Box>
                </>
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}