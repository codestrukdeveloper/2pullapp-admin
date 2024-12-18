'use client';
import React, { useEffect, useState } from 'react';
import { useGetUsers } from '../utils/getUsers';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Input,
  Flex,
  Spinner,
  Box,
  IconButton,
  useColorMode,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ViewIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';



interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  subscriptionType: string | string[];
}


const UserList = () => {
  const { users, isLoading, fetchAllUsers, error } = useGetUsers();
  const [searchQuery, setSearchQuery] = useState('');
  // const [filteredUsers, setFilteredUsers] = useState([]);
const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const [token, setToken] = useState<string | null>(null);

  // Fetch token from localStorage on the client side
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  // Color mode hooks
  const { colorMode, toggleColorMode } = useColorMode();
  const tableBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');

  // Fetch users once the token is available
  useEffect(() => {
    if (token) {
      fetchAllUsers(token);
    }
  }, [token, fetchAllUsers]);

  // Update filteredUsers when users data is fetched
  useEffect(() => {
    if (users) {
      setFilteredUsers(users);
    }
  }, [users]);

  // Filter users based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = users.filter(
        (user: { name: string; email: string; phoneNumber: string; subscriptionType:string | string[]; }) =>
          user.name.toLowerCase().includes(lowerCaseQuery) ||
          user.email.toLowerCase().includes(lowerCaseQuery) ||
          user.phoneNumber.includes(lowerCaseQuery) ||
        user.subscriptionType.includes(lowerCaseQuery)
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const handleDelete = (userId: string) => {
    console.log('Delete user:', userId);
  };

  const handleEdit = (userId: string) => {
    console.log('Edit user:', userId);
  };

  const handleView = (userId: string) => {
    console.log('View user:', userId);
  };

  return (
    <Box p={6}>
      {/* Color mode toggle */}
      <Flex justify="flex-end" mb={4}>
        <Button onClick={toggleColorMode} variant="ghost">
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>

      <Flex justify="space-between" mb={4}>
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          maxWidth="300px"
          color={textColor}
        />
      </Flex>

      {isLoading ? (
        <Flex justify="center" align="center" height="200px">
          <Spinner size="lg" />
        </Flex>
      ) : error ? (
        <Box color="red.500" textAlign="center">
          {error}
        </Box>
      ) : (
        <TableContainer>
          <Table variant="striped" bg={tableBg} colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone Number</Th>
                <Th>Subscriptions Type</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers.map((user: User) => (
                  <Tr key={user.id}>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.phoneNumber}</Td>
                    <Td>{user.subscriptionType}</Td>
                    <Td>
                      <Flex gap={2}>
                        <IconButton
                          key={`view-${user.id}`}
                          aria-label="View"
                          icon={<ViewIcon />}
                          onClick={() => handleView(user.id)}
                        />
                        <IconButton
                          key={`edit-${user.id}`}
                          aria-label="Edit"
                          icon={<EditIcon />}
                          onClick={() => handleEdit(user.id)}
                        />
                        <IconButton
                          key={`delete-${user.id}`}
                          aria-label="Delete"
                          icon={<DeleteIcon />}
                          onClick={() => handleDelete(user.id)}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={5} textAlign="center">
                    No users found
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default UserList;
