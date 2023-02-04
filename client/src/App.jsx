import { Box } from "@chakra-ui/react";
import { Fragment } from "react";
import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";

function App() {
	return (
		<Fragment>
			<Box>
				<Navbar />
				<AllRoutes />
			</Box>
		</Fragment>
	);
}

export default App;
