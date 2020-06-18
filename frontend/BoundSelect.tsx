import log from "loglevel";
log.setLevel("debug");

import React from "react";

import { Select } from "antd";
const { Option } = Select;

import { observer } from "mobx-react-lite";

import deep from "./deep";

import { BoundComponentProps } from "./BoundComponent";
import { StyledFormItem } from "./StyledComponents";

export interface OptionProps {
	value: number | string;
	label: string;
}

export interface BoundSelectProps extends BoundComponentProps {
	options: OptionProps[];
}

const BoundSelect = observer(
	({ model, path, label, layout, options }: BoundSelectProps) => {
		log.debug("BoundSelect.render");

		const handleChange = (value) => {
			deep.set(model, path, value);
		};

		const value = deep.get(model, path);

		return (
			<StyledFormItem label={label} {...layout}>
				<Select value={value} onChange={handleChange}>
					{options.map((option) => (
						<Option key={option.value} value={option.value}>
							{option.label}
						</Option>
					))}
				</Select>
			</StyledFormItem>
		);
	}
);

export default BoundSelect;
