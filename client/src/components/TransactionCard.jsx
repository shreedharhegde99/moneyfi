import { Box, Flex } from "@chakra-ui/react";
import { Fragment } from "react";
import { BiRupee } from "react-icons/bi";
import getDailyTotal from "../utils/getDailyTotal";
import getDate from "../utils/getDate";

export default function TransactionCard({ data }) {
	let total = getDailyTotal(data.transactions);
	return (
		<Fragment>
			<Box py="5">
				<Flex justify="space-between" fontSize="md" fontWeight="bold" px="2">
					<Box>{getDate(data.date)}</Box>
					<Box color={total >= 0 ? "green.500" : "red.500"}>
						{`${total >= 0 ? "+" : ""}${total}`}
					</Box>
				</Flex>
				<Box>
					{data.transactions.map((el) => (
						<Flex
							justify="space-between"
							align="center"
							key={el._id}
							bg={el.type === "income" ? "green.200" : "red.200"}
							p="2"
							px="4"
							my="2"
							borderRadius="2xl"
						>
							<Flex gap="4">
								<Box fontWeight="semibold">
									{el.type === "income" ? "+" : "-"}
								</Box>
								<Box>{el.category}</Box>
							</Flex>
							<Flex align="baseline" gap="1">
								<BiRupee />
								{el.amount}
							</Flex>
						</Flex>
					))}
				</Box>
			</Box>
		</Fragment>
	);
}
