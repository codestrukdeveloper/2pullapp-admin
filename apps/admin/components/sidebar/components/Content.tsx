// // chakra imports
// import { Box, Flex, Stack } from '@chakra-ui/react';
// //   Custom components
// import Brand from 'components/sidebar/components/Brand';
// import Links from 'components/sidebar/components/Links';
// import SidebarCard from 'components/sidebar/components/SidebarCard';
// import { IRoute } from 'types/navigation';

// // FUNCTIONS

// interface SidebarContentProps {
// 	routes: IRoute[];
// }

// function SidebarContent(props: SidebarContentProps) {
// 	const { routes } = props;
// 	// SIDEBAR
// 	return (
// 		<Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
// 			<Brand />
// 			<Stack direction='column' mt='8px' mb='auto'>
// 				<Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }}>
// 					<Links routes={routes} />
// 				</Box>
// 			</Stack>

// 			{/* <Box ps='20px' pe={{ lg: '16px', '2xl': '20px' }} mt='60px' mb='40px' borderRadius='30px'>
// 				<SidebarCard />
// 			</Box> */}
// 		</Flex>
// 	);
// }

// export default SidebarContent;
import React from "react";
import {
  Box,
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
  Icon,
  Link as ChakraLink,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import { IRoute } from "types/navigation";

interface ContentProps {
  routes: IRoute[];
}

const SidebarContent: React.FC<ContentProps> = ({ routes }) => {
  const textColor = useColorModeValue("navy.700", "white");
  const brandColor = useColorModeValue("brand.500", "brand.400");

  const renderRouteItem = (route: IRoute, index: number) => {
    if (route.children) {
      return (
        <Accordion key={index} allowToggle>
          <AccordionItem border="none">
            <AccordionButton
              display="flex"
              alignItems="center"
              justifyContent="space-evently"
              px="16px"
              py="10px"
              borderRadius="8px"
              gap={36}
              _hover={{
                bg: useColorModeValue("gray.100", "whiteAlpha.100"),
              }}
            >
              <Flex align="center" justifyContent={"space-evenly"}>
                {route.icon && (
                  <Icon
                    as={route.icon}
                    color={textColor}
                    me="12px"
                    w="20px"
                    h="20px"
                  />
                )}
                <Text
                  me="auto"
                  color={textColor}
                  fontSize="md"
                  fontWeight="bold"
                >
                  {route.name}
                </Text>
              </Flex>
              <AccordionIcon color={textColor} />
            </AccordionButton>
            <AccordionPanel pb={4} px="16px">
              <Flex flexDirection="column">
                {route.children.map((child, childIndex) => (
                  <Link key={childIndex} href={child.path || "#"} passHref>
                    <ChakraLink
                      display="flex"
                      alignItems="center"
                      gap={2}
                      fontWeight="bold"
                      justifyContent={"space-between"}
                      ps="10px"
                      pt="3px"
                      pb="3px"
                      _hover={{
                        bg: useColorModeValue("gray.100", "whiteAlpha.100"),
                        color: brandColor,
                      }}
                    >
                      <Text color={textColor} fontSize="md" fontWeight="normal">
                        <Icon
                          as={child.icon}
                          color={textColor}
                          me="12px"
                          w="20px"
                          h="20px"
                        />
                        {child.name}
                      </Text>
                    </ChakraLink>
                  </Link>
                ))}
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      );
    }

    return (
      <Link key={index} href={route.path || "#"} passHref>
        <ChakraLink
          display="flex"
          alignItems="center"
          px="16px"
          py="10px"
          borderRadius="8px"
          _hover={{
            bg: useColorModeValue("gray.100", "whiteAlpha.100"),
            color: brandColor,
          }}
        >
          {route.icon && (
            <Icon
              as={route.icon}
              color={textColor}
              me="12px"
              w="20px"
              h="20px"
            />
          )}
          <Text color={textColor} fontSize="md" fontWeight="bold">
            {route.name}
          </Text>
        </ChakraLink>
      </Link>
    );
  };

  return (
    <Box mt={5} mb={5}>
      <Flex color={textColor}
        placeItems={"center"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text size={"md"}>Brand</Text>
        
      </Flex>
<Divider/>
      {routes.map((route, index) => renderRouteItem(route, index))}
    </Box>
  );
};

export default SidebarContent;
