import {
	render,
	screen,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("Summary testing", () => {
	test("check default settings for button and checkbox", () => {
		// base render
		render(<SummaryForm />);

		// // find the button and verify it's disabed
		const button = screen.getByRole("button", {
			name: /confirm order/i,
		});
		expect(button).toBeDisabled();

		// // find the checkbox and verify it's not checked
		const checkbox = screen.getByRole("checkbox", {
			name: /terms and conditions/i,
		});
		// // the checkbox should not be checked
		expect(checkbox).not.toBeChecked();
	});

	test("Checking the checkbox should enable the button, and viceversa", () => {
		// base render
		render(<SummaryForm />);
		const button = screen.getByRole("button", { name: /confirm order/i });
		const checkbox = screen.getByRole("checkbox", {
			name: /terms and conditions/i,
		});

		// checkbox should be unchecked and button should be disabled
		expect(checkbox).not.toBeChecked();
		expect(button).toBeDisabled();

		// click on checkbox should enable the button
		userEvent.click(checkbox);
		expect(checkbox).toBeChecked();
		expect(button).toBeEnabled();

		// click on checkbox should disable the button
		userEvent.click(checkbox);
		expect(checkbox).not.toBeChecked();
		expect(button).toBeDisabled();
	});

	test("popover responds to hover", async () => {
		render(<SummaryForm />);

		// popover starts out hidden
		const nullPopover = screen.queryByText(
			/no ice cream will actually be delivered/i
		);
		expect(nullPopover).not.toBeInTheDocument();

		// popover is shown on hover
		const termsAndConditions = screen.getByText(/terms and conditions/i);
		userEvent.hover(termsAndConditions);
		const popover = await screen.findByText(
			/no ice cream will actually be delivered/i
		);
		expect(popover).toBeInTheDocument();

		// // popover hides on unhover (async way)
		userEvent.unhover(termsAndConditions);
		await waitForElementToBeRemoved(() =>
			screen.queryByText(/No ice cream will actually be delivered/i)
		);
	});
});
