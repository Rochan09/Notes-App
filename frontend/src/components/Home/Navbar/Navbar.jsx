import {
  Box,
  Flex,
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
      boxShadow={"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"}
      bg={
        colorMode === 'light'
          ? 'linear-gradient(90deg, #a770ef 0%, #f6d365 100%)'
          : 'linear-gradient(90deg, #232733 0%, #4F8CFF 100%)'
      }
      px={{ base: 2, sm: 4 }}
      style={{ transition: 'background 0.3s', marginBottom: 0, borderBottom: 'none' }}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box fontWeight={"bold"} cursor="pointer" fontSize={{ base: 'lg', sm: 'xl' }} onClick={()=>{nav("/")}}>
          Notes App
        </Box>
        {/* Theme toggle and Hamburger for mobile */}
        <Flex alignItems="center" display={{ base: 'flex', md: 'none' }}>
          <Button bg={"#01d8fb"} onClick={toggleColorMode} _hover={{ bg: '#4F8CFF' }} size="sm" mr={2}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Box
            onClick={isDrawerOpen ? onDrawerClose : onDrawerOpen}
            cursor="pointer"
            aria-label="Open menu"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </Box>
        </Flex>
        {/* Desktop Nav */}
        <Flex alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
          <Stack alignItems = {"center"} direction={'row'} spacing={5}>
            <NavLink
              to="/"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6em', position: 'relative' }}
              className={({ isActive }) => {
                const isDark = colorMode === 'dark';
                return `flex items-center px-3 py-2 rounded-xl font-semibold transition-colors duration-200 text-base nav-hover ` +
                  (isActive
                    ? isDark
                      ? 'bg-[#232f4b] text-[#4F8CFF] shadow-sm'
                      : 'bg-blue-50 text-blue-600 shadow-sm'
                    : isDark
                      ? 'text-gray-300'
                      : 'text-gray-600');
              }}
            >
              <FaHome style={{ fontSize: 20, marginRight: '0.4em' }} /> Home
            </NavLink>
            <NavLink
              to="/notes"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6em', position: 'relative' }}
              className={({ isActive }) => {
                const isDark = colorMode === 'dark';
                return `flex items-center px-3 py-2 rounded-xl font-semibold transition-colors duration-200 text-base nav-hover ` +
                  (isActive
                    ? isDark
                      ? 'bg-[#232f4b] text-[#4F8CFF] shadow-sm'
                      : 'bg-blue-50 text-blue-600 shadow-sm'
                    : isDark
                      ? 'text-gray-300'
                      : 'text-gray-600');
              }}
            >
              <FaRegStickyNote style={{ fontSize: 20, marginRight: '0.4em' }} /> Notes
            </NavLink>
            <Button bg = {"#01d8fb"} onClick={toggleColorMode} _hover={{ bg: '#4F8CFF' }}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
            <Menu>
              <MenuButton
                display={auth?"block":"none"}
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
                className="avatar-hover"
                _focus={{ boxShadow: '0 0 0 2px #4F8CFF' }}
                _hover={{ boxShadow: '0 0 0 4px #4F8CFF', transform: 'scale(1.08)' }}
                transition="all 0.2s"
              >
                <Avatar size={'sm'} src={'https://cdn.vectorstock.com/i/1000v/51/87/student-avatar-user-profile-icon-vector-47025187.jpg'} />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Center><Avatar size={'2xl'} src={'https://cdn.vectorstock.com/i/1000v/51/87/student-avatar-user-profile-icon-vector-47025187.jpg'} /></Center>
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
      {/* Nav item and avatar hover styles */}
      <style>{`
        .nav-hover:hover {
          background: rgba(79, 140, 255, 0.10);
          color: #4F8CFF !important;
          box-shadow: 0 2px 8px rgba(80, 112, 255, 0.10);
          transform: translateY(-2px) scale(1.04);
          transition: all 0.18s cubic-bezier(.08,.52,.52,1);
        }
        .avatar-hover:hover {
          box-shadow: 0 0 0 4px #4F8CFF;
          transform: scale(1.08);
          transition: all 0.18s cubic-bezier(.08,.52,.52,1);
        }
      `}</style>
        </Flex>
      </Flex>
      {/* Mobile Nav Drawer */}
      <Drawer placement="right" onClose={onDrawerClose} isOpen={isDrawerOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent
          bg={colorMode === 'light' ? 'rgba(255,255,255,0.92)' : 'rgba(40,54,85,0.92)'}
          maxW={{ base: '60vw', sm: '400px' }}
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderLeft: colorMode === 'light' ? '2px solid #e0e7ff' : '2px solid rgba(255,255,255,0.18)',
            boxShadow: colorMode === 'light'
              ? '0 4px 24px 0 rgba(31, 38, 135, 0.10)'
              : '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
          }}
        >
          <DrawerCloseButton mt={2} />
          <DrawerHeader fontWeight="bold" fontSize="2xl" letterSpacing="tight">
            Menu
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={8} align="center" mt={8} height="100%" justify="flex-start">
              <NavLink to="/" onClick={onDrawerClose} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8em', width: '100%' }} className={({ isActive }) => { const isDark = colorMode === 'dark'; return `flex items-center px-4 py-3 rounded-xl font-semibold transition-colors duration-200 text-lg w-full ` + (isActive ? isDark ? 'bg-[#232f4b] text-[#4F8CFF] shadow-sm' : 'bg-blue-50 text-blue-600 shadow-sm' : isDark ? 'text-gray-200 hover:bg-[#232f4b] hover:text-[#4F8CFF]' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'); }}><FaHome style={{ fontSize: 22, marginRight: '0.5em' }} /> Home</NavLink>
              <NavLink to="/notes" onClick={onDrawerClose} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8em', width: '100%' }} className={({ isActive }) => { const isDark = colorMode === 'dark'; return `flex items-center px-4 py-3 rounded-xl font-semibold transition-colors duration-200 text-lg w-full ` + (isActive ? isDark ? 'bg-[#232f4b] text-[#4F8CFF] shadow-sm' : 'bg-blue-50 text-blue-600 shadow-sm' : isDark ? 'text-gray-200 hover:bg-[#232f4b] hover:text-[#4F8CFF]' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'); }}><FaRegStickyNote style={{ fontSize: 22, marginRight: '0.5em' }} /> Notes</NavLink>
              {auth && (
                <>
                  <Stack spacing={2} align="center" w="100%" pt={6}>
                    <Avatar size={'lg'} src={'https://cdn.vectorstock.com/i/1000v/51/87/student-avatar-user-profile-icon-vector-47025187.jpg'} />
                    <Box fontWeight="semibold" fontSize="lg" color={colorMode === 'dark' ? 'gray.100' : 'gray.700'}>{user}</Box>
                  </Stack>
                  <Button
                    mt={8}
                    w="80%"
                    colorScheme="red"
                    variant="solid"
                    size="lg"
                    fontWeight="bold"
                    fontSize="lg"
                    borderRadius="lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}