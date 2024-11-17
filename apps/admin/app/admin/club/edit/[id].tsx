import React, { useState, useEffect } from "react";
import {
  useColorModeValue,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  HStack,
  Textarea,
  Spinner,
  Image,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useGetClubs } from "@/app/admin/utils/getClubs"; // assuming your custom hook

export default function ClubEdit({ clubId }: { clubId: string }) {
  const { clubs, isLoading, error, fetchClubs } = useGetClubs();
  const [clubData, setClubData] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  // Fetch the club details on mount
  useEffect(() => {
    const foundClub = clubs.find((club) => club._id === clubId);
    if (foundClub) {
      setClubData(foundClub);
    }
  }, [clubs, clubId]);

  const handleSubmit = async () => {
    if (!clubData) return;

    setIsSaving(true);
    // Call API to update the club information
    try {
      // Add your API call here to update the club details
      // e.g., await updateClub(clubData);
      toast({
        title: "Club Updated",
        description: "The club's details have been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating the club.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Box textAlign="center" mt="20px">
        <Spinner size="lg" />
        <Text>Loading club details...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt="20px" color="red.500">
        <Text>{error}</Text>
      </Box>
    );
  }

  if (!clubData) {
    return (
      <Box textAlign="center" mt="20px">
        <Text>No club data found</Text>
      </Box>
    );
  }

  return (
    <Box boxShadow={cardShadow} p={6} borderRadius="lg">
      <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mb={4}>
        Edit Club - {clubData.name}
      </Text>
      <VStack spacing={6} align="stretch">
        {/* Club Thumbnail */}
        <FormControl>
          <FormLabel>Club Thumbnail</FormLabel>
          <Input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setClubData((prevData: any) => ({
                  ...prevData,
                  thumbnail: URL.createObjectURL(file),
                }));
              }
            }}
          />
          {clubData.thumbnail && (
            <Image
              src={clubData.thumbnail}
              alt="Club Thumbnail"
              boxSize="150px"
              objectFit="cover"
              mt={2}
            />
          )}
        </FormControl>

        {/* Club Name */}
        <FormControl>
          <FormLabel>Club Name</FormLabel>
          <Input
            value={clubData.name}
            onChange={(e) => setClubData({ ...clubData, name: e.target.value })}
          />
        </FormControl>

        {/* Phone Number */}
        <FormControl>
          <FormLabel>Phone Number</FormLabel>
          <Input
            value={clubData.phoneNumber}
            onChange={(e) =>
              setClubData({ ...clubData, phoneNumber: e.target.value })
            }
          />
        </FormControl>

        {/* Categories */}
        <FormControl>
          <FormLabel>Categories</FormLabel>
          <Select
            value={clubData.categories.join(", ")}
            onChange={(e) =>
              setClubData({
                ...clubData,
                categories: e.target.value
                  .split(", ")
                  .map((category: string) => category.trim()),
              })
            }
            multiple
          >
            <option value="Night Club">Night Club</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Bar">Bar</option>
            {/* Add more options as needed */}
          </Select>
        </FormControl>

        {/* Rating */}
        <FormControl>
          <FormLabel>Rating</FormLabel>
          <Input
            type="number"
            value={clubData.rating}
            onChange={(e) =>
              setClubData({ ...clubData, rating: e.target.value })
            }
          />
        </FormControl>

        {/* Dietary Options */}
        <FormControl>
          <FormLabel>Dietary Options</FormLabel>
          <Select
            value={clubData.dietaryOptions.join(", ")}
            onChange={(e) =>
              setClubData({
                ...clubData,
                dietaryOptions: e.target.value
                  .split(", ")
                  .map((option: string) => option.trim()),
              })
            }
            multiple
          >
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Gluten-Free">Gluten-Free</option>
            {/* Add more options if needed */}
          </Select>
        </FormControl>

        {/* Dress Type */}
        <FormControl>
          <FormLabel>Dress Type</FormLabel>
          <Select
            value={clubData.dressType.join(", ")}
            onChange={(e) =>
              setClubData({
                ...clubData,
                dressType: e.target.value
                  .split(", ")
                  .map((type: string) => type.trim()),
              })
            }
            multiple
          >
            <option value="Smart Casual">Smart Casual</option>
            <option value="Formal">Formal</option>
            {/* Add more options */}
          </Select>
        </FormControl>

        {/* Capacity */}
        <FormControl>
          <FormLabel>Capacity</FormLabel>
          <Input
            type="number"
            value={clubData.capacity}
            onChange={(e) =>
              setClubData({ ...clubData, capacity: e.target.value })
            }
          />
        </FormControl>

        {/* Estimated Cost Per Head */}
        <FormControl>
          <FormLabel>Estimated Cost Per Head</FormLabel>
          <Input
            type="number"
            value={clubData.estimatedCostPerHead}
            onChange={(e) =>
              setClubData({ ...clubData, estimatedCostPerHead: e.target.value })
            }
          />
        </FormControl>

        {/* Opening Hours */}
        <FormControl>
          <FormLabel>Opening Hours</FormLabel>
          <Textarea
            value={JSON.stringify(clubData.clubSeat, null, 2)}
            onChange={(e) =>
              setClubData({
                ...clubData,
                clubSeat: JSON.parse(e.target.value),
              })
            }
            placeholder="Enter opening hours in JSON format"
          />
        </FormControl>

        <HStack spacing={4} justify="space-between">
          <Button variant="outline" onClick={() => setClubData(clubData)}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            isLoading={isSaving}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
