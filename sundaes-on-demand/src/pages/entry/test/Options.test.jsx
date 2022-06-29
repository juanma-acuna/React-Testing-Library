import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";

import Options from "../Options";

test("displays image for each scoop option from server", async () => {
	// base render
	render(<Options optionType="scoops" />);

	// find images
	const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
	expect(scoopImages).toHaveLength(2);

	// confirm alt text of images
	const altText = scoopImages.map((element) => element.alt);
	expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display toppings options", async () => {
	// base render
	render(<Options optionType="toppings" />);

	//find topping images
	const toppingImages = await screen.findAllByRole("img", {
		name: /topping$/i,
	});
	expect(toppingImages).toHaveLength(3);

	// confirm alt text on scoopImages
	const toppingAltText = toppingImages.map((item) => item.alt);
	expect(toppingAltText).toEqual([
		"Cherries topping",
		"M&Ms topping",
		"Hot fudge topping",
	]);
});

test("dont update total if scoops input is invalid", async () => {
	// Note: i think the test is ok, but the behavior of the application is not.
	// - If i put first a valid value on a scoop (let's say, 1 vanilla scoop), the
	// application works ok.
	// - If then, i put a non valid value on _another_ scoop (let's say, a -3 on chocolate)
	// the ammount continues on 2, and the "order sundae" button is still enabled.
	render(<Options optionType="scoops" />);

	// update vanilla scoops to 1 and chech the subtotal
	const vanillaInput = await screen.findByRole("spinbutton", {
		name: /vanilla/i,
	});
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, "-1");

	const scoopsTotal = screen.getByText("Scoops total: $0.00");
	expect(scoopsTotal).toBeInTheDocument();
});
