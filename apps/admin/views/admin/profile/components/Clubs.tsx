import { useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import Club from "@/views/admin/profile/components/Club";
import { Box, Button, HStack, VStack, Text, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetClubs } from "@/app/admin/utils/getClubs"; // Make sure the path is correct

export default function Clubs(props: { [x: string]: any }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { clubs, error: fetchError, isLoading: loading } = useGetClubs();

  const postsPerPage: number = 10;

  // Calculate total pages
  const totalPages = Math.ceil(clubs.length / postsPerPage);

  // Get current posts for the page
  const currentPosts = clubs.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const { ...rest } = props;

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  useEffect(() => {
    setIsLoading(loading);
    if (fetchError) {
      setError(fetchError);
    } else if (clubs) {
      setError(null);
    }
  }, [loading, fetchError, clubs]);

  const handleNext = (): void =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = (): void =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handlePageClick = (page: number): void => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    return pageNumbers.map((page) => (
      <Button
        key={page}
        onClick={() => handlePageClick(page)}
        variant={page === currentPage ? "solid" : "outline"}
        colorScheme="blue"
        size="sm"
      >
        {page}
      </Button>
    ));
  };

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        All Clubs
      </Text>
      <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
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

      {/* Error State */}
      {error && (
        <Box textAlign="center" mt="20px" color="red.500">
          <Text>{error}</Text>
        </Box>
      )}

      {/* Clubs Display */}
      {!isLoading && !error && clubs.length > 0 && (
        <Box>
          {currentPosts.map((club) => (
            <Club
              key={club.id}
              boxShadow={cardShadow}
              image={club.image || "/default-club.png"} // Provide a default image if none exists
              ranking={club.ranking || "N/A"}
              link={club.link || "#"}
              title={club.name}
              subtitle={club.description || "No description available"}
            />
          ))}
        </Box>
      )}

      {/* Pagination Section */}
      {!isLoading && clubs.length > 0 && (
        <VStack spacing={4} mt="20px">
          <HStack spacing={2} justify="center">
            <Button onClick={handlePrev} isDisabled={currentPage === 1}>
              Previous
            </Button>
            {renderPageNumbers()}
            <Button
              onClick={handleNext}
              isDisabled={currentPage === totalPages}
            >
              Next
            </Button>
          </HStack>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
        </VStack>
      )}
    </Card>
  );
}
