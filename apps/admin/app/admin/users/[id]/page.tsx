'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Use useParams to get route params
import { useGetUsers } from '../../utils/getUsers';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
    Flex,
    VStack,
    useColorMode,
    useColorModeValue,
    Heading,
    Textarea,
    Select,
} from '@chakra-ui/react';

// Define the user details type
interface Address {
    name: string;
    address: string;
    cityAndDistrict: string;
    state: string;
    location: { coordinates: [number, number] };
}

interface UserDetails {
    name: string;
    email: string;
    phoneNumber: string;
    subscriptionType: string;
    role: string;
    dateOfBirth: string;
    gender: string;
    refferalCode: string;
    address: Address[];
    coin: number;
    profilePhotoLink : string;
}

const EditUser = () => {
    const router = useRouter();
    const { id } = useParams(); // Use useParams to access dynamic route params
    const { colorMode, toggleColorMode } = useColorMode();

    // Zustand store to fetch user details
    const { fetchUserById, userDetails, isLoading, error } = useGetUsers();

    const [token, setToken] = useState<string | null>(null);
    const [editedUserDetails, setEditedUserDetails] = useState<UserDetails | null>(null);

    // Fetch token from localStorage on the client side
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    // Fetch user details when the component mounts
    useEffect(() => {
        if (id && token) {
            fetchUserById(id as string, token);
        }
    }, [id, token]);

    // Update userDetails once fetched
    useEffect(() => {
        if (userDetails) {
            setEditedUserDetails(userDetails);
        }
    }, [userDetails]);

    // Handle input changes for editable fields
    // Handle input changes for both Input and Select fields
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (editedUserDetails) {
            setEditedUserDetails((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };


    // Handle address changes
    const handleAddressChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editedUserDetails) {
            const updatedAddress = [...editedUserDetails.address];
            updatedAddress[index] = {
                ...updatedAddress[index],
                [name]: value,
            };
            setEditedUserDetails((prev) => ({
                ...prev,
                address: updatedAddress,
            }));
        }
    };

    const handleCoordinateChange = (index: number, type: 'latitude' | 'longitude', value: string) => {
        if (editedUserDetails) {
            const updatedAddress = [...editedUserDetails.address];
            const coordinateValue = parseFloat(value) || 0;

            // Update the latitude or longitude based on the 'type'
            if (type === 'latitude') {
                updatedAddress[index].location.coordinates[0] = coordinateValue;
            } else {
                updatedAddress[index].location.coordinates[1] = coordinateValue;
            }

            setEditedUserDetails((prev) => ({
                ...prev,
                address: updatedAddress,
            }));
        }
    };

    // Handle update user details
    const handleUpdateUser = () => {
        if (id && token && editedUserDetails) {
            //  updateUser(id as string, editedUserDetails, token); // Assume updateUser is a function in your hook
            router.push('/users');
        }
    };

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text color="red.500">{error}</Text>;

    return (
        <Box
            maxW="600px"
            mx="auto"
            mt={14}
            p={6}
            bg={useColorModeValue('gray.100', 'gray.700')}
            borderRadius="md"
            boxShadow="md"
        >
            <Flex justify="space-between" align="center" mb={6}>
                <Heading>Edit User</Heading>
            </Flex>


            {editedUserDetails && (
                <VStack spacing={4} align="stretch">

                    {/* Profile Photo */}
{editedUserDetails?.profilePhotoLink && (
    <Flex justify="center" align="center" mb={6}>
        <Box boxSize="120px" borderRadius="full" overflow="hidden">
            <img
                src={editedUserDetails.profilePhotoLink}
                alt="Profile Photo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </Box>
    </Flex>
)}
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            name="name"
                            value={editedUserDetails.name || ''}
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            name="email"
                            value={editedUserDetails.email || ''}
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                            name="phoneNumber"
                            value={editedUserDetails.phoneNumber || ''}
                            onChange={handleInputChange}
                        />
                    </FormControl>



                    <FormControl>
                        <FormLabel>Subscription Type</FormLabel>
                        <Select
                            name="subscriptionType"
                            value={editedUserDetails?.subscriptionType || ''}
                            onChange={handleInputChange}
                            placeholder="Select subscription type"
                        >
                            <option value="freemium">Freemium</option>
                            <option value="premium">Premium</option>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Coin</FormLabel>
                        <Input
                            name="coin"
                            value={editedUserDetails.coin}
                            onChange={handleInputChange}
                        />
                    </FormControl>


                    <FormControl>
                        <FormLabel>Date of Birth</FormLabel>
                        <Input
                            type="date"
                            name="dateOfBirth"
                            value={
                                editedUserDetails?.dateOfBirth
                                    ? new Date(editedUserDetails.dateOfBirth).toISOString().split('T')[0]
                                    : ''
                            }
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <Select
                            name="gender"
                            value={editedUserDetails?.gender || ''}
                            onChange={handleInputChange}
                            placeholder="Select gender"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <Select
                            name="gender"
                            value={editedUserDetails?.role || ''}
                            onChange={handleInputChange}
                            placeholder="Select Role"
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Referral Code</FormLabel>
                        <Input
                            name="refferalCode"
                            value={editedUserDetails.refferalCode || ''}
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    {/* Address editing */}
                    <FormControl>
                        <FormLabel>Address</FormLabel>
                        {editedUserDetails.address?.map((addr, index) => (
                            <Box key={index} p={4} bg="gray.200" borderRadius="md" mb={4}>
                                <Text fontWeight="bold" mb={2}>
                                    Address {index + 1}
                                </Text>
                                <Flex direction="column" gap={4}>
                                    <FormControl>
                                        <FormLabel>Address Name</FormLabel>
                                        <Input
                                            name="name"
                                            value={addr.name}
                                            placeholder="Address Name"
                                            onChange={(e) => handleAddressChange(index, e)}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Address</FormLabel>
                                        <Input
                                            name="address"
                                            value={addr.address}
                                            placeholder="Address"
                                            onChange={(e) => handleAddressChange(index, e)}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>City/District</FormLabel>
                                        <Input
                                            name="cityAndDistrict"
                                            value={addr.cityAndDistrict}
                                            placeholder="City/District"
                                            onChange={(e) => handleAddressChange(index, e)}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>State</FormLabel>
                                        <Input
                                            name="state"
                                            value={addr.state}
                                            placeholder="State"
                                            onChange={(e) => handleAddressChange(index, e)}
                                        />
                                    </FormControl>

                                    {/* Latitude and Longitude Fields */}
                                    <Flex gap={4}>
                                        <FormControl>
                                            <FormLabel>Latitude</FormLabel>
                                            <Input
                                                type="number"
                                                value={addr.location.coordinates[0] || ''}
                                                placeholder="Latitude"
                                                onChange={(e) =>
                                                    handleCoordinateChange(index, 'latitude', e.target.value)
                                                }
                                            />
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel>Longitude</FormLabel>
                                            <Input
                                                type="number"
                                                value={addr.location.coordinates[1] || ''}
                                                placeholder="Longitude"
                                                onChange={(e) =>
                                                    handleCoordinateChange(index, 'longitude', e.target.value)
                                                }
                                            />
                                        </FormControl>
                                    </Flex>

                                </Flex>
                            </Box>

                        ))}
                    </FormControl>

                    <Button
                        mt={4}
                        colorScheme="teal"
                        onClick={handleUpdateUser}
                    >
                        Update User
                    </Button>

                    <Button
                        mt={4}
                        colorScheme="gray"
                        onClick={() => router.push('/admin/users')}
                    >
                        Back
                    </Button>
                </VStack>
            )}
        </Box>
    );
};

export default EditUser;
