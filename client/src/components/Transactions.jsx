import { Box, Flex, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChartData, getTransactions } from "../store/user/user.action";
import TransactionCard from "./TransactionCard";
import getDayMs from "../utils/getDayMs";

import "./styles/transactions.css";

export default function Transactions() {
	const { transactions } = useSelector((state) => state.user);

	return (
		<Fragment>
			<Box
				maxW="container.lg"
				p={{ base: "2", md: "6" }}
				pb="20"
				maxH="calc(100vh - 90px)"
				overflowY="scroll"
			>
				<Box maxW="lg" m="auto">
					{transactions.length ? (
						<Box>
							{transactions.map((el) => (
								<TransactionCard data={el} key={el.date} />
							))}
						</Box>
					) : (
						"No Transactions please start adding transactions to continue.."
					)}
				</Box>
			</Box>
		</Fragment>
	);
}
