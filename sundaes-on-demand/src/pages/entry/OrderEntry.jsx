import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderEntry = ({ setOrderPhase }) => {
	const [orderDetails] = useOrderDetails();
	const orderDisabled = orderDetails.totals.scoops === "$0.00";

	return (
		<div>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
			<h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
			<button disabled={orderDisabled} onClick={() => setOrderPhase("review")}>
				Order Sundae!
			</button>
		</div>
	);
};

export default OrderEntry;
