import { useRoom } from "@/hooks/useRoom";
import type { AnyPoolState } from "@/lib/core";
import { VotingStates } from "@/lib/machines/voting/states";
import { Box, styled } from "@mui/material";

import type React from "react";
import Card from "../Cards/Card";

const Root = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	borderRadius: theme.spacing(2),
	padding: theme.spacing(4, 6),
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flex: 1,
}));

const Cards = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(2),
	alignItems: "center",
	flex: 1,
}));

const CardsRow = styled(Box)(({ theme }) => ({
	display: "flex",
	flexWrap: "wrap",
	gap: theme.spacing(2),
	justifyContent: "center",
}));

interface PoolStateComponentProps {
	state: AnyPoolState;
}

const NUMERIC_CARDS = ["1", "2", "3", "5", "8", "13"];
const SPECIAL_CARDS = ["épica", "?", "null"];

const PoolStateComponent: React.FC<PoolStateComponentProps> = ({ state }) => {
	const room = useRoom();

	if (
		room.state.state !== VotingStates.Pool &&
		room.state.state !== VotingStates.PoolVote
	) {
		return null;
	}

	const userVote = room.state.votes[room.state.currentUser.id];
	const vote = room.state.vote;

	return (
		<Root>
			<Cards>
				<CardsRow>
					{NUMERIC_CARDS.map((value) => (
						<Card
							key={value}
							value={value}
							onClick={() => vote(value)}
							selected={value === userVote}
						/>
					))}
				</CardsRow>
				<CardsRow>
					{SPECIAL_CARDS.map((value) => (
						<Card
							key={value}
							value={value}
							onClick={() => vote(value)}
							selected={value === userVote}
						/>
					))}
				</CardsRow>
			</Cards>
		</Root>
	);
};

export default PoolStateComponent;
