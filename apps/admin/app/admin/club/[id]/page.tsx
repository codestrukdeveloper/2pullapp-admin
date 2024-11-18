"use client";

import { useEffect, useState } from "react";
import { useClubStore } from "@/app/admin/utils/clubStore";
import { Box, Spinner, Text, Input, Button, Image } from "@chakra-ui/react";

export default function ClubDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { currentClub, isLoading, error, fetchClubDetails } = useClubStore();
  const [clubName, setClubName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && params.id) {
      fetchClubDetails(token, params.id);
    }
  }, [params.id, fetchClubDetails]);

  useEffect(() => {
    if (currentClub) {
      setClubName(currentClub.name); // Set the initial name from currentClub
    }
  }, [currentClub]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClubName(e.target.value); // Update the club name state
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to handle the submission of the updated club name
    // For example, you might call an update function here
    console.log("Updated Club Name:", clubName);
  };

  if (isLoading)
    return (
      <Box textAlign="center" mt="20px">
        <Spinner size="lg" />
        <Text>Loading...</Text>
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" mt="20px" color="red.500">
        <Text>{error}</Text>
      </Box>
    );

  if (!currentClub)
    return (
      <Box textAlign="center" mt="20px">
        <Text>No club found</Text>
      </Box>
    );

  return (
    <Box p={6}>
      <form onSubmit={handleSubmit}>
        <Text fontSize="2xl" fontWeight="bold">
          Edit Club
        </Text>
        <Text fontSize="lg" mt={2}>
          Name:
        </Text>
        <Input
          value={clubName}
          onChange={handleNameChange}
          placeholder="Enter club name"
        />
        <Text fontSize="lg" mt={4}>
          Description:
        </Text>
        <Input value={currentClub.description} isDisabled readOnly />
        <Text fontSize="lg" mt={4}>
          Categories:
        </Text>
        <Input value={currentClub.categories.join(", ")} isDisabled readOnly />
        <Text fontSize="lg" mt={4}>
          Rating:
        </Text>
        <Input value={currentClub.rating} isDisabled readOnly />
        {currentClub.thumbnail && (
          <Image
            src={currentClub.thumbnail}
            alt={currentClub.name}
            boxSize="200px"
            objectFit="cover"
            mt={4}
          />
        )}
        <Button colorScheme="blue" mt={4} type="submit">
          Save Changes
        </Button>
      </form>
    </Box>
  );
}
