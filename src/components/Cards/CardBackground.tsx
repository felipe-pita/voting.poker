import { cx } from "@emotion/css";
import {
	Box,
	type Theme,
	Typography,
	alpha,
	darken,
	useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FloatValue } from "./FloatValue";
import { toBackgroundColor } from "./helpers/toBackgroundColor";
import { useMemo, useRef } from "react";

const useStyles = (props: {
	height: number;
	background: string;
	isImage?: boolean;
}) => {
	const theme = useTheme();
	const hook = useRef(
		makeStyles<
			Theme,
			{ height: number; background: string; isImage?: boolean }
		>(
			(theme) => ({
				root: ({ height }) => ({
					position: "absolute",
					width: 180,
					height,
					bottom: 0,
					left: 0,
					overflow: "hidden",
					transition: theme.transitions.create("height"),
				}),
				background: ({ background, isImage }) => ({
					position: "absolute",
					bottom: 0,
					left: 0,
					width: 180,
					height: 250,
					background: isImage ? "rgba(0, 0, 0, 0)" : background,
					transition: theme.transitions.create("height"),
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}),
				backgroundImage: ({ background }) => ({
					backgroundImage: `url(${background})`,
					width: 180,
					height: 250,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}),
				value: (props) => ({
					backgroundColor: darken(
						toBackgroundColor(
							props,
							alpha(theme.palette.background.paper, 0.9),
						),
						0.6,
					),
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
				}),
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
	height: number;
	background: string;
	isImage?: boolean;
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

const useHoverShadow = (background: string, isImage?: boolean) => {
	if (isImage) {
		return "0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)";
	}
	const shadowColor = darken(background, 0.3);
	return `0px 7px 8px -4px ${alpha(shadowColor, 0.2)}, 0px 12px 17px 2px ${alpha(shadowColor, 0.14)}, 0px 5px 22px 4px ${alpha(shadowColor, 0.12)};`;
};

export const CardBackground = ({
	hover,
	height,
	background,
	isImage,
	value,
}: CardBaseProps) => {
	const classes = useStyles({ height, background, isImage });

	const shadowColor = useHoverShadow(background, isImage);
	const cornerDisplay = CORNER_DISPLAY[value] ?? value;

	return (
		<Box className={classes.root}>
			{isImage && background !== "transparent" && (
				<Box className={classes.backgroundImage} />
			)}
			<Box className={classes.background}>
				<FloatValue
					value={value}
					displayValue={cornerDisplay}
					background={background}
					isImage={isImage}
					top
					left
				/>
				<FloatValue
					value={value}
					displayValue={cornerDisplay}
					background={background}
					isImage={isImage}
					top
					right
				/>
				<Box
					sx={{
						boxShadow: hover ? shadowColor : 0,
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
					background={background}
					isImage={isImage}
					bottom
					left
				/>
				<FloatValue
					value={value}
					displayValue={cornerDisplay}
					background={background}
					isImage={isImage}
					bottom
					right
				/>
			</Box>
		</Box>
	);
};
