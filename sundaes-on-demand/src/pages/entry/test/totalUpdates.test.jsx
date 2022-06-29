import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

describe("scoops and toppings test", () => {
	test("update scoop subtotal when scoops change", async () => {
		// base render
		render(<Options optionType="scoops" />);

		// make sure total starts out on zero
		const scoopsSubtotal = screen.getByText("Scoops total: $", {
			exact: false,
		});
		expect(scoopsSubtotal).toHaveTextContent("0.00");

		// update vanilla scoops to 1 and chech the subtotal
		const vanillaInput = await screen.findByRole("spinbutton", {
			name: /vanilla/i,
		});
		userEvent.clear(vanillaInput);
		//userEvent.type require a string as the second argument
		userEvent.type(vanillaInput, "1");
		expect(scoopsSubtotal).toHaveTextContent("2.00");

		// update chocolate scoops to 2 and check the subtotal
		const chocolateInput = await screen.findByRole("spinbutton", {
			name: /chocolate/i,
		});
		userEvent.clear(chocolateInput);
		userEvent.type(chocolateInput, "2");
		expect(scoopsSubtotal).toHaveTextContent("6.00");
	});

	test("update toppings subtotal when topping change", async () => {
		// base render
		render(<Options optionType="toppings" />);

		// starts out on zero
		const toppingsSubtotal = screen.getByText("Toppings total: $", {
			exact: false,
		});
		expect(toppingsSubtotal).toHaveTextContent("0.00");

		// find one checkbox, make sure is unchecked
		const cherriesToppingCheckbox = await screen.findByRole("checkbox", {
			name: /Cherries/i,
		});
		expect(cherriesToppingCheckbox).not.toBeChecked();

		// click the checkbox and check the ammount is updated
		expect(toppingsSubtotal).toHaveTextContent("0.00");
		userEvent.click(cherriesToppingCheckbox);
		expect(cherriesToppingCheckbox).toBeChecked();
		expect(toppingsSubtotal).toHaveTextContent("1.50");

		// find another checkbox, should be unchecked
		const mAndMsToppingCheckbox = await screen.findByRole("checkbox", {
			name: /m&ms/i,
		});
		expect(mAndMsToppingCheckbox).not.toBeChecked();

		// click the second checkbox and check the ammount is updated
		expect(toppingsSubtotal).toHaveTextContent("1.50");
		userEvent.click(mAndMsToppingCheckbox);
		expect(mAndMsToppingCheckbox).toBeChecked();
		expect(toppingsSubtotal).toHaveTextContent("3.00");

		// uncheck the first checkbox and make sure the ammount was updated
		userEvent.click(cherriesToppingCheckbox);
		expect(cherriesToppingCheckbox).not.toBeChecked();
		expect(toppingsSubtotal).toHaveTextContent("1.50");
	});
});

describe("grand total test", () => {
	test("grand total updates properly if a scoop is added first and then a topping", async () => {
		// base render
		render(<OrderEntry />);

		const grandTotalHeader = screen.getByRole("heading", {
			name: /grand total: \$/i,
		});

		// check the grand total starts out at 0
		expect(grandTotalHeader).toHaveTextContent("0.00");

		// update vanilla scoops to 3 and chech the grand total
		const vanillaInput = await screen.findByRole("spinbutton", {
			name: /vanilla/i,
		});
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, "3");
		expect(grandTotalHeader).toHaveTextContent("6.00");

		// find one checkbox, click on it and check the grand total
		const cherriesToppingCheckbox = await screen.findByRole("checkbox", {
			name: /Cherries/i,
		});
		userEvent.click(cherriesToppingCheckbox);
		expect(grandTotalHeader).toHaveTextContent("7.50");

		// find one checkbox, click on it and check the grand total
		const hotFudgeToppingCheckbox = await screen.findByRole("checkbox", {
			name: /hot fudge/i,
		});
		userEvent.click(hotFudgeToppingCheckbox);
		expect(grandTotalHeader).toHaveTextContent("9.00");

		// update vanilla scoops to 2 and chech the grand total
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, "2");
		expect(grandTotalHeader).toHaveTextContent("7.00");
	});

	test("grand total updates properly if a topping is added first and then a scoop", async () => {
		// base render
		render(<OrderEntry />);

		const grandTotalHeader = screen.getByRole("heading", {
			name: /grand total: \$/i,
		});

		// check the grand total starts out at 0
		expect(grandTotalHeader).toHaveTextContent("0.00");

		// find one checkbox, click on it and check the grand total
		const hotFudgeToppingCheckbox = await screen.findByRole("checkbox", {
			name: /hot fudge/i,
		});
		userEvent.click(hotFudgeToppingCheckbox);
		expect(grandTotalHeader).toHaveTextContent("1.50");

		// find one checkbox, click on it and check the grand total
		const cherriesToppingCheckbox = await screen.findByRole("checkbox", {
			name: /Cherries/i,
		});
		userEvent.click(cherriesToppingCheckbox);
		expect(grandTotalHeader).toHaveTextContent("3.00");

		// update chocolate scoops to 2 and chech the grand total
		const chocolateInput = await screen.findByRole("spinbutton", {
			name: /chocolate/i,
		});
		userEvent.clear(chocolateInput);
		userEvent.type(chocolateInput, "2");
		expect(grandTotalHeader).toHaveTextContent("7.00");

		// find one checkbox, click on it and check the grand total
		userEvent.click(hotFudgeToppingCheckbox);
		expect(grandTotalHeader).toHaveTextContent("5.50");
	});

	test("grand total updates properly if an item is removed", async () => {
		// base render
		render(<OrderEntry />);

		const grandTotalHeader = screen.getByRole("heading", {
			name: /grand total: \$/i,
		});

		// check the grand total starts out at 0
		expect(grandTotalHeader).toHaveTextContent("0.00");

		// find one checkbox, click on it and check the grand total
		const hotFudgeToppingCheckbox = await screen.findByRole("checkbox", {
			name: /hot fudge/i,
		});
		userEvent.click(hotFudgeToppingCheckbox);
		expect(grandTotalHeader).toHaveTextContent("1.50");

		// update chocolate scoops to 1 and chech the grand total
		const chocolateInput = await screen.findByRole("spinbutton", {
			name: /chocolate/i,
		});
		userEvent.clear(chocolateInput);
		userEvent.type(chocolateInput, "1");
		expect(grandTotalHeader).toHaveTextContent("3.50");

		// find one checkbox, click on it and check the grand total
		userEvent.click(hotFudgeToppingCheckbox);
		expect(grandTotalHeader).toHaveTextContent("2.00");

		// update chocolate scoops to  and chech the grand total
		userEvent.clear(chocolateInput);
		userEvent.type(chocolateInput, "0");
		expect(grandTotalHeader).toHaveTextContent("0.00");
	});
});
