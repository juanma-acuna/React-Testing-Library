import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("happy path testing", () => {
	test("order phases for happy path", async () => {
		// render the app
		render(<App />);

		const grandTotalHeader = screen.getByRole("heading", {
			name: /grand total: \$/i,
		});
		const orderSundateButton = screen.getByRole("button", {
			name: /order sundae!/i,
		});
		expect(orderSundateButton).toBeDisabled();

		/**
		 * Adding products
		 * make sure the numbers are right
		 * make sure the submit button is now enabled
		 */
		// add icecream scoops and toppings
		const vanillaInput = await screen.findByRole("spinbutton", {
			name: /vanilla/i,
		});
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, "1");
		expect(orderSundateButton).toBeEnabled();

		const cherriesToppingCheckbox = await screen.findByRole("checkbox", {
			name: /Cherries/i,
		});
		userEvent.click(cherriesToppingCheckbox);
		expect(orderSundateButton).toBeEnabled();

		// grand total should have the right ammount
		expect(grandTotalHeader).toHaveTextContent("3.50");

		// find and click order button
		userEvent.click(orderSundateButton);

		/**
		 * Now on the summary page
		 * should show the order summary
		 * the checkbox should be unchecked
		 */

		// check summary information based on order
		expect(screen.getByText(/order summary/i)).toBeInTheDocument();
		expect(screen.getByText(/Scoops: \$2.00/i)).toBeInTheDocument();
		expect(screen.getByText(/Toppings: \$1.50/i)).toBeInTheDocument();
		expect(screen.getByText(/1 vanilla/i)).toBeInTheDocument();
		expect(screen.getByText(/cherries/i)).toBeInTheDocument();

		// accept terms and conditions and click button to confirm order
		const confirmOrderButton = screen.getByRole("button", {
			name: /confirm order/i,
		});
		const checkbox = screen.getByRole("checkbox", {
			name: /terms and conditions/i,
		});
		userEvent.click(checkbox);

		userEvent.click(confirmOrderButton);

		expect(screen.getByText(/loading/i)).toBeInTheDocument();

		const thanksTitle = await screen.findByText(/thank you!/i);
		expect(thanksTitle).toBeInTheDocument();

		expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();

		// confirm order number on confirmation page
		const orderNumber = screen.getByText("Your order number is 9876543210");
		expect(orderNumber).toBeInTheDocument();
		const nothingWillHappenText = screen.getByText(
			"as per our terms and conditions, nothing will happen now"
		);
		expect(nothingWillHappenText).toBeInTheDocument();

		// click new order button on confirmation page
		const newOrderButton = screen.getByRole("button", {
			name: /create new order/i,
		});
		userEvent.click(newOrderButton);

		// check that scoops and toppints have been reset to 0
		expect(screen.getByText("Scoops total: $0.00")).toBeInTheDocument();
		expect(screen.getByText("Toppings total: $0.00")).toBeInTheDocument();

		// just to clear the error
		await screen.findByRole("spinbutton", {
			name: /vanilla/i,
		});
		await screen.findByRole("checkbox", {
			name: /Cherries/i,
		});
	});
	test("order phases for happy path with another flow", async () => {
		// render the app
		render(<App />);

		const grandTotalHeader = screen.getByRole("heading", {
			name: /grand total: \$/i,
		});
		const orderSundateButton = screen.getByRole("button", {
			name: /order sundae!/i,
		});
		expect(orderSundateButton).toBeDisabled();

		/**
		 * Adding products
		 * make sure the numbers are right
		 * make sure the submit button is now enabled
		 */
		// add icecream scoops and toppings
		const vanillaInput = await screen.findByRole("spinbutton", {
			name: /vanilla/i,
		});
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, "1");
		expect(orderSundateButton).toBeEnabled();

		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, "0");
		expect(orderSundateButton).toBeDisabled();

		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, "3");
		expect(orderSundateButton).toBeEnabled();

		// grand total should have the right ammount
		expect(grandTotalHeader).toHaveTextContent("6.00");

		// find and click order button
		userEvent.click(orderSundateButton);

		/**
		 * Now on the summary page
		 * should show the order summary
		 * the checkbox should be unchecked
		 */

		// check summary information based on order
		expect(screen.getByText(/order summary/i)).toBeInTheDocument();
		expect(screen.getByText(/Scoops: \$6.00/i)).toBeInTheDocument();
		expect(
			screen.queryByText(/Toppings:/i, { exact: false })
		).not.toBeInTheDocument();
		expect(screen.getByText(/3 vanilla/i)).toBeInTheDocument();

		// accept terms and conditions and click button to confirm order
		const confirmOrderButton = screen.getByRole("button", {
			name: /confirm order/i,
		});
		const checkbox = screen.getByRole("checkbox", {
			name: /terms and conditions/i,
		});
		userEvent.click(checkbox);

		userEvent.click(confirmOrderButton);

		expect(screen.getByText(/loading/i)).toBeInTheDocument();

		const thanksTitle = await screen.findByText(/thank you!/i);
		expect(thanksTitle).toBeInTheDocument();

		expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();

		// confirm order number on confirmation page
		const orderNumber = screen.getByText("Your order number is 9876543210");
		expect(orderNumber).toBeInTheDocument();
		const nothingWillHappenText = screen.getByText(
			"as per our terms and conditions, nothing will happen now"
		);
		expect(nothingWillHappenText).toBeInTheDocument();

		// click new order button on confirmation page
		const newOrderButton = screen.getByRole("button", {
			name: /create new order/i,
		});
		userEvent.click(newOrderButton);

		// check that scoops and toppints have been reset to 0
		expect(screen.getByText("Scoops total: $0.00")).toBeInTheDocument();
		expect(screen.getByText("Toppings total: $0.00")).toBeInTheDocument();

		// just to clear the error
		await screen.findByRole("spinbutton", {
			name: /vanilla/i,
		});
		await screen.findByRole("checkbox", {
			name: /Cherries/i,
		});
	});
});
