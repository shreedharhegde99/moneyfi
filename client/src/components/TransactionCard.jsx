import { Box, Flex, Tooltip, useDisclosure, VStack } from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import getDailyTotal from "../utils/getDailyTotal";
import getDate from "../utils/getDate";

import TransactionUpdate from "./TransactionUpdate";

export default function TransactionCard({ data, dateRange }) {
	const [editEl, setEditEl] = useState({});
	const { isOpen, onOpen, onClose } = useDisclosure();
	let total = getDailyTotal(data.transactions);

	const initiateEditEl = (el) => {
		setEditEl(el);
		onOpen(true);
	};

	return (
		<Fragment>
			<Box py="5">
				<Flex justify="space-between" fontSize="md" fontWeight="bold" px="2">
					<Box>{getDate(data.date)}</Box>
					<Box color={total >= 0 ? "green.500" : "red.500"}>
						{`${total >= 0 ? "+" : ""}${total}`}
					</Box>
				</Flex>
				<Tooltip label={"Click to update / delete"} offset={[200, 5]}>
					<Box cursor="pointer">
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
								position="relative"
								onClick={() => initiateEditEl(el)}
							>
								<Flex gap="8" align="center">
									<Box fontWeight="semibold" mb="-0.5">
										{el.type === "income" ? (
											<AiOutlinePlus size="1.2rem" />
										) : (
											<AiOutlineMinus size="1.2rem" />
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
				</Tooltip>
			</Box>
			<TransactionUpdate
				isOpen={isOpen}
				onClose={onClose}
				currentEl={editEl}
				dateRange={dateRange}
			/>
		</Fragment>
	);
}
