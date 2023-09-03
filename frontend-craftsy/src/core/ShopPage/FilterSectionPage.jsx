import React, { useState, useEffect } from "react";
import SideBar from "./FilterSection/Sidebar/SideBar";
import Products from "./FilterSection/Products/Products";
import Recommended from "./FilterSection/Recommend/Recommended";
import "./FilterSectionPage.css";
import products from "./FilterSection/Data";
import Card from "./FilterSection/Components/Card";
import { getFilteredProducts, getProducts } from "../apiCore";
import data from "./FilterSection/Data";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../Header";

function FilterSectionPage(props) {
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([]);
  const [checked, setChecked] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: {
      category: [],
      price: [],
    },
  });

  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(8);
  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  //InputFilter
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryId = searchParams.get("categoryId");
    console.log(`vvvvvvvvv ${JSON.stringify(categoryId)}`);

    if (categoryId) {
      setSelectedCategory(categoryId); // Set the selected categor
      setChecked([categoryId]);
      loadFilteredResults({
        ...myFilters.filters,
        category: categoryId,
      });
    }
  }, []);
  const handleCategoryChange = (c) => () => {
    const newCheckedCategoryId = [...checked];
    console.log(newCheckedCategoryId);

    if (newCheckedCategoryId.includes(c)) {
      // Remove the category if already checked
      newCheckedCategoryId.splice(newCheckedCategoryId.indexOf(c), 1);
    } else {
      // Add the category if not checked
      newCheckedCategoryId.push(c);
    }
    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    setSelectedCategory(newCheckedCategoryId);
    loadFilteredResults({
      ...myFilters.filters,
      category: newCheckedCategoryId,
    });
  };

  const handleFilters = (filters, filterBy) => {
    console.log(`kkkkkkk ${filters}`);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    setMyFilters(newFilters);
  };
  const handlePriceChange = (price) => {
    console.log(`jjj`, price);
    setPriceRange(price); // Set the selected price range to the state
    handleFilters(price, "price");
    loadFilteredResults(myFilters.filters);
  };

  //RadioFilters
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  //btnsFilters
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  //filteredData
  // function filteredData() {
  //   if (filteredResults && filteredResults.data) {
  //     return filteredResults.data.map((product, i) => (
  //       <Card
  //         key={i}
  //         img={product.photo}
  //         title={product.name}
  //         star="⭐"
  //         price={product.price}
  //         productId={product._id}
  //       />
  //     ));
  //   } else if (filteredResults && filteredResults.length === 0) {
  // return products.map((product, i) => {
  //   console.log(product);
  //   return (
  //     <Card
  //       key={i}
  //       img={product.photo}
  //       title={product.name}
  //       star={4}
  //       price={product.price}
  //       productId={product._id}
  //       product={product}
  //     />
  //   );
  // });
  //   } else {
  //     return <p>Loading...</p>;
  //   }
  // }
  function filteredData() {
    if (filteredResults && filteredResults.data) {
      return filteredResults.data.map((product, i) => (
        <Card
          key={i}
          img={product.photo}
          title={product.name}
          star="⭐"
          price={product.price}
          productId={product._id}
          product={product}
        />
      ));
    } else {
      return products.map((product, i) => {
        console.log(product);
        return (
          <Card
            key={i}
            img={product.photo}
            title={product.name}
            star={4}
            price={product.price}
            productId={product._id}
            product={product}
          />
        );
      });
    }
  }

  const result = filteredData();
  const loadFilteredResults = async (newFilters) => {
    console.log("New filters:", newFilters);
    try {
      const data = await getFilteredProducts(skip, limit, newFilters);
      setFilteredResults(data);
    } catch (e) {
      setError(e);
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/products?limit=12`
      );
      console.log(response);
      const { products } = response.data;
      console.log(products);
      setProducts(products);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    // This will run every time selectedCategory changes

    if (selectedCategory) {
      handleFilters(selectedCategory, "category");
    }
  }, [selectedCategory]);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Header />
      {/* {JSON.stringify(myFilters)}
      <h1>Filtered Results</h1>*/}
      {/* // <h1>{JSON.stringify(products)}</h1> */}
      <div className="fspage-contianer">
        <div className="rd">
          <SideBar
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            checked={checked}
            handlePriceChange={handlePriceChange}
          />
        </div>
        <div className="filter-flex">
          {/* <Recommended className="fixx" handleClick={handleClick} /> */}
          <Products result={result} />
        </div>
      </div>
    </>
  );
}

export default FilterSectionPage;
