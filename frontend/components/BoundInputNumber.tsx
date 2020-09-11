import loglevel from "loglevel";
const log = loglevel.getLogger("BoundInputNumber");
log.setLevel("info");

import React from "react";

import { InputNumber } from "antd";

import { observer } from "mobx-react-lite";

import { BoundComponentProps } from "./BoundComponent";
import { StyledFormItem } from "../StyledComponents";

export interface BoundInputNumberProps extends BoundComponentProps {
	value: number;
	inputStyle?: React.CSSProperties;
}

const BoundInputNumber = observer(
	({
		style,
		inputStyle,
		name,
		value,
		rules,
		model,
		prop,
		label,
		layout,
		validateStatus,
		help,
	}: BoundInputNumberProps) => {
		log.debug("BoundInputNumber.render, value:", value);

		const onChange = (newValue: number | string) => {
			log.debug(
				"BoundInputNumber.onChange, value:",
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
				style={style}
				// name={name}
				// rules={rules}
				label={label}
				colon={false}
				{...extraProps}
				{...layout}
			>
				<InputNumber style={inputStyle} value={value} onChange={onChange} />
			</StyledFormItem>
		);
	}
);

export default BoundInputNumber;
