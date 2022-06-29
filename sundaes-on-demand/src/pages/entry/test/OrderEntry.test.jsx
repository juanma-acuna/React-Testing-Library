import {
	render,
	screen,
	waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

test("handle errors for scoops and toppings routes", async () => {
	server.resetHandlers([
		rest.get("http://localhost:3000/scoops", (req, res, ctx) =>
			res(ctx.status(500))
		),
		rest.get("http://localhost:3000/toppings", (req, res, ctx) =>
			res(ctx.status(500))
		),
	]);
	render(<OrderEntry setOrderPhase={jest.fn()} />);

	await waitFor(async () => {
		const alerts = await screen.findAllByRole("alert");
		expect(alerts).toHaveLength(2);
	});
});
test("disable order button if there are no scoops ordered", async () => {
	render(<OrderEntry />);

	const orderSundateButton = screen.getByRole("button", {
		name: /order sundae!/i,
	});
	expect(orderSundateButton).toBeDisabled();

	const chocolateInput = await screen.findByRole("spinbutton", {
		name: /chocolate/i,
	});
	userEvent.clear(chocolateInput);
	userEvent.type(chocolateInput, "3");
	expect(orderSundateButton).toBeEnabled();

	userEvent.clear(chocolateInput);
	userEvent.type(chocolateInput, "1");
	expect(orderSundateButton).toBeEnabled();

	userEvent.clear(chocolateInput);
	userEvent.type(chocolateInput, "0");
	expect(orderSundateButton).toBeDisabled();
});
