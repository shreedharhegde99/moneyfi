import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { Fragment } from "react";

export default function HomePageCards({ title, image, order = -1 }) {
	return (
		<Fragment>
			<Flex
				direction={{ base: "column", lg: "row" }}
				justify="center"
				py={{ base: "4", lg: "14" }}
				minH="md"
			>
				<Box flex="1" order={{ base: -1, lg: order }} p="4">
					<VStack align="center" h={{ base: "2xs", lg: "full" }}>
						<Text
							fontSize="2xl"
							my="auto"
							textAlign={{ base: "center", lg: "start" }}
						>
							{title}
						</Text>
					</VStack>
				</Box>
				<Box flex="1">
					<Image src={image} alt={String()} w="full" m="auto" h="full" />
				</Box>
			</Flex>
		</Fragment>
	);
}
