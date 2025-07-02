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
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, SearchIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../../redux/users/user_types';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function Navbar({ onSearch }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const {auth, user} = useSelector((state)=>state.userReducer)
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

  return (
    <>
      <Box
        zIndex={"9999"}
        top={0}
        position={"fixed"}
        w={"100%"}
        boxShadow={"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"}
        bg={
          colorMode === 'light'
            ? 'linear-gradient(90deg, #a770ef 0%, #f6d365 100%)'
            : 'linear-gradient(90deg, #232733 0%, #4F8CFF 100%)'
        }
        px={4}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box fontWeight={"bold"} cursor="pointer" onClick={()=>{
            nav("/")
          }}>React Notes App</Box>
          <Flex alignItems={'center'}>
            <Stack alignItems = {"center"} direction={'row'} spacing={7}>
              {auth && (
                <InputGroup maxW="250px">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.400" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Search notes..."
                    bg={colorMode === 'light' ? 'white' : '#232733'}
                    borderRadius="full"
                    value={search}
                    onChange={e => {
                      setSearch(e.target.value);
                      if (onSearch) onSearch(e.target.value);
                    }}
                  />
                </InputGroup>
              )}
              <Button bg = {"#01d8fb"} onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton display={auth?"block":"none"}
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{user}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}