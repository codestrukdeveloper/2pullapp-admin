"use client";

import { useEffect } from "react";
import { useClubStore } from "@/app/admin/utils/clubStore";
import {
  Box,
  Spinner,
  Text,
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

interface ClubDetailsPageProps {
  params: { id: string }; // Ensure alignment with Next.js PageProps
}

export default function ClubDetailsPage({ params }: ClubDetailsPageProps) {
  const { currentClub, isLoading, error, fetchClubDetails } = useClubStore();

  const bgColor = useColorModeValue("white", "gray.800");
  const tableHeaderBg = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && params.id) {
      fetchClubDetails(token, params.id);
    }
  }, [params.id, fetchClubDetails]);

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
            {/* Additional rows */}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Additional sections */}
    </Box>
  );
}

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
