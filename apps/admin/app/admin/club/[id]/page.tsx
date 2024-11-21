"use client";

import { useEffect } from "react";
import { useClubStore } from "@/app/admin/utils/clubStore";
import {
  Box,
  Spinner,
  Text,
  Grid,
  GridItem,
  VStack,
  Heading,
  Flex,

} from "@chakra-ui/react";

import { useColorModeValue } from "@chakra-ui/react";

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | string[] | number | undefined;
}) => (
  <Flex justifyContent="space-between" alignItems="center" width="full">
    <Text fontWeight="medium" color="gray.600" flex="1">
      {label}:
    </Text>
    <Text flex="1" textAlign="right">
      {/* Convert array to string, handle undefined */}
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
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");


  const { currentClub, isLoading, error, fetchClubDetails } = useClubStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && params.id) {
      fetchClubDetails(token, params.id);
    }
  }, [params.id, fetchClubDetails]);

  if (isLoading)
    return (
      <Box textAlign="center" mt="20px" w={"100%"}>
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
    <Box p={6} mt={10}>
      <Heading color={textColorPrimary} mb={6} textAlign="left">
        Club Details
      </Heading>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
        color={textColorSecondary}
      >
        <GridItem>
          <Box
            bg={bg}
            p={4}
            borderRadius="md"
            mb={4}
            color={textColorSecondary}
            height={"100%"}
          >
            <Heading size="md" mb={4}>
              Basic Information
            </Heading>
            <VStack align="stretch" spacing={2}>
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
        </GridItem>

        <GridItem>
          <Box
            p={4}
            borderRadius="md"
            mb={4}
            color={textColorSecondary}
            bg={bg}
            height={"100%"}
          >
            <Heading size="md" mb={4}>
              Additional Details
            </Heading>
            <VStack align="stretch" spacing={2}>
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
        </GridItem>

        {/* Club Seats */}
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Box
            
            p={4}
            borderRadius="md"
            color={textColorSecondary}
            bg={bg}
          >
            <Heading size="md" mb={4}>
              Club Seats
            </Heading>
            {currentClub.clubSeat.map((seat, index) => (
              <Box key={index} mb={4}>
                <Heading size="sm" mb={2}>
                  {seat.name}
                </Heading>
                <VStack align="stretch" spacing={2}>
                  {seat.openDays.map((day, dayIndex) => (
                    <DetailRow
                      key={dayIndex}
                      label={day.day}
                      value={`${new Date(day.slot.opensAt).toLocaleTimeString()} - ${new Date(day.slot.closeAt).toLocaleTimeString()}`}
                    />
                  ))}
                </VStack>
              </Box>
            ))}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
