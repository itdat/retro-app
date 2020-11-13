import React, { useState } from "react";
import { Link } from "react-router-dom";

// import { makeStyles } from "@material-ui/styles";
import {
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
} from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({}));

const BoardCard = ({ board }) => {
  // Using styles
  //   const classes = useStyles();

  // Use states
  const [edit, setEdit] = useState(false);

  const handleEdit = (e) => {
    setEdit(!edit);
  };

  const [value, setValue] = useState({
    name: board.name,
    context: board.context,
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <Grid item key={board._id} xs={12} sm={3}>
      <Card>
        {edit ? (
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="https://picsum.photos/300"
              title="Contemplative Reptile"
            />
            <CardContent>
              <TextField
                name="name"
                inputProps={{ style: { fontSize: "1.5rem" } }}
                value={value.name}
                label={value.name ? "" : "Board name"}
                autoFocus
                fullWidth
                onChange={handleChange}
              />
              <TextField
                name="context"
                value={value.context}
                label={value.context ? "" : "Board context"}
                fullWidth
                multiline
                onChange={handleChange}
              />
            </CardContent>
          </CardActionArea>
        ) : (
          <Link
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
                  {value.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {value.context}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
        )}

        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary" onClick={handleEdit}>
            {edit ? "Save" : "Edit"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BoardCard;
