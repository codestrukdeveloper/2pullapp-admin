import React, { useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { Box, Button, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import Card from "components/card/Card";
import { useGetClubs } from "@/app/admin/utils/getClubs";
import Club from "@/views/admin/profile/components/Club";

export default function Clubs() {
  const { clubs, totalPages, currentPage, isLoading, error, fetchClubs } =
    useGetClubs();

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

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

  const getImageSource = (club: any) => {
    
    return (
      club.thumbnail || 
      (club.images?.length > 0 ? club.images[0] : "/default-club.png") 

    );
    
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
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        All Clubs
      </Text>
      <Text color={textColorSecondary} fontSize="md" mb="40px">
        Here you can find more details about your clubs. Keep your users engaged
        by providing meaningful information.
      </Text>

      {/* Loading State */}
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

      {!isLoading && !error && clubs.length > 0 && (
        <Box>
          {clubs.map((club) => (
            <Club 
              key={club._id}
              boxShadow={cardShadow}
              image={club.thumbnail || "/default-club.png"}
              title={club.name}
              subtitle={club.categories.join(", ") || "No categories available"}
              rating={club.rating || "N/A"}
              ranking={""}
              link={"/editclub"}              
            />
          ))}
        </Box>
      )}

      {/* Pagination Section */}
      {!isLoading && clubs.length > 0 && (
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
