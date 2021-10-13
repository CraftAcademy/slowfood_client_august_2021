import React, { useState, useEffect } from "react";
import { Segment, Grid, Menu, Container } from "semantic-ui-react";
import MenuItem from "./MenuItem";
import CartView from "../components/CartView";
import axios from "axios";
import _ from "lodash";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("starters");
  const [flashMessage, setFlashMessage] = useState();
  const [cart, setCart] = useState();
  const [viewCart, setViewCart] = useState();

  useEffect(() => {
    axios
      .get("https://desolate-beach-43985.herokuapp.com/api/products")
      .then((response) => {
        setMenuItems(response.data.products);
      });
  }, []);

  const addToCart = async (itemId) => {
    let flashMessage;
    const apiUrl = "https://desolate-beach-43985.herokuapp.com/api";
    try {
      const response = await axios({
        method: cart ? "PUT" : "POST",
        url: cart ? `${apiUrl}/carts/${cart.id}` : `${apiUrl}/carts`,
        data: { product_id: itemId },
        headers: JSON.parse(localStorage.getItem("J-tockAuth-Storage")),
      });
      const responseMessage = response.data.message;
      const product = response.data.cart.products.id === itemId;
      flashMessage = responseMessage.replace(`This product ${product.name}`);
      setCart(response.data.cart);
    } catch (error) {
      debugger;
      flashMessage = error.response.data.message;
    } finally {
      setFlashMessage(flashMessage);
    }
  };

  const itemsInCategories = menuItems.filter(
    (item) => item.category === activeCategory
  );

  let menuList = itemsInCategories.map((item) => {
    return <MenuItem key={item.id} item={item} addToCart={addToCart} />;
  });

  const neatCategories = _.startCase(activeCategory);

  return (
    <Container>
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name="Starters"
              data-cy="starter-tab"
              active={activeCategory === "starters"}
              onClick={() => setActiveCategory("starters")}
            />
            <Menu.Item
              name="Main Courses"
              data-cy="main-courses-tab"
              active={activeCategory === "main-menu"}
              onClick={() => setActiveCategory("main_courses")}
            />
            <Menu.Item
              name="Desserts"
              data-cy="desserts-tab"
              active={activeCategory === "desserts"}
              onClick={() => setActiveCategory("desserts")}
            />
            <Menu.Item
              name="Sides"
              data-cy="sides-tab"
              active={activeCategory === "sides"}
              onClick={() => setActiveCategory("sides")}
            />
            <Menu.Item
              name="Drinks"
              data-cy="drinks-tab"
              active={activeCategory === "drinks"}
              onClick={() => setActiveCategory("drinks")}
            />
            {cart && (
              <Menu.Item
                name={viewCart ? "Close Cart" : "View cart"}
                data-cy="view-cart"
                onClick={() => setViewCart(!viewCart)}
              />
            )}
          </Menu>
        </Grid.Column>
        <Grid.Column width={12}>
          {viewCart ? (
            <>
              <CartView cart={cart} />
            </>
          ) : (
            <>
              <h1>{neatCategories}</h1>
              <Segment data-cy="menu-section">{menuList}</Segment>
            </>
          )}
        </Grid.Column>
      </Grid>
      {flashMessage && <h3 data-cy="flash-message">{flashMessage}</h3>}
    </Container>
  );
};

export default MenuPage;
