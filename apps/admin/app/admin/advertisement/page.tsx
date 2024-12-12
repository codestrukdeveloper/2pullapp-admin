"use client";
import React from "react";
import { Grid, GridItem, Box, Text } from "@chakra-ui/react";

const advertisement: React.FC = () => {
  // Dummy advertisements for now
  const dummyAdvertisements = [
    { clubId: "101", name: "Club 101", rank: 1 },
    { clubId: "102", name: "Club 102", rank: 2 },
    { clubId: "103", name: "Club 103", rank: 3 },
  ];

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        Advertisements
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {dummyAdvertisements.map((ad) => (
          <GridItem
            key={ad.rank}
            bg="blue.400"
            color="white"
            p={4}
            borderRadius="md"
          >
            <Text fontSize="lg" fontWeight="bold">
              {ad.name}
            </Text>
            <Text>Club ID: {ad.clubId}</Text>
            <Text>Rank: {ad.rank}</Text>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default advertisement;
