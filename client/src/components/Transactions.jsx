import { Box, Flex, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChartData, getTransactions } from "../store/user/user.action";
import TransactionCard from "./TransactionCard";
import getDayMs from "../utils/getDayMs";

import "./styles/transactions.css";

export default function Transactions() {
	const { transactions } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const currentMonth = new Date().getMonth();
	const currentYear = new Date().getFullYear();
	const monthStart = new Date(currentYear, currentMonth);
	let initDateState = { from: getDayMs(monthStart), to: getDayMs(new Date()) };
	const [dateRange, setDateRange] = useState(initDateState);
	const [rangeVal, setRangeVal] = useState("1");

	const getUserTransactions = () => {
		dispatch(getTransactions(dateRange));
		dispatch(getChartData(dateRange));
	};

	const updateDateRange = (val) => {
		setRangeVal(val);

		if (Number(val) === 1) {
			setDateRange(initDateState);
		} else if (Number(val) === 3) {
			let to = Date.now();
			let from = Date.now() - 86400000 * 89;
			setDateRange({ from, to });
		} else if (Number(val) === 0) {
			let to = Date.now();
			setDateRange({ from: 0, to });
		}
	};

	useEffect(() => {
		getUserTransactions();
	}, [dateRange]);
	// console.log(`=>  dateRange:`, dateRange);

	return (
		<Fragment>
			<Box
				maxW="container.lg"
				p={{ base: "2", md: "6" }}
				pb="20"
				maxH="calc(100vh - 90px)"
				overflowY="scroll"
				flex="1"
			>
				<Box maxW="lg" m="auto">
					{transactions.length ? (
						<Box>
							<Box>
								<RadioGroup onChange={updateDateRange} value={rangeVal}>
									<HStack gap="5">
										<Radio value="1">This month</Radio>
										<Radio value="3">Last 3 months</Radio>
										<Radio value="0">All Time</Radio>
									</HStack>
								</RadioGroup>
							</Box>
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
