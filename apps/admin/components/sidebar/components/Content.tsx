import React, { useState } from "react";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { IRoute } from "types/navigation";
import Link from "next/link";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";

interface SidebarContentProps {
  routes: IRoute[];
}

const SidebarContent: React.FC<SidebarContentProps> = ({ routes }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (routeName: string) => {
    setOpenDropdown(openDropdown === routeName ? null : routeName);
  };

  const renderRoutes = (routes: IRoute[]) => {
    return routes.map((route, index) => {
      // Check if route has children (dropdown)
      if (route.children && route.children.length > 0) {
        const isOpen = openDropdown === route.name;
        return (
          <Box key={index}>
            <Flex
              alignItems="center"
              onClick={() => toggleDropdown(route.name)}
              cursor="pointer"
              width="100%"
              py="10px"
              px="15px"
              borderRadius="8px"
              _hover={{
                bg: "rgba(0,0,0,0.05)",
                transition: "background 0.3s ease",
              }}
            >
              {route.icon}
              <Text ml={3} flex="1">
                {route.name}
              </Text>
              <Icon
                as={isOpen ? MdKeyboardArrowDown : MdKeyboardArrowRight}
                w={6}
                h={6}
                color="gray.500"
              />
            </Flex>

            {isOpen &&
              route.children.map((childRoute, childIndex) => (
                <Link
                  key={childIndex}
                  href={`${childRoute.layout}${childRoute.path}`}
                  passHref
                >
                  <Flex
                    alignItems="center"
                    ml={6}
                    py="8px"
                    px="15px"
                    borderRadius="8px"
                    _hover={{
                      bg: "rgba(0,0,0,0.05)",
                      transition: "background 0.3s ease",
                    }}
                  >
                    {childRoute.icon}
                    <Text ml={3}>{childRoute.name}</Text>
                  </Flex>
                </Link>
              ))}
          </Box>
        );
      }

      // Regular route rendering
      return (
        <Link key={index} href={`${route.layout}${route.path}`} passHref>
          <Flex
            alignItems="center"
            width="100%"
            py="10px"
            px="15px"
            borderRadius="8px"
            _hover={{
              bg: "rgba(0,0,0,0.05)",
              transition: "background 0.3s ease",
            }}
          >
            {route.icon}
            <Text ml={3}>{route.name}</Text>
          </Flex>
        </Link>
      );
    });
  };

  return (
    <Box>
      <Box>
        <Flex
          alignItems="center"
          justifyContent="center"
          py={6}
          borderBottom="1px solid"
        >
          {/* <Image
                src="/path/to/your/logo.png"
                alt="Company Logo"
                maxH="50px"
                objectFit="contain"
              /> */}
          <Text ml={3} fontSize="xl" fontWeight="bold">
            Your Company Name
          </Text>
        </Flex>

        {renderRoutes(routes)}
      </Box>
    </Box>
  );
};

export default SidebarContent;
