import { Box, Text } from "@chakra-ui/react";

export default function NewButton({ onClick }) {
	return (
		<Box
			position="fixed"
			bottom={"10"}
			right={{ base: "10", md: "20", lg: "10%" }}
			cursor="pointer"
			boxShadow="dark-lg"
			borderRadius="full"
			fontSize="4xl"
			fontWeight="bold"
			display="flex"
			justifyContent="center"
			alignItems="center"
			w="12"
			h="12"
			zIndex="2"
			bg="white"
			userSelect="none"
			transition="all 500ms"
			_hover={{
				boxShadow: "2px 5px 20px green",
				transform: { lg: "translateY(-5px)" },
			}}
			onClick={onClick}
		>
			<Text bgClip="text" bgGradient="linear(to-r,blue.500,blue.600,blue.700)">
				+
			</Text>
		</Box>
	);
}
