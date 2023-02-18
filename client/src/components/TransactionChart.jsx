import { Box, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Fragment, useState } from "react";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	Colors,
} from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend, Colors);

export default function TransactionChart() {
	const [type, setType] = useState("pie");
	return (
		<Fragment>
			<Box flex="1" maxW="lg" p="6">
				<RadioGroup onChange={setType} value={type}>
					<Stack direction="row">
						<Radio value="pie">Pie</Radio>
						<Radio value="doughnout">Doughnout</Radio>
					</Stack>
				</RadioGroup>
				{type === "pie" && <Pie data={data} {...props} />}
				{type === "doughnout" && <Doughnut data={data} {...props} />}
			</Box>
		</Fragment>
	);
}
