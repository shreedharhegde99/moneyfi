import { Box, Flex, Hide, HStack, Show, Text, VStack } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddTransaction from "../components/AddTransaction";
import TransactionChart from "../components/TransactionChart";
import TransactionRangeSelect from "../components/TransactionRangeSelect";
import Transactions from "../components/Transactions";
import { getCategories } from "../store/user/user.action";
import getDayMs from "../utils/getDayMs";
import getToken from "../utils/getToken";

export default function Dashboard() {
	const dispatch = useDispatch();
	const currentMonth = new Date().getMonth();
	const currentYear = new Date().getFullYear();
	const monthStart = new Date(currentYear, currentMonth);
	let initDateState = { from: getDayMs(monthStart), to: getDayMs(new Date()) };
	const [dateRange, setDateRange] = useState(initDateState);
	const [rangeVal, setRangeVal] = useState("1");
	const userToken = getToken();

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
		dispatch(getCategories(userToken));
	}, []);

	return (
		<Fragment>
			<Box>
				<HStack px="6" align="start">
					<Box flex="1">
						<TransactionRangeSelect
							dateRange={dateRange}
							rangeVal={rangeVal}
							updateDateRange={updateDateRange}
						/>
						<Transactions dateRange={dateRange} />
					</Box>
					<Show above="lg">
						<TransactionChart />
					</Show>
				</HStack>
				<AddTransaction dateRange={dateRange} />
			</Box>
		</Fragment>
	);
}
