import Layout from "./layout";
import { Grid, Link } from "@mui/material";
import type { ReactNode } from "react";

interface BasePageProps {
	children: ReactNode;
}

const BasePage = ({ children }: BasePageProps) => {
	return (
		<Layout>
			<Grid
				container
				direction="column"
				sx={{
					width: "100%",
					minHeight: "100vh",
					flexWrap: "nowrap",
				}}
			>
				<Grid
					component="div"
					sx={{
						flex: 1,
					}}
				>
					{children}
				</Grid>

				<Grid
					component="div"
					sx={{
						position: "fixed",
						bottom: 0,
						left: 0,
						right: 0,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: 32,
						fontSize: 12,
						lineHeight: 1,
						overflow: "hidden",
						backdropFilter: "blur(8px)",
						backgroundColor: "rgba(0, 0, 0, 0.35)",
						color: "#979797",
						zIndex: 1000,
					}}
				>
					feito com&nbsp;
					<span
						style={{
							color: "red",
							animation: "heart-beat 1s ease infinite",
						}}
					>
						♥︎
					</span>
					&nbsp;por&nbsp;
					<Link
						href="https://github.com/jeffersonmourak"
						target="_blank"
						sx={{
							color: "#979797",
							textDecoration: "underline !important",
						}}
					>
						jeffersonmourak
					</Link>
					&nbsp;e forkado com&nbsp;
					<span
						style={{
							color: "red",
							animation: "heart-beat 1s ease infinite",
						}}
					>
						♥︎
					</span>
					&nbsp;também
				</Grid>
			</Grid>
		</Layout>
	);
};

export default BasePage;
