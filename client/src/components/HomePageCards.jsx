import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { Fragment } from "react";

export default function HomePageCards({ title, image, order = -1 }) {
	return (
		<Fragment>
			<Flex
				direction={{ base: "column", md: "row" }}
				justify="center"
				py="4"
				minH="md"
				bg="cyan.50"
			>
				<Box flex="1" order={{ base: -1, md: order }} p="4">
					<VStack align="center" h={{ base: "2xs", md: "full" }}>
						<Text fontSize="2xl" m="auto" textAlign="center">
							{title}
						</Text>
					</VStack>
				</Box>
				<Box flex="1">
					<Image src={image} alt={String()} w="full" />
				</Box>
			</Flex>
		</Fragment>
	);
}
