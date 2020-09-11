import loglevel from "loglevel";
const log = loglevel.getLogger("BoundInput");
log.setLevel("info");

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
		validateStatus,
		help,
		layout,
	}: BoundInputProps) => {
		log.debug("BoundInput.render");

		const onChange = (e) => {
			model[prop] = e.target.value;
		};

		const value = model[prop];

		return (
			<StyledFormItem
				// name={name}
				// rules={rules}
				label={label}
				colon={false}
				validateStatus={validateStatus}
				help={help}
				{...layout}
			>
				<Input value={value} onChange={onChange} />
			</StyledFormItem>
		);
	}
);

export default BoundInput;
