import React, { useState, useEffect } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import Row from "react-bootstrap/Row";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

const Options = ({ optionType }) => {
	const [items, setItems] = useState([]);
	const [error, setError] = useState(false);
	const [orderDetails, updateItemCount] = useOrderDetails();

	const url = `http://localhost:3030/${optionType}`;
	//optionType may be 'scoops' or 'toppings'
	useEffect(() => {
		axios
			.get(url)
			.then((response) => setItems(response.data))
			.catch((error) => {
				setError(true);
			});
	}, [optionType, url]);

	if (error) {
		return <AlertBanner />;
	}

	const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
	const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

	const optionItems = items.map((item) => {
		return (
			<ItemComponent
				key={item.name}
				name={item.name}
				imagePath={item.imagePath}
				updateItemCount={(itemName, newItemCount) =>
					updateItemCount(itemName, newItemCount, optionType)
				}
			/>
		);
	});
	return (
		<>
			<h2>{title}</h2>
			<p>{formatCurrency(pricePerItem[optionType])} each</p>
			<p>
				{title} total: {orderDetails.totals[optionType]}
			</p>
			<Row>{optionItems}</Row>;
		</>
	);
};

export default Options;
