import { cx } from "@emotion/css";
import {
	Box,
	type Theme,
	Typography,
	alpha,
	lighten,
	useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FloatValue } from "./FloatValue";
import { useRef } from "react";

const useStyles = (props: { hover: boolean }) => {
	const theme = useTheme();
	const hook = useRef(
		makeStyles<Theme, { hover: boolean }>(
			(theme) => ({
				root: {
					position: "absolute",
					width: 180,
					height: 250,
					bottom: 0,
					left: 0,
					overflow: "hidden",
				},
				background: {
					position: "absolute",
					bottom: 0,
					left: 0,
					width: 180,
					height: 250,
					background: lighten(theme.palette.primary.main, 0.1),
					backgroundSize: "cover",
					backgroundPosition: "center",
					transition: theme.transitions.create("height"),
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				},
				value: {
					backgroundColor: alpha(theme.palette.common.white, 0.3),
					minWidth: theme.spacing(10),
					minHeight: theme.spacing(10),
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: theme.shape.borderRadius,
					transition: theme.transitions.create([
						"background-color",
						"color",
						"box-shadow",
					]),
					zIndex: 1,
					color: "transparent",
					transform: "rotate(45deg)",
					"&::before": {
						content: "attr(data-value)",
						position: "absolute",
						...theme.typography.h4,
						color: theme.palette.text.primary,
						transform: "rotate(-45deg)",
					},
				},
				floatValue: {
					position: "absolute",
					fontFamily: theme.typography.fontFamily,
				},

				top: {
					top: theme.spacing(2),
				},
				bottom: {
					bottom: theme.spacing(2),
					transform: "rotate(180deg)",
				},
				left: {
					left: theme.spacing(2),
				},
				right: {
					right: theme.spacing(2),
				},
			}),
			{ defaultTheme: theme },
		),
	).current;

	return hook(props);
};

interface CardBaseProps {
	value: string;
	hover: boolean;
}

const CORNER_DISPLAY: Record<string, string> = {
	"épica": "e",
	"?": "?",
	null: "",
};

const CENTER_FONT_SIZE: Record<string, string> = {
	"épica": "1rem",
	null: "1rem",
	"?": "1rem",
};

export const CardForeground = ({ value, hover }: CardBaseProps) => {
	const theme = useTheme();
	const { palette } = theme;

	const cornerDisplay = CORNER_DISPLAY[value] ?? value;

	const classes = useStyles({ hover });
	return (
		<Box className={classes.root}>
			<Box className={classes.background}>
				<FloatValue
					value={value}
					displayValue={cornerDisplay}
					background={lighten(palette.primary.main, 0.1)}
					top
					left
				/>
				<FloatValue
					value={value}
					displayValue={cornerDisplay}
					background={lighten(palette.primary.main, 0.1)}
					top
					right
				/>
				<Box
					sx={{
						boxShadow: hover ? 12 : 0,
						...(CENTER_FONT_SIZE[value] && {
							"&::before": {
								fontSize: `${CENTER_FONT_SIZE[value]} !important`,
							},
						}),
					}}
					data-value={value}
					className={cx(classes.value)}
				>
					<Typography
						variant="h4"
						sx={CENTER_FONT_SIZE[value] ? { fontSize: CENTER_FONT_SIZE[value] } : undefined}
					>
						{value}
					</Typography>
				</Box>
				<FloatValue
					value={value}
					displayValue={cornerDisplay}
					background={lighten(palette.primary.main, 0.1)}
					bottom
					left
				/>
				<FloatValue
					value={value}
					displayValue={cornerDisplay}
					background={lighten(palette.primary.main, 0.1)}
					bottom
					right
				/>
			</Box>
		</Box>
	);
};
