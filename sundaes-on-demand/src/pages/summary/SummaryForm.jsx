import React, { useState } from "react";
import { Form, Button, Popover, OverlayTrigger } from "react-bootstrap";

const SummaryForm = ({ setOrderPhase }) => {
	const [isButtonEnabled, setIsButtonEnabled] = useState(false);

	const popover = (
		<Popover id="popover-basic">
			<Popover.Body>No ice cream will actually be delivered</Popover.Body>
		</Popover>
	);

	const checkBoxLabel = (
		<span>
			I agree to
			<OverlayTrigger placement="right" overlay={popover}>
				<span style={{ color: "blue" }}>Terms and Conditions</span>
			</OverlayTrigger>
		</span>
	);

	return (
		<div>
			SummaryForm
			<Form>
				<Form.Group controlId="terms-and-conditions">
					<Form.Check
						type="checkbox"
						checked={isButtonEnabled}
						onChange={() => setIsButtonEnabled(!isButtonEnabled)}
						label={checkBoxLabel}
					/>
				</Form.Group>
				<Button
					variant="primary"
					type="submit"
					disabled={!isButtonEnabled}
					onClick={() => setOrderPhase("completed")}
				>
					Confirm order
				</Button>
			</Form>
		</div>
	);
};

export default SummaryForm;
