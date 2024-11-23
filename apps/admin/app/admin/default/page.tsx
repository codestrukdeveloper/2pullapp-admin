"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  SimpleGrid,
  useColorModeValue,
  HStack,
  Button,
  VStack,
} from "@chakra-ui/react";

// Icons
import {
  MdPeople,
  MdBusinessCenter,
  MdAttachMoney,
  MdBarChart,
  MdAttachMoney as MdSpend,
  MdFileCopy,
} from "react-icons/md";

// Custom Components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";

// Existing Components
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieCard from "views/admin/default/components/PieCard";

// Dynamic ApexCharts Import
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Store Imports
import { useGetUsers } from "../utils/getUsers";
import { useGetClubs } from "../utils/getClubs";
import { useGetRevenue } from "../utils/getRevenue";
import { useAuthStore } from "../utils/authStore";
import { ApexOptions } from "apexcharts";

export default function Default() {
  // State Management
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">(
    "monthly"
  );

  // Store Hooks
  const { users, fetchAllUsers, isLoading: isUsersLoading } = useGetUsers();
  const { clubs, fetchClubs, isLoading: isClubsLoading } = useGetClubs();
  const { revenue, fetchRevenue } = useGetRevenue();
  const { token } = useAuthStore();

  // Color Modes
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  // Data Fetching
  useEffect(() => {
    if (token) {
      fetchAllUsers(token);
      fetchClubs(token, 1);
      fetchRevenue(token, period);
    }
  }, [token, period]);

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar" as const,
      height: 250,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "10%",
        borderRadius: 5,
      },
    },
    xaxis: {
      categories: ["Current Revenue", "Previous Revenue"],
    },
    tooltip: {
      y: {
        formatter: (val: number) => `$ ${val}`,
      },
    },
    title: {
      text: `${period.charAt(0).toUpperCase() + period.slice(1)} Revenue`,
      align: "center",
    },
  };

  const chartSeries = [
    {
      name: "Revenue",
      data: [revenue?.currentRevenue || 5, revenue?.previousRevenue || 10],
    },
  ];

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Overview Statistics */}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        {/* Total Users */}
        <MiniStatistics
          startContent={
            <IconBox
              width="56px"
              height="56px"
              bg={boxBg}
              icon={<MdPeople width="32px" height="32px" color={brandColor} />}
            />
          }
          name="Total Users"
          value={isUsersLoading ? "Loading..." : users.length.toString()}
        />

        {/* Total Clubs */}
        <MiniStatistics
          startContent={
            <IconBox
              width="56px"
              height="56px"
              bg={boxBg}
              icon={
                <MdBusinessCenter
                  width="32px"
                  height="32px"
                  color={brandColor}
                />
              }
            />
          }
          name="Total Clubs"
          value={isClubsLoading ? "Loading..." : clubs.length.toString()}
        />

        {/* Total Revenue */}
        <MiniStatistics
          startContent={
            <IconBox
              width="56px"
              height="56px"
              bg={boxBg}
              icon={
                <MdAttachMoney width="32px" height="32px" color={brandColor} />
              }
            />
          }
          name="Total Revenue"

          value={`${revenue?.currentRevenue || 0}`}
        />

        {/* Existing Statistics */}
        <MiniStatistics
          startContent={
            <IconBox
              width="56px"
              height="56px"
              bg={boxBg}
              icon={
                <MdBarChart width="32px" height="32px" color={brandColor} />
              }
            />
          }
          name="Earnings"
          value="$350.400000"
        />
        <MiniStatistics
          startContent={
            <IconBox
              width="56px"
              height="56px"
              bg={boxBg}
              icon={<MdSpend width="32px" height="32px" color={brandColor} />}
            />
          }
          name="Spend this month"
          value="$642.39"
        />
        <MiniStatistics
          startContent={
            <IconBox
              width="56px"
              height="56px"
              bg={boxBg}
              icon={
                <MdFileCopy width="32px" height="32px" color={brandColor} />
              }
            />
          }
          name="Total Projects"
          value="2935"
        />
      </SimpleGrid>

      {/* Revenue Chart Section */}
      <VStack width="100%" spacing={4}>
        {/* Period Switching Buttons */}
        <HStack justifyContent="center" spacing={4} width="full">
          {["Daily", "Weekly", "Monthly"].map((periodOption) => (
            <Button
              key={periodOption}
              onClick={() => setPeriod(periodOption.toLowerCase() as any)}
              colorScheme={
                period === periodOption.toLowerCase() ? "blue" : "gray"
              }
              variant="solid"
            >
              {periodOption}
            </Button>
          ))}
        </HStack>

        <Box width="100%" mt="20px">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </Box>
      </VStack>

 
    </Box>
  );
}