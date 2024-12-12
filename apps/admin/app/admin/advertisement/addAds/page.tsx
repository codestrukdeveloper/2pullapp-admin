// "use client";
// import React, { useState } from "react";
// import {
//   Box,
//   VStack,
//   Select,
//   Input,
//   Button,
//   Text,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Flex,
// } from "@chakra-ui/react";

// // Dummy clubs data for now
// const dummyClubs = [
//   { id: "101", name: "Sports Club" },
//   { id: "102", name: "Music Club" },
//   { id: "103", name: "Art Club" },
//   { id: "104", name: "Tech Club" },
// ];

// const AddAdvertisement: React.FC = () => {
//   const [advertisements, setAdvertisements] = useState<
//     { index: number; clubName: string; rank: number }[]
//   >([]);
//   const [selectedClubId, setSelectedClubId] = useState("");
//   const [rank, setRank] = useState<number | "">("");
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filter clubs based on search query
//   const filteredClubs = dummyClubs.filter(
//     (club) =>
//       club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       club.id.includes(searchQuery)
//   );

//   const handleAddAdvertisement = () => {
//     if (!selectedClubId || rank === "" || rank <= 0) {
//       alert("Please select a valid club and rank!");
//       return;
//     }

//     const selectedClub = dummyClubs.find((club) => club.id === selectedClubId);
//     if (!selectedClub) {
//       alert("Invalid club selected!");
//       return;
//     }

//     // Check if rank is already taken
//     if (advertisements.some((ad) => ad.rank === rank)) {
//       alert("This rank is already assigned. Please choose another rank.");
//       return;
//     }

//     // Add advertisement
//     setAdvertisements((prev) => [
//       ...prev,
//       {
//         index: prev.length + 1,
//         clubName: selectedClub.name,
//         rank: Number(rank),
//       },
//     ]);

//     // Reset inputs
//     setSelectedClubId("");
//     setRank("");
//   };

//   return (
//     <Box p={4}>
//       <VStack spacing={6} align="stretch">
//         <Box>
//           <Text fontSize="xl" mb={4}>
//             Add Advertisement
//           </Text>
//           <Flex mt={16} gap={2} flexDirection={"column"}>
//             <Box>
//               <Select
//                 placeholder="Select Club"
//                 value={selectedClubId}
//                 onChange={(e) => setSelectedClubId(e.target.value)}
//               >
//                 {filteredClubs.map((club) => (
//                   <option key={club.id} value={club.id}>
//                     {club.name} (ID: {club.id})
//                   </option>
//                 ))}
//               </Select>
//               <Input
//                 mt={4}
//                 type="number"
//                 placeholder="Enter Rank"
//                 value={rank}
//                 onChange={(e) => setRank(Number(e.target.value))}
//               />
//             </Box>
//           </Flex>
//           <Box>
//             <Text fontSize="lg" mb={2}>
//               Search for Clubs (by ID or Name)
//             </Text>
//             <Input
//               placeholder="Search by Club ID or Name"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </Box>
//           <Button mt={4} colorScheme="blue" onClick={handleAddAdvertisement}>
//             Add Advertisement
//           </Button>
//         </Box>

//         {/* Display index, club name, and ranking */}
//         <Box>
//           <Text fontSize="xl" mb={4}>
//             Advertisement Index, Club Name, and Ranking
//           </Text>
//           <Table variant="simple">
//             <Thead>
//               <Tr>
//                 <Th>Club Name</Th>
//                 <Th>Rank</Th>
//                 <Th>Index</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {advertisements.map((ad) => (
//                 <Tr key={ad.index}>
//                   <Td>{ad.clubName}</Td>
//                   <Td>{ad.rank}</Td>
//                   <Td>{ad.index}</Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         </Box>
//       </VStack>
//     </Box>
//   );
// };

// export default AddAdvertisement;
