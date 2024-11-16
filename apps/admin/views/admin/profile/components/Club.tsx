// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Link,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
// Assets
import { MdEdit } from "react-icons/md";

export default function Club(props: {
  title: string;
  ranking: number | string;
  link: string;
  image: string | any;
  [x: string]: any;
  subtitle: string;
}) {
  const { title, ranking, link, subtitle, image, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");
  return (
    <Card bg={bg} {...rest} p="14px" mt={5}>
      <Flex align="center" gap={2} direction={{ base: "column", md: "row" }}>
        <Image
          alt=""
          h="80px"
          w="80px"
          src={image.src}
          borderRadius="8px"
          me="20px"
        />
        <Box mt={{ base: "10px", md: "0" }}>
          <Text
            color={textColorPrimary}
            fontWeight="500"
            fontSize="xl"
            mb="4px"
          >
            {title}
          </Text>
          <Text
            color={textColorPrimary}
            fontWeight="500"
            fontSize="md"
            mb="4px"
          >
            {subtitle}
          </Text>
          <Flex>
            <Text
              fontWeight="500"
              color={textColorSecondary}
              fontSize="sm"
              me="4px"
            >
              Project #{ranking} •{" "}
            </Text>
            <Link fontWeight="500" color={brandColor} href={link} fontSize="sm">
              See project details
            </Link>
          </Flex>
        </Box>
        <Link
          href={link}
          variant="no-hover"
          me="16px"
          ms="auto"
          p="0px !important"
        >
          <Icon as={MdEdit} color="secondaryGray.500" h="18px" w="18px" />
        </Link>
      </Flex>
    </Card>
  );
}
