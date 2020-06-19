import log from "loglevel";
log.setLevel("debug");

import React from "react";

import { observer } from "mobx-react-lite";

import { Select } from "antd";
const { Option } = Select;

import { cursor } from "@airtable/blocks";
import { useBase, useWatchable } from "@airtable/blocks/ui";

import Superfield from "../models/Superfield";
import { StyledFormItem } from "../StyledComponents";

const TableSelector = observer(({ field }: { field: Superfield }) => {
	log.debug(
		"TableSelector.render, table:",
		field.table ? field.table.name : ""
	);

	const base = useBase();

	const onSelect = (value) => {
		field.table = base.getTableById(value);
	};

	return (
		<StyledFormItem
			name="table"
			label="Table to create the field in"
			rules={[{ required: true, message: "Please select a table" }]}
		>
			<Select onSelect={onSelect}>
				{base.tables.map((table) => (
					<Option key={table.id} value={table.id}>
						{table.name}
					</Option>
				))}
			</Select>
		</StyledFormItem>
	);
});

export default TableSelector;
