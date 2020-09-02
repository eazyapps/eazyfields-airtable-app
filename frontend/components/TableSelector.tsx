import loglevel from "loglevel";
const log = loglevel.getLogger("TableSelector");
log.setLevel("debug");

import React from "react";

import { observer } from "mobx-react-lite";

import { Select } from "antd";
const { Option } = Select;

import { useBase } from "@airtable/blocks/ui";

import Eazyfield from "../models/Eazyfield";
import { StyledFormItem } from "../StyledComponents";

const TableSelector = observer(({ field }: { field: Eazyfield }) => {
	log.debug(
		"TableSelector.render, table:",
		field.table ? field.table.name : "null"
	);

	const base = useBase();

	setTimeout(() => {
		if (field._table && field._table.isDeleted) {
			log.debug("TableSelector.render - table was deleted");
			field._table = null;
			return null;
		}
	});

	// const onSelect = (value) => {
	// 	log.debug("TableSelector.onSelect");
	// 	runInAction(() => {
	// 		field._table = base.getTableById(value);
	// 	});
	// };

	return (
		<StyledFormItem
			name="table"
			label="Table to create the field in"
			rules={[{ required: true, message: "Please select a table" }]}
			validateStatus={field.tableStatus}
			help={field.tableStatusMessage}
		>
			<Select>
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
