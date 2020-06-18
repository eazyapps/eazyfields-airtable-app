import log from "loglevel";
log.setLevel("debug");

import React from "react";

import { observer } from "mobx-react-lite";

import { Form, Select } from "antd";
const { Option } = Select;

import { StyledFormItem, StyledSubmitButton } from "../StyledComponents";

import store from "../models/LanguagePackStore";
import viewModel, { SuperfieldType } from "../ViewModel";
import languagePackStore from "../models/LanguagePackStore";
import CountryField from "../models/CountryField";
import Loading from "../LoadingEnglish";
import BoundSelect from "../components/BoundSelect";
import TableSelector from "../components/TableSelector";
import BoundInput from "../components/BoundInput";
import Superfield from "../models/Superfield";

const Country = observer(() => {
	log.debug("Country.render");

	const [form] = Form.useForm();

	const field: Superfield = viewModel.getField(
		SuperfieldType.country
	) as CountryField;

	form.setFieldsValue({
		table: field.table ? field.table.id : null,
		name: field.name,
		language: field.language,
	});

	const onFinish = (values) => {
		log.debug("Country.onFinish, values:", values);
		field.create(values);
	};

	const onFinishFailed = (errorInfo) => {
		log.debug("Country.onFinishFailed, errorInfo:", errorInfo);
	};

	if (languagePackStore.supportedLanguages.length == 0) {
		return <Loading />;
	}

	const validateUniqueName = (rule, value) => {
		log.debug("Country.validateUniqueName, value:", value);
		if (!value || !field.table) {
			return Promise.resolve();
		}
		const existingField = field.table.getFieldByNameIfExists(value);
		if (existingField) {
			return Promise.reject(`The ${value} field already exists`);
		}
		return Promise.resolve();
	};

	return (
		<Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
			{/* <StyledFormItem
				label="Table to create the field in"
				rules={[{ required: true, message: "Please select a table" }]}
			> */}
			<TableSelector field={field} />
			<BoundInput
				name="name"
				rules={[
					{
						required: true,
						message: "Please enter a field name",
					},
					{
						validator: validateUniqueName,
					},
				]}
				label="Unique name for field"
				model={field}
				prop="name"
			/>
			{/* </StyledFormItem> */}
			<BoundSelect
				name="language"
				rules={[{ required: true, message: "Please select a language" }]}
				label="Language for field values"
				model={field}
				prop="language"
				options={languagePackStore.supportedLanguages}
			/>
			<StyledFormItem label="Preview of field values">
				{field.countries.length > 0 ? (
					<Select>
						{field.countries.map((country) => (
							<Option key={country.value} value={country.value}>
								{country.name}
							</Option>
						))}
					</Select>
				) : (
					<Select placeholder="Loading values in selected language" />
				)}
			</StyledFormItem>
			<Form.Item noStyle>
				<StyledSubmitButton
					id="submit"
					type="primary"
					htmlType="submit"
					loading={field.isCreating}
					// justified={
					// 	buttonAlignment === Alignment.justified ? "true" : undefined
					// }
				>
					Create field
				</StyledSubmitButton>
			</Form.Item>
		</Form>
	);
});

export default Country;
