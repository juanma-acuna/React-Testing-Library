import { render, screen, fireEvent } from "@testing-library/react";
import App, {
	replaceCamelWithSpaces,
	firstColor,
	secondColor,
	disabledButtonColor,
} from "./App";

describe("General buttons and checkbox functionality", () => {
	test("buttons has correct inicial color", () => {
		render(<App />);

		// find an element with a role of button and text of `Change to ${replaceCamelWithSpaces(secondColor)}`
		const colorButton = screen.getByRole("button", {
			name: `Change to ${replaceCamelWithSpaces(secondColor)}`,
		});

		// expect the background color to be red
		expect(colorButton).toHaveStyle({ backgroundColor: firstColor });

		// click button
		fireEvent.click(colorButton);

		// expect to change the background color to blue
		expect(colorButton).toHaveStyle({ backgroundColor: secondColor });

		// expect the text change to "Change to MediumVioletRed"
		expect(colorButton).toHaveTextContent(
			`Change to ${replaceCamelWithSpaces(firstColor)}`
		);
	});

	test("initial conditions", () => {
		render(<App />);

		// Check the buttons starts out enabled
		const colorButton = screen.getByRole("button", {
			name: `Change to ${replaceCamelWithSpaces(secondColor)}`,
		});
		expect(colorButton).toBeEnabled();

		// Check that the checkbox starts out unchecked
		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).not.toBeChecked();
	});

	test("button must be disabled when checkbox is checked and viceversa", () => {
		render(<App />);

		// find the button
		const colorButton = screen.getByRole("button", {
			name: `Change to ${replaceCamelWithSpaces(secondColor)}`,
		});
		// validate the button is enabled
		expect(colorButton).toBeEnabled();

		// find the checkbox
		const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
		// validate the checkbox is not checked
		expect(checkbox).not.toBeChecked();

		// click on the checkbox
		fireEvent.click(checkbox);

		// the checkbox now must be checked
		expect(checkbox).toBeChecked();
		// the button now must be not enabled
		expect(colorButton).toBeDisabled();

		// click again in the checkbox
		fireEvent.click(checkbox);

		// the checkbox now must be unchecked
		expect(checkbox).not.toBeChecked();
		// the button now must be enabled
		expect(colorButton).toBeEnabled();
	});

	test(`${replaceCamelWithSpaces(
		firstColor
	)} button shoul be ${disabledButtonColor} if checkbox is checked and back to ${replaceCamelWithSpaces(
		firstColor
	)} when unchecked`, () => {
		render(<App />);

		const colorButton = screen.getByRole("button", {
			name: `Change to ${replaceCamelWithSpaces(secondColor)}`,
		});
		expect(colorButton).toHaveStyle({ backgroundColor: firstColor });

		const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
		fireEvent.click(checkbox);
		expect(colorButton).toHaveStyle({ backgroundColor: disabledButtonColor });

		fireEvent.click(checkbox);
		expect(colorButton).toHaveStyle({ backgroundColor: firstColor });
	});

	test(`${replaceCamelWithSpaces(
		secondColor
	)} button shoul be ${disabledButtonColor} if checkbox is checked and back to ${replaceCamelWithSpaces(
		secondColor
	)} when unchecked`, () => {
		render(<App />);

		const colorButton = screen.getByRole("button", {
			name: `Change to ${replaceCamelWithSpaces(secondColor)}`,
		});
		expect(colorButton).toHaveStyle({ backgroundColor: firstColor });
		fireEvent.click(colorButton);
		expect(colorButton).toHaveStyle({ backgroundColor: secondColor });

		const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
		fireEvent.click(checkbox);
		expect(colorButton).toHaveStyle({ backgroundColor: disabledButtonColor });

		fireEvent.click(checkbox);
		expect(colorButton).toHaveStyle({ backgroundColor: secondColor });
	});
});

describe("Replace CamelCase with Spaces functionality", () => {
	test("Works for no upercase inside", () => {
		expect(replaceCamelWithSpaces("Red")).toBe("Red");
	});
	test("Works for single upercase inside", () => {
		expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
	});
	test("Works for multiple upercase inside", () => {
		expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
	});
});
