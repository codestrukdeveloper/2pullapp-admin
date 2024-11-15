'use client';
import React, { useEffect, useState } from 'react';
import { useGetUSers } from '../utils/getUsers';
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

const UserList = () => {
  const { users, isLoading, fetchAllUsers, error } = useGetUSers();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const token = localStorage.getItem('token');

  // Color mode hooks
  const { colorMode, toggleColorMode } = useColorMode();
  const tableBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');

  // Fetch users on component mount
  useEffect(() => {
    if (token) {
      fetchAllUsers(token);
    }
  }, [token, fetchAllUsers]);

  // Update filteredUsers when users data is fetched
  useEffect(() => {
    if (users) {
      setFilteredUsers(users);
      
      console.log(filteredUsers.length);
    }
  }, [users]);

  // Filter users based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerCaseQuery) ||
          user.email.toLowerCase().includes(lowerCaseQuery) ||
          user.phoneNumber.includes(lowerCaseQuery)
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
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
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
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <Tr key={user._id}>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.phoneNumber}</Td>
                    <Td>
                      <Flex gap={2}>
                        <IconButton
                          aria-label="View"
                          icon={<ViewIcon />}
                          onClick={() => handleView(user._id)}
                          colorScheme="blue"
                        />
                        <IconButton
                          aria-label="Edit"
                          icon={<EditIcon />}
                          onClick={() => handleEdit(user._id)}
                          colorScheme="yellow"
                        />
                        <IconButton
                          aria-label="Delete"
                          icon={<DeleteIcon />}
                          onClick={() => handleDelete(user._id)}
                          colorScheme="red"
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={4} textAlign="center">
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
