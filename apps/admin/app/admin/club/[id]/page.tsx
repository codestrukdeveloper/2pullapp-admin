"use client";

import { useEffect, useState } from "react";
import { useClubStore } from "@/app/admin/utils/clubStore";
import {
  Box,
  Spinner,
  Text,
  Input,
  Button,
  Grid,
  GridItem,
  VStack,
} from "@chakra-ui/react";

import { useColorModeValue } from "@chakra-ui/react";

export default function ClubDetailsPage({
  params,
}: {
  params: { id: string };
  }) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );


  
  const { currentClub, isLoading, error, fetchClubDetails, updateClub } =
    useClubStore();
  const [clubName, setClubName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && params.id) {
      fetchClubDetails(token, params.id);
    }
  }, [params.id, fetchClubDetails]);

  useEffect(() => {
    if (currentClub) {
      setClubName(currentClub.name);
    }
  }, [currentClub]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClubName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token && currentClub) {
      try {
        await updateClub(token, currentClub._id, { name: clubName });
      } catch (error) {
        console.error("Failed to update club name", error);
      }
    }
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
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Edit Club Details
            </Text>
          </GridItem>

          <GridItem>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontSize="lg" mb={2} color={textColorPrimary}>
                  Name:
                </Text>
                <Input
                  color={textColorPrimary}
                  value={clubName}
                  onChange={handleNameChange}
                  placeholder="Enter club name"
                />
              </Box>

              <Box>
                <Text fontSize="lg" mb={2}>
                  Phone Number:
                </Text>
                <Input
                  color={textColorPrimary}
                  value={currentClub.phoneNumber}
                  isDisabled
                  readOnly
                />
              </Box>

              <Box>
                <Text fontSize="lg" mb={2}>
                  Rating:
                </Text>
                <Input
                  color={textColorPrimary}
                  value={currentClub.rating}
                  isDisabled
                  readOnly
                />
              </Box>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontSize="lg" mb={2}>
                  Cuisines:
                </Text>
                <Input
                  color={textColorPrimary}
                  value={currentClub.cuisines.join(", ")}
                  isDisabled
                  readOnly
                />
              </Box>

              <Box>
                <Text fontSize="lg" mb={2}>
                  Dietary Options:
                </Text>
                <Input
                  color={textColorPrimary}
                  value={currentClub.dietaryOptions.join(", ")}
                  isDisabled
                  readOnly
                />
              </Box>

              <Box>
                <Text fontSize="lg" mb={2}>
                  Capacity:
                </Text>
                <Input
                  value={currentClub.capacity}
                  color={textColorPrimary}
                  isDisabled
                  readOnly
                />
              </Box>
            </VStack>
          </GridItem>
          

          <GridItem colSpan={{ base: 1, md: 2 }} width={"xs"}>
            <Button colorScheme="blue" type="submit" width="full" mt={4}>
              Save Changes
            </Button>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
}
