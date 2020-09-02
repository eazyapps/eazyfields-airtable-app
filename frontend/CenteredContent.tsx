import React from "react";

export default function CenteredContent({ children }) {
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
			{children}
		</main>
	);
}
