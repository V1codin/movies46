import React from "react";

import CollectionCard from "../../../../modules/movieCard/components/singleCollectionCard";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: 15,
    margin: "0 10px 0 0",
    maxHeight: 530,
    width: 445,
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "auto",
    borderRight: "1px solid grey",
    backgroundColor: "inherit",
  },
  gridList: {
    justifyContent: "space-between",
  },
}));

function Collection(props) {
  const { movies, collectionName, removeMovieFromList } = props;
  const classes = useStyles();

  const collection = collectionName.toUpperCase();

  return (
    <div className={classes.root}>
      <GridList cellHeight={370} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">
            <p>{collection}</p>
          </ListSubheader>
        </GridListTile>
        {movies.map((item, ind) => (
          <CollectionCard
            movie={item}
            key={ind * Math.random() + 1}
            collectionName={collectionName}
            removeMovie={removeMovieFromList}
          />
        ))}
      </GridList>
    </div>
  );
}

export default Collection;
