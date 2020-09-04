import loglevel from "loglevel";
const log = loglevel.getLogger("BoundSelect");
// log.setLevel("debug");

import React from "react";

import { Select } from "antd";
const { Option } = Select;

import { observer } from "mobx-react-lite";

import { BoundComponentProps } from "./BoundComponent";
import { StyledFormItem } from "../StyledComponents";
import { runInAction, toJS } from "mobx";

export interface OptionProps {
	value: number | string;
	name: string;
}

export interface BoundSelectProps extends BoundComponentProps {
	options: OptionProps[];
	showSearch?: boolean;
	filterOption?: any;
}

const BoundSelect = observer(
	({
		name,
		rules,
		model,
		prop,
		label,
		layout,
		options,
		placeholder,
		defaultValue,
		showSearch = false,
		filterOption = true,
	}: BoundSelectProps) => {
		log.debug("BoundSelect.render, prop:", prop);

		const onSelect = (value) => {
			log.debug("BoundSelect.onSelect, value:", value, ", model:", toJS(model));

			runInAction(() => {
				model[prop] = value;
			});

			log.debug("BoundSelect.onSelect, model[prop]:", model[prop]);
		};

		const value = model[prop];

		const additionalProps: {
			placeholder?: string;
		} = {};
		if (placeholder && options.length == 0) {
			additionalProps.placeholder = placeholder;
		}

		return (
			<StyledFormItem
				// name={name}
				// rules={rules}
				label={label}
				{...layout}
				{...additionalProps}
			>
				<Select
					value={value}
					onSelect={onSelect}
					showSearch={showSearch}
					filterOption={filterOption}
				>
					{options.map((option) => (
						<Option key={option.value} value={option.value} name={option.name}>
							{option.name}
						</Option>
					))}
				</Select>
			</StyledFormItem>
		);
	}
);

export default BoundSelect;
