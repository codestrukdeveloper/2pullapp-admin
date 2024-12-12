"use client";

import { useEffect } from "react";
import { useClubStore } from "@/app/admin/utils/clubStore";
import {
  Box,
  Spinner,
  Text,
  VStack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
} from "@chakra-ui/react";

interface Props {
  params: {
    id: string;
  };
}

export default function ClubDetailsPage({ params }: Props) {
  const { currentClub, isLoading, error, fetchClubDetails } = useClubStore();

  // Background and color theming
  const bgColor = useColorModeValue("white", "gray.800");
  const tableHeaderBg = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && params.id) {
      fetchClubDetails(token, params.id);
    }
  }, [params.id, fetchClubDetails]);

  // Loading and error states
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!currentClub) return <NoClubFound />;

  return (
    <Box maxW="container.xl" mx="auto" mt={10} p={6}>
      <Heading mb={6} textAlign="center">
        Club Details
      </Heading>

      <TableContainer bg={bgColor} borderRadius="lg" boxShadow="md" mb={6}>
        <Table variant="striped" colorScheme="gray">
          <Thead bg={tableHeaderBg}>
            <Tr>
              <Th>Category</Th>
              <Th>Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td fontWeight="bold">Name</Td>
              <Td>{currentClub.name}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Phone Number</Td>
              <Td>{currentClub.phoneNumber}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Rating</Td>
              <Td>{currentClub.rating}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Cuisines</Td>
              <Td>{currentClub.cuisines?.join(", ")}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Dietary Options</Td>
              <Td>{currentClub.dietaryOptions?.join(", ")}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Venue Type</Td>
              <Td>{currentClub.venueType}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Capacity</Td>
              <Td>{currentClub.capacity}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Estimated Cost Per Head</Td>
              <Td>{currentClub.estimatedCostPerHead} AED</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      {/* Club Seats Section */}
      <Heading size="md" mb={4}>
        Club Seats
      </Heading>
      {currentClub.clubSeat.map((seat, index) => (
        <TableContainer
          key={index}
          bg={bgColor}
          borderRadius="lg"
          boxShadow="md"
          mb={4}
        >
          <Table variant="simple">
            <Thead bg={tableHeaderBg}>
              <Tr>
                <Th colSpan={2}>{seat.name}</Th>
              </Tr>
              <Tr>
                <Th>Day</Th>
                <Th>Operating Hours</Th>
              </Tr>
            </Thead>
            <Tbody>
              {seat.openDays.map((day, dayIndex) => (
                <Tr key={dayIndex}>
                  <Td>{day.day}</Td>
                  <Td>
                    {new Date(day.slot.opensAt).toLocaleTimeString()} -
                    {new Date(day.slot.closeAt).toLocaleTimeString()}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ))}
    </Box>
  );
}

// Helper Components
const LoadingSpinner = () => (
  <Box textAlign="center" mt="20px" w="100%">
    <Spinner size="xl" />
    <Text>Loading club details...</Text>
  </Box>
);

const ErrorMessage = ({ error }: { error: string }) => (
  <Box textAlign="center" mt="20px" color="red.500">
    <Text>{error}</Text>
  </Box>
);

const NoClubFound = () => (
  <Box textAlign="center" mt="20px">
    <Text>No club found</Text>
  </Box>
);
