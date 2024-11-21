"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import useClubStore from "@/app/admin/utils/addClub";

const AddClub = () => {
  const [clubData, setClubData] = useState({
    name: "",
    description: "",
    category: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    capacity: 0,
  });
  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();
  const { createClub, loading } = useClubStore();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setClubData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(clubData).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    if (image) {
      formData.append("image", image);
    }

    try {
      await createClub(formData);
      router.push("/api/v1/admin/user/create/");
    } catch (error) {
      console.error("Error creating club:", error);
    }
  };

  return (
    <Box mt={16} p={16}>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Grid templateColumns="repeat(2, 1fr)" gap={4} width="full">
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Club Name</FormLabel>
              <Input
                name="name"
                value={clubData.name}
                onChange={handleInputChange}
                placeholder="Enter club name"
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={clubData.email}
                onChange={handleInputChange}
                placeholder="Enter club email"
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phoneNumber"
                value={clubData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                name="dateOfBirth"
                type="date"
                value={clubData.dateOfBirth}
                onChange={handleInputChange}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Select
                name="gender"
                value={clubData.gender}
                onChange={handleInputChange}
                placeholder="Select gender"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={clubData.category}
                onChange={handleInputChange}
                placeholder="Select category"
              >
                <option value="sports">Sports</option>
                <option value="music">Music</option>
                <option value="art">Art</option>
              </Select>
            </FormControl>
          </GridItem>
        </Grid>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={clubData.description}
            // onChange={handleInputChange}
            placeholder="Enter club description"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Club Image</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" isLoading={loading} width="sm">
          Create Club
        </Button>
      </VStack>
    </Box>
  );
};

export default AddClub;
