import log from "loglevel";
log.setLevel("debug");

import React from "react";

import { Input } from "antd";

import { observer } from "mobx-react-lite";

import { BoundComponentProps } from "./BoundComponent";
import { StyledFormItem } from "../../frontend/StyledComponents";

export interface BoundInputProps extends BoundComponentProps {
	placeholder?: string;
}

const BoundInput = observer(
	({
		name,
		rules,
		model,
		prop,
		label,
		placeholder,
		layout,
	}: BoundInputProps) => {
		log.debug("BoundInput.render");

		const handleChange = (e) => {
			model[prop] = e.target.value;
		};

		const value = model[prop];

		return (
			<StyledFormItem name={name} rules={rules} label={label} {...layout}>
				<Input value={value} onChange={handleChange} />
			</StyledFormItem>
		);
	}
);

export default BoundInput;
