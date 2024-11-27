import React, { useState, useEffect } from "react";
import {
  useColorModeValue,
  Box,
  Button,
  HStack,
  Spinner,
  Text,
  VStack,
  Input,
  Flex,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { useGetClubs } from "@/app/admin/utils/getClubs";
import Club from "@/views/admin/profile/components/Club";

export default function Clubs() {
  const { clubs, totalPages, currentPage, isLoading, error, fetchClubs } =
    useGetClubs();

  // State for filtering
  const [filteredClubs, setFilteredClubs] = useState(clubs);
  const [searchTerm, setSearchTerm] = useState("");

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  // Effect to update filtered clubs when clubs or search term changes
  useEffect(() => {
    const filtered = clubs.filter((club) =>
      club.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClubs(filtered);
  }, [clubs, searchTerm]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchClubs(token, currentPage).catch((err) =>
        console.error("Fetch failed:", err)
      );
    } else {
      console.error("No token found.");
    }
  }, [fetchClubs, currentPage]);

  const handlePageChange = (newPage: number) => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchClubs(token, newPage);
    }
  };

  const renderPageNumbers = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return pages.map((page) => (
      <Button
        key={page}
        onClick={() => handlePageChange(page)}
        variant={page === currentPage ? "solid" : "outline"}
        colorScheme="blue"
        size="sm"
      >
        {page}
      </Button>
    ));
  };

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Box
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Flex mb={4} justifyContent="space-between">
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize="2xl"
            mt="10px"
            mb="4px"
          >
            All Clubs
          </Text>
          <Input
            placeholder="Search clubs by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            maxWidth="400px"
            variant="filled"
            color={textColorPrimary}
          />
        </Flex>
      </Box>
      <Text color={textColorSecondary} fontSize="md" mb="40px">
        Here you can find more details about your clubs. Keep your users engaged
        by providing meaningful information.
      </Text>

      {/* Search/Filter Input */}

      {/* in case  Loading */}
      {isLoading && (
        <Box textAlign="center" mt="20px">
          <Spinner size="lg" />
          <Text>Loading clubs...</Text>
        </Box>
      )}

      {error && (
        <Box textAlign="center" mt="20px" color="red.500">
          <Text>{error}</Text>
        </Box>
      )}

      {!isLoading && !error && filteredClubs.length > 0 && (
        <Box>
          {filteredClubs.map((club) => (
            <Club
              key={club._id}
              boxShadow={cardShadow}
              image={club.thumbnail}
              title={club.name}
              subtitle={club.categories.join(", ") || "No categories available"}
              rating={club.rating || "N/A"}
              ranking={club.rating}
              link={`/admin/club/${club._id}`}
            />
          ))}
        </Box>
      )}

      {/* if result not found  */}

      {!isLoading && filteredClubs.length === 0 && (
        <Box textAlign="center" mt="20px" color={textColorSecondary}>
          <Text>No clubs found matching your search.</Text>
        </Box>
      )}

      {/* pagination stared  */}
      {!isLoading && filteredClubs.length > 0 && (
        <VStack spacing={4} mt="20px">
          <HStack spacing={2} justify="center">
            {renderPageNumbers()}
          </HStack>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
        </VStack>
      )}
    </Card>
  );
}
