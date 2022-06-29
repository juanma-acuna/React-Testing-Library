import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const renderWithContext = (ui, options) =>
	render(ui, { wrapper: OrderDetailsProvider, ...options });

// re exporting everything else
export * from "@testing-library/react";

// overiding the render method with our custom render method
export { renderWithContext as render };
