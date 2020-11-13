import {
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { Link as LinkRoute } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Board from "./Board";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "5px",
  },
}));

const Boards = ({ match }) => {
  const classes = useStyles();
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/boards");
        setBoards(res.data);
      } catch (err) {}
    };

    fetchData();
  }, []);

  return (
    <Switch>
      <Route path={`${match.path}/:id`} component={Board} />
      <Route
        exact
        path={match.path}
        render={() => (
          <Grid container className={classes.container} spacing={1}>
            {boards &&
              boards.map((board) => (
                <Grid item key={board._id} xs={12} sm={3}>
                  <Card className={classes.root}>
                    <LinkRoute
                      to={`/boards/${board._id}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="140"
                          image="https://picsum.photos/300"
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {board.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {board.context}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </LinkRoute>
                    <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        )}
      />
    </Switch>
  );
};

export default Boards;
