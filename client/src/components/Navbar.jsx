import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<Fragment>
			<Box
				p="4"
				position="sticky"
				top="0"
				left="0"
				zIndex="2"
				boxShadow="xl"
				bg="azure"
			>
				<Flex
					maxW={{ base: "full", md: "container.xl" }}
					m="auto"
					justify="space-between"
					align="baseline"
				>
					<Link to="/">
						<Box fontSize="3xl" fontWeight="bold">
							<Text
								bgGradient="linear(to-r,blue.500,pink.400,cyan.500)"
								bgClip="text"
								letterSpacing="wider"
							>
								Moneyfi
							</Text>
						</Box>
					</Link>
					<Box>
						<HStack>
							<Box>Dashboard</Box>
							<Link to="/signup">
								<Box>Signup</Box>
							</Link>
							<Link to="/login">
								<Box>Login</Box>
							</Link>
						</HStack>
					</Box>
				</Flex>
			</Box>
		</Fragment>
	);
}
