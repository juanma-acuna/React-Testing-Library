import { useState } from "react";
import "./App.css";

export function replaceCamelWithSpaces(colorName) {
	return colorName.replace(/\B([A-Z])\B/g, " $1");
}
export const firstColor = "MediumVioletRed";
export const secondColor = "MediumAquamarine";
export const disabledButtonColor = "gray";

function App() {
	const [bgColor, setBgColor] = useState(firstColor);
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

	const clickOnButton = () => {
		bgColor === firstColor ? setBgColor(secondColor) : setBgColor(firstColor);
	};
	const btnText = bgColor === secondColor ? firstColor : secondColor;

	const checkboxHandler = () => {
		setIsCheckboxChecked(!isCheckboxChecked);
	};

	console.log("isCheckboxChecked", isCheckboxChecked);
	console.log("bgColor", bgColor);

	return (
		<div style={{ textAlign: "center", paddingTop: "50px" }}>
			<button
				style={{
					backgroundColor: isCheckboxChecked ? disabledButtonColor : bgColor,
					color: "white",
					padding: "12px",
					fontSize: "18px",
					fontWeight: "bold",
					border: "0",
					borderRadius: "10px",
				}}
				onClick={clickOnButton}
				disabled={isCheckboxChecked}
				aria-disabled={isCheckboxChecked}
			>
				Change to {replaceCamelWithSpaces(btnText)}
			</button>
			<div style={{ paddingTop: "3rem" }}>
				<input
					id="disable-button-checkbox"
					type="checkbox"
					style={{ padding: "8px", margin: "8px" }}
					checked={isCheckboxChecked}
					onChange={checkboxHandler}
					aria-checked={isCheckboxChecked}
				/>
				<label htmlFor="disable-button-checkbox">Disable button</label>
			</div>
		</div>
	);
}

export default App;
