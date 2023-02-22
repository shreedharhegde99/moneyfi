import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import transactionImage from "../assets/transactions.png";
import chartImage from "../assets/charts.png";
import categoryImage from "../assets/categories.png";
import addTransactionImage from "../assets/add_transactions.png";
import HomePageCards from "../components/HomePageCards";

export default function Home() {
	return (
		<Fragment>
			<Box bg="blackAlpha.50">
				<Box py="4" maxW="container.xl" m="auto">
					<Box>
						<Text fontSize="3xl">Welcome to Moneyfi</Text>
					</Box>
					<HomePageCards
						image={transactionImage}
						title="Keep a note of all your transactions at one place"
					/>
					<HomePageCards
						image={chartImage}
						title="Chart view of all your transactions at one place"
						order="1"
					/>
					<HomePageCards
						image={categoryImage}
						title="View all categories. Create categories as you need..."
					/>
				</Box>
			</Box>
		</Fragment>
	);
}
