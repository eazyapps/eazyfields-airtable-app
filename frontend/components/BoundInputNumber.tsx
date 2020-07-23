import loglevel from "loglevel";
const log = loglevel.getLogger("BoundInputNumber");
// log.setLevel("debug");

import React from "react";

import { InputNumber } from "antd";

import { observer } from "mobx-react-lite";

import { BoundComponentProps } from "./BoundComponent";
import { StyledFormItem } from "../StyledComponents";

export interface BoundInputNumberProps extends BoundComponentProps {
	value: number;
	validateStatus?: "error";
	help?: string;
}

const BoundInputNumber = observer(
	({
		name,
		value,
		rules,
		model,
		prop,
		label,
		layout,
		placeholder,
		validateStatus,
		help,
	}: BoundInputNumberProps) => {
		log.debug("BoundInputNumber.render, value:", value);

		const handleChange = (newValue: number | string) => {
			log.debug(
				"BoundInputNumber.handleChange, value:",
				value,
				", typeof value:",
				typeof value
			);
			model[prop] = newValue;
		};

		const extraProps: any = {};
		if (validateStatus) {
			extraProps.validateStatus = validateStatus;
			extraProps.help = help;
		}

		return (
			<StyledFormItem
				name={name}
				rules={rules}
				label={label}
				{...extraProps}
				{...layout}
			>
				<InputNumber value={value} onChange={handleChange} />
			</StyledFormItem>
		);
	}
);

export default BoundInputNumber;
