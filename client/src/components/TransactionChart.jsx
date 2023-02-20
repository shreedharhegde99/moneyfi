import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	Colors,
} from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getChartData } from "../store/user/user.action";
ChartJS.register(ArcElement, Tooltip, Legend, Colors);

export default function TransactionChart() {
	const [type, setType] = useState("pie");
	const [category, setCategory] = useState([]);
	const [amount, setAmount] = useState([]);

	const dispatch = useDispatch();
	const { chartData } = useSelector((state) => state.user);

	const setChartData = () => {
		let categoryList = chartData.map((el) => el.category);
		let amountList = chartData.map((el) => el.amount);
		setCategory(categoryList);
		setAmount(amountList);
	};

	useEffect(() => {
		dispatch(getChartData());
		setChartData();
	}, []);

	const data = {
		labels: category,
		datasets: [{ label: "Transactions", data: amount }],
	};
	return (
		<Fragment>
			<Box
				flex="1"
				maxW="xl"
				p="6"
				borderLeft="1px"
				borderColor="blackAlpha.400"
			>
				<Box py="6">
					<RadioGroup onChange={setType} value={type}>
						<Stack direction="row" gap="10" py="4">
							<Radio value="pie">Pie</Radio>
							<Radio value="doughnout">Doughnout</Radio>
						</Stack>
					</RadioGroup>
					{type === "pie" && <Pie data={data} />}
					{type === "doughnout" && <Doughnut data={data} />}
				</Box>
				<Box py="6">
					{chartData.map((el) => (
						<Flex justify="space-between" py="2" key={el.category}>
							<Box>{el.category} </Box>
							<Box>{el.amount} </Box>
						</Flex>
					))}
				</Box>
			</Box>
		</Fragment>
	);
}
