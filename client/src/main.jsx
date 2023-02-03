import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store/store";
import ErrorBoundary from "./components/ErrorBoundary";

const Main = function () {
	return (
		<ErrorBoundary>
			<Provider store={store}>
				<Router>
					<ChakraProvider>
						<App />
					</ChakraProvider>
				</Router>
			</Provider>
		</ErrorBoundary>
	);
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
