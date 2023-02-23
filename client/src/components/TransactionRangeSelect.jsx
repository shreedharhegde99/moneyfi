import { Box, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChartData, getTransactions } from "../store/user/user.action";
import getToken from "../utils/getToken";

export default function TransactionRangeSelect({
	dateRange,
	updateDateRange,
	rangeVal,
}) {
	const dispatch = useDispatch();
	const { transactions } = useSelector((state) => state.user);
	const userToken = getToken();

	const getUserTransactions = () => {
		dispatch(getTransactions(dateRange, userToken));
		dispatch(getChartData(dateRange, userToken));
	};

	useEffect(() => {
		getUserTransactions();
	}, [dateRange]);

	return (
		<Fragment>
			{transactions.length > 0 && (
				<Box py="6" position="sticky" top="0" bg="red.50">
					<Box maxW="container.lg">
						<RadioGroup onChange={updateDateRange} value={rangeVal}>
							<HStack gap="5" justify="center">
								<Radio value="1">This month</Radio>
								<Radio value="3">Last 3 months</Radio>
								<Radio value="0">All Time</Radio>
							</HStack>
						</RadioGroup>
					</Box>
				</Box>
			)}
		</Fragment>
	);
}
