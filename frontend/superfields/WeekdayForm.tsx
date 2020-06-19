import loglevel from "loglevel";
const log = loglevel.getLogger("Country");
log.setLevel("debug");

import React from "react";

import { observer } from "mobx-react-lite";

import { Form, Select } from "antd";
const { Option } = Select;

import { StyledFormItem, StyledSubmitButton } from "../StyledComponents";

import viewModel, { SuperfieldType } from "../ViewModel";
import CountryField from "../models/CountryField";
import BoundSelect from "../components/BoundSelect";
import TableSelector from "../components/TableSelector";
import BoundInput from "../components/BoundInput";
import languagePackStore from "../models/LanguagePackStore";
import Superfield from "../models/Superfield";
import SuperfieldForm from "./SuperfieldForm";

const WeekdayForm = observer(({ field }: { field: Superfield }) => {
	log.debug("Country.render");

	return <SuperfieldForm field={field} />;
});

export default WeekdayForm;
