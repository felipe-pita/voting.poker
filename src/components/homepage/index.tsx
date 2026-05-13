"use client";

import { Button, styled } from "@mui/material";
import { Box } from "@mui/system";
import BasePage from "../base-page";
import { NavBar } from "../NavBar";
import { LandingGrahic } from "../LandingGraphic";

import { toNewRoom } from "@/helpers/link";

const LandingGraphicSection = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  paddingTop: 128,
  paddingLeft: 40,
  paddingRight: 40,
  justifyContent: "center",
  alignItems: "center",
}));

const CallToActionsContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "32%",
  bottom: theme.spacing(5),
  right: theme.spacing(-18),
  display: "flex",
  flexDirection: "column",

  [theme.breakpoints.down("lg")]: {
    position: "relative",
    left: 0,
    bottom: 0,
    width: "100%",
    alignItems: "center",
    gap: theme.spacing(2),
  },

  [theme.breakpoints.up("md")]: {
    gap: theme.spacing(2),
  },
}));

const CallToActionText = styled(Box)(({ theme }) => ({
  color: theme.palette.common.white,
  textAlign: "right",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "24px",
  width: 300,

  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },
}));

const CallToActionLink = styled("a")(({ theme }) => ({
  color: "#43BA7F !important",
  textDecoration: "none",
  whiteSpace: "nowrap",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.35)",
  color: theme.palette.common.white,
  minWidth: 200,

  "&:hover, &:focus": {
    color: theme.palette.common.black,
  },
}));

const Home = () => {
  return (
    <BasePage>
      <NavBar />
      <LandingGraphicSection>
        <LandingGrahic>
          <CallToActionsContainer>
            <CallToActionText>
              Planning Poker é um projeto{" "}
              <CallToActionLink
                target="_blank"
                href="https://github.com/jeffersonmourak/voting.poker"
              >
                {"{open source}"}
              </CallToActionLink>{" "}
              que ajuda times a planejar suas sprints rápido e de graça
            </CallToActionText>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"row-reverse"}
            >
              <ActionButton
                onClick={toNewRoom}
                variant="contained"
                color="secondary"
              >
                Entrar em uma sala
              </ActionButton>
            </Box>
          </CallToActionsContainer>
        </LandingGrahic>
      </LandingGraphicSection>
    </BasePage>
  );
};

export default Home;
