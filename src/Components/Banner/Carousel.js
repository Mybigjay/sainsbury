import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { SainsburyApi } from "../../config/api";
import { SainsburyState } from "../../SainsburyContext";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
    padding: "1rem",
  },
}));
const Carousel = () => {
  const [cartItems, setCartItems] = useState([]);
  const classes = useStyles();

  const { products } = SainsburyState();

  const fetchSainsburyApi = async () => {
    const { data } = await axios.get(SainsburyApi(products));
    //console.log(data);
    setCartItems(data);
  };

  useEffect(() => {
    fetchSainsburyApi();
  }, [products]);

  const items = cartItems.map((item) => {
    return (
      <Link className={classes.carouselItem} to={`/item/${item.productId}`}>
        <img
          src={item?.image}
          alt={item.name}
          height="100"
          style={{ marginBottom: 10 }}
        />
        <span>
          {item?.title}
          &nbsp;
          <span
            style={{
              color: "rgb(14, 203, 129)",
              fontSize: 22,
              fontWeight: 500,
            }}
          >
            £{item?.price}
          </span>
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
