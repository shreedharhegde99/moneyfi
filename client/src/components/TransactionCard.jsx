import { Box, Flex } from "@chakra-ui/react";
import { Fragment } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
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
							p="3"
							px="4"
							my="3"
							borderRadius="2xl"
						>
							<Flex gap="8" align="center">
								<Box fontWeight="semibold" mb="-0.5">
									{el.type === "income" ? (
										<AiOutlineMinus size="1.2rem" />
									) : (
										<AiOutlinePlus size="1.2rem" />
									)}
								</Box>
								<Box fontSize="lg">{el.category}</Box>
							</Flex>
							<Flex align="center" gap="1">
								<Box>
									<BiRupee size="1.2rem" />
								</Box>
								<Box minW="10">{el.amount}</Box>
							</Flex>
						</Flex>
					))}
				</Box>
			</Box>
		</Fragment>
	);
}
