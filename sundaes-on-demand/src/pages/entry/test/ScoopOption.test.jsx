import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

test("Validate red border on scoops on invalid values", async () => {
	render(<ScoopOption updateItemCount={jest.fn()} />);

	const spinbutton = await screen.findByRole("spinbutton");
	expect(spinbutton).toBeInTheDocument();

	userEvent.clear(spinbutton);
	userEvent.type(spinbutton, "99");
	expect(spinbutton).toHaveClass("is-invalid");

	userEvent.clear(spinbutton);
	userEvent.type(spinbutton, "-1");
	expect(spinbutton).toHaveClass("is-invalid");

	userEvent.clear(spinbutton);
	userEvent.type(spinbutton, "2.5");
	expect(spinbutton).toHaveClass("is-invalid");

	userEvent.clear(spinbutton);
	userEvent.type(spinbutton, "1");
	expect(spinbutton).not.toHaveClass("is-invalid");
});
