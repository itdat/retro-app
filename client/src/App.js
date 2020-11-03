import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import NavBar from "./components/layout/NavBar";
import LeftDrawer from "./components/layout/LeftDrawer";
import RetroCard from "./components/cards/RetroCard";

export default function App() {
  const columns = [
    { id: "5f989c840bbf02e009d9ae7e", name: "Went Well", color: "#009688" },
    { id: "5f989cdd0bbf02e009d9ae7f", name: "To Improve", color: "#e91e63" },
    { id: "5f989d140bbf02e009d9ae80", name: "Action Items", color: "#9c27b0" },
  ];
  const [open, setOpen] = useState(false);

  const [wentWell, setWentWell] = useState([]);
  const [toImprove, setToImprove] = useState([]);
  const [actionItems, setActionItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const wentWellRes = await axios.get(
        `/api/cards?columnId=${columns[0].id}`
      );
      setWentWell(wentWellRes.data);
      const toImproveRes = await axios.get(
        `/api/cards?columnId=${columns[1].id}`
      );
      setToImprove(toImproveRes.data);
      const actionItemsRes = await axios.get(
        `/api/cards?columnId=${columns[2].id}`
      );
      setActionItems(actionItemsRes.data);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar openDrawer={() => setOpen(!open)} />
      <main>
        <LeftDrawer open={open} setOpen={setOpen} />
        <Container maxWidth="md">
          <Grid container spacing={1}>
            {/* Went Well */}
            <Grid
              item
              xs={12}
              md={4}
              container
              wrap="nowrap"
              direction="column"
            >
              <Box bgcolor="success.main" p={3}>
                <Typography variant="h6" align="center" color="textPrimary">
                  {columns[0].name}
                </Typography>
              </Box>
              {wentWell.map((card) => {
                return <RetroCard card={card} />;
              })}
            </Grid>
            {/* To Improve */}
            <Grid
              item
              xs={12}
              md={4}
              container
              wrap="nowrap"
              direction="column"
            >
              <Box bgcolor="info.main" p={3}>
                <Typography variant="h6" align="center" color="textPrimary">
                  {columns[1].name}
                </Typography>
              </Box>
              {toImprove.map((card) => {
                return <RetroCard card={card} />;
              })}
            </Grid>
            {/* Action Items */}
            <Grid
              item
              xs={12}
              md={4}
              container
              wrap="nowrap"
              direction="column"
            >
              <Box bgcolor="warning.main" p={3}>
                <Typography variant="h6" align="center" color="textPrimary">
                  {columns[2].name}
                </Typography>
              </Box>
              {actionItems.map((card) => {
                return <RetroCard card={card} />;
              })}
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
