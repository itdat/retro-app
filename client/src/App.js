import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import Navbar from "./components/layout/Navbar";

import { useState, useEffect } from "react";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    margin: "1rem",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function App() {
  const classes = useStyles();

  const columns = [
    { id: "5f989c840bbf02e009d9ae7e", name: "Went Well", color: "#009688" },
    { id: "5f989cdd0bbf02e009d9ae7f", name: "To Improve", color: "#e91e63" },
    { id: "5f989d140bbf02e009d9ae80", name: "Action Items", color: "#9c27b0" },
  ];

  const [wentWell, setWentWell] = useState([]);
  const [toImprove, setToImprove] = useState([]);
  const [actionItems, setActionItems] = useState([]);

  useEffect(async () => {
    const res1 = await axios.get(`/api/cards?columnId=${columns[0].id}`);
    setWentWell(res1.data);
    const res2 = await axios.get(`/api/cards?columnId=${columns[1].id}`);
    setToImprove(res2.data);
    const res3 = await axios.get(`/api/cards?columnId=${columns[2].id}`);
    setActionItems(res3.data);

    console.log(wentWell);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />

      <main>
        <Container maxWidth="md">
          <Grid container spacing={1}>
            {/* Went Well */}
            <Grid item xs={4} container wrap="nowrap" direction="column">
              <Box bgcolor="success.main" p={3}>
                <Typography variant="h6" align="center" color="textPrimary">
                  {columns[0].name}
                </Typography>
              </Box>
              {wentWell.map((card) => {
                return (
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.content}
                      </Typography>
                      <Typography>
                        This is a media card. You can use this section to
                        describe the content.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
            </Grid>

            {/* To Improve */}
            <Grid item xs={4} container wrap="nowrap" direction="column">
              <Box bgcolor="info.main" p={3}>
                <Typography variant="h6" align="center" color="textPrimary">
                  {columns[1].name}
                </Typography>
              </Box>
              {toImprove.map((card) => {
                return (
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.content}
                      </Typography>
                      <Typography>
                        This is a media card. You can use this section to
                        describe the content.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
            </Grid>

            {/* To Improve */}
            <Grid item xs={4} container wrap="nowrap" direction="column">
              <Box bgcolor="warning.main" p={3}>
                <Typography variant="h6" align="center" color="textPrimary">
                  {columns[2].name}
                </Typography>
              </Box>
              {actionItems.map((card) => {
                return (
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.content}
                      </Typography>
                      <Typography>
                        This is a media card. You can use this section to
                        describe the content.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
