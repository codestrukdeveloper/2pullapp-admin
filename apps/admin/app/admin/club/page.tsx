"use client";

import { Box, Grid, useColorModeValue } from "@chakra-ui/react";
import Clubs from "@/views/admin/profile/components/Clubs";

export default function Club() {
  // Dynamic color modes
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Section */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 0fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        {/* Uncomment and use these components as needed */}
        {/* <Banner 
          gridArea="1 / 1 / 2 / 2" 
          banner={banner.src} 
          avatar={avatar}
          name="Adela Parkson" 
          job="Product Designer" 
          posts="17" 
          followers="9.7k" 
          following="274" 
        /> */}
        {/* <Storage
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          used={25.6}
          total={50}
        /> */}
        {/* <Upload
          gridArea={{
            base: "3 / 1 / 4 / 2",
            lg: "1 / 3 / 2 / 4",
          }}
          minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
          pe="20px"
          pb={{ base: "100px", lg: "20px" }}
        /> */}
      </Grid>

      {/* Clubs Section */}
      <Grid mb="20px" gap={{ base: "20px", xl: "20px" }}>
        <Clubs />
      </Grid>
    </Box>
  );
}
