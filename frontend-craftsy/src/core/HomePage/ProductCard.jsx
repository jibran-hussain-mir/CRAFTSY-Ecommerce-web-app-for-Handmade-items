import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

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
              sx={{
                fontWeight: "Bold",
                fontSize: "1.2em",
                fontFamily: "Roboto",
              }}
            >
              {name}
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle1"
              color="text.secondary"
              sx={{ fontFamily: "Roboto" }}
            >
              {description}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              color="primary"
              sx={{ fontWeight: "Bold", marginTop: "1em" }}
            >
              Rs. {price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            sx={{ height: "4em", paddingLeft: "1em", paddingRight: "1em" }}
          >
            <p
              style={{
                fontSize: "1.2em",
                fontWeight: "bold",
                marginLeft: "6px",
              }}
            >
              Buy
            </p>
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            sx={{ height: "4em", paddingLeft: "1em", paddingRight: "1em" }}
          >
            <ShoppingBagOutlinedIcon />
            <p
              style={{
                fontSize: "1.2em",
                fontWeight: "bold",
                marginLeft: "6px",
              }}
            >
              Add to Cart
            </p>
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
