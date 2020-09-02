import React from "react";
import { Spin, Typography } from "antd";
import CenteredContent from "./CenteredContent";

export default function Loading() {
	return (
		<CenteredContent>
			<Spin />
			<Typography.Text>Loading english language pack</Typography.Text>
		</CenteredContent>
	);
}
