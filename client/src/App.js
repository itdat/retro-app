import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import clsx from "clsx";

import NavBar from "./components/layout/NavBar";
import LeftDrawer from "./components/layout/LeftDrawer";
import CardColumn from "./components/cards/CardColumn";

const useStyles = makeStyles((theme) => ({
  columnTitle: {
    marginTop: "0.2rem",
    padding: "2rem",
  },
  wentWell: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.text.primary,
  },
  toImprove: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.text.primary,
  },
  actionItems: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.text.primary,
  },
}));

export default function App() {
  const classes = useStyles();

  // Card column Ids
  const columns = [
    { id: "5f989c840bbf02e009d9ae7e" },
    { id: "5f989cdd0bbf02e009d9ae7f" },
    { id: "5f989d140bbf02e009d9ae80" },
  ];

  // Drawer state
  const [open, setOpen] = useState(false);

  // Card columns state
  const [wentWell, setWentWell] = useState([]);
  const [toImprove, setToImprove] = useState([]);
  const [actionItems, setActionItems] = useState([]);

  // Fetch data when components did mount
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
            <CardColumn
              title="Went Well"
              cards={wentWell}
              classes={clsx(classes.columnTitle, classes.wentWell)}
            />
            <CardColumn
              title="To Improve"
              cards={toImprove}
              classes={clsx(classes.columnTitle, classes.toImprove)}
            />
            <CardColumn
              title="Action Items"
              cards={actionItems}
              classes={clsx(classes.columnTitle, classes.actionItems)}
            />
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
