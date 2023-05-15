import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";

const ProductCard = ({ name, description, price, productId }) => {
  return (
    <>
      <Card sx={{ maxWidth: 210 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image={`http://localhost:8000/api/product/photo/${productId}`}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontWeight: "Bold" }}
            >
              {name}
            </Typography>
            <Typography gutterBottom variant="subtitle1" color="text.secondary">
              {description}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              color="primary"
              sx={{ fontWeight: "Bold" }}
            >
              Rs. {price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button size="medium" variant="contained" color="primary">
            Buy
          </Button>
          <Button size="medium" variant="contained" color="primary">
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
