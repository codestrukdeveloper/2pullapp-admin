"use client";

import { useEffect } from "react";
import { useClubStore } from "@/app/admin/utils/clubStore";
import {
  Box,
  Spinner,
  Text,
  VStack,
  Heading,
  Flex,
  Divider,
  Grid,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | string[] | number | undefined;
}) => (
  <Flex justifyContent="space-between" alignItems="center" width="100%">
    <Text fontWeight="medium" color="gray.600" flex="1">
      {label}:
    </Text>
    <Text flex="1" textAlign="right">
      {Array.isArray(value)
        ? value.join(", ")
        : value !== undefined
          ? String(value)
          : "N/A"}
    </Text>
  </Flex>
);

export default function ClubDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const textColorPrimary = useColorModeValue("gray.900", "white");
  const bg = useColorModeValue("white", "gray.800");

  const { currentClub, isLoading, error, fetchClubDetails } = useClubStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && params.id) {
      fetchClubDetails(token, params.id);
    }
  }, [params.id, fetchClubDetails]);

  if (isLoading)
    return (
      <Box textAlign="center" mt="20px" w="100%">
        <Spinner size="xl" />
        <Text>Loading club details...</Text>
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
    <Box
      maxW="800px"
      mx="auto"
      mt="10"
      bg={bg}
      p={8}
      borderRadius="md"
      boxShadow="sm"
    >
      <Heading color={textColorPrimary} mb={6}>
        Club Details
      </Heading>

      <Box mb={8}>
        <Heading size="md" mb={4}>
          Basic Information
        </Heading>
        <VStack align="stretch" spacing={4}>
          <DetailRow label="Name" value={currentClub.name} />
          <DetailRow label="Phone Number" value={currentClub.phoneNumber} />
          <DetailRow label="Rating" value={currentClub.rating} />
          <DetailRow label="Cuisines" value={currentClub.cuisines} />
          <DetailRow
            label="Dietary Options"
            value={currentClub.dietaryOptions}
          />
        </VStack>
      </Box>

      <Divider my={6} size={"md"} />

      <Box mb={8}>
        <Heading size="md" mb={4}>
          Additional Details
        </Heading>
        <VStack align="stretch" spacing={4}>
          <DetailRow label="Categories" value={currentClub.categories} />
          <DetailRow label="Dress Type" value={currentClub.dressType} />
          <DetailRow label="Venue Type" value={currentClub.venueType} />
          <DetailRow label="Capacity" value={currentClub.capacity} />
          <DetailRow
            label="Estimated Cost Per Head"
            value={`${currentClub.estimatedCostPerHead} AED`}
          />
        </VStack>
      </Box>

      <Divider my={6} />

      <Box>
        <Heading size="md" mb={4}>
          Club Seats
        </Heading>
        {currentClub.clubSeat.map((seat, index) => (
          <Box key={index} mb={6}>
            <Heading size="sm" mb={2}>
              {seat.name}
            </Heading>
            <Grid gap={4}>
              {seat.openDays.map((day, dayIndex) => (
                <DetailRow
                  key={dayIndex}
                  label={day.day}
                  value={`${new Date(
                    day.slot.opensAt
                  ).toLocaleTimeString()} - ${new Date(
                    day.slot.closeAt
                  ).toLocaleTimeString()}`}
                />
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
