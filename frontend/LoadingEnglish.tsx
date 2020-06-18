import React from "react";
import { Spin, Typography } from "antd";

export default function Loading() {
	return (
		<main
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "calc(100vh - 60px)",
			}}
		>
			<Spin />
			<Typography.Text>Loading english language pack</Typography.Text>
		</main>
	);
}
