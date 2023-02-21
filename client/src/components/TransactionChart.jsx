import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	Colors,
	CategoryScale,
	LinearScale,
	BarElement,
} from "chart.js";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	Colors,
	CategoryScale,
	LinearScale,
	BarElement
);

export default function TransactionChart() {
	const [type, setType] = useState("doughnout");
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
		setChartData();
	}, [chartData]);

	const options = {
		plugins: {
			colors: {
				forceOverride: true,
			},
		},
	};

	const data = {
		labels: category,
		datasets: [
			{
				label: "Transactions",
				data: amount,
			},
		],
	};
	return (
		<Fragment>
			<Flex
				flex="1"
				maxW={{ base: "full", lg: "xl" }}
				p="6"
				borderLeft="1px"
				borderColor="blackAlpha.400"
				overflow="scroll"
				direction="column"
				justify="center"
				mt="10"
			>
				<Box py="6" w="full">
					<RadioGroup onChange={setType} value={type}>
						<Stack direction="row" gap="10" py="4">
							<Radio value="pie">Pie chart</Radio>
							<Radio value="doughnout">Doughnout</Radio>
							<Radio value="bar">Bar chart</Radio>
						</Stack>
					</RadioGroup>
					{type === "pie" && <Pie data={data} options={options} />}
					{type === "doughnout" && <Doughnut data={data} options={options} />}
					{type === "bar" && <Bar data={data} options={options} />}
				</Box>
				<Box py="6">
					{chartData.map((el) => (
						<Flex justify="space-between" py="2" key={el.category}>
							<Box>{el.category} </Box>
							<Box>{el.amount} </Box>
						</Flex>
					))}
				</Box>
			</Flex>
		</Fragment>
	);
}
