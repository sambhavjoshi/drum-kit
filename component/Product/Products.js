import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { Rating } from "@material-ui/lab";

const categories = [
  "All",
  "startergy games",
  "simulation games",
  "racing games",
  "rpg Games",
  "adventure games",
  "shooting games",
  "survival games",
  "sports games",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 500]);
  const [category, setCategory] = useState("All");
  const [ratings, setRatings] = useState(0);

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);
  console.log(products);
  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    // e apne aap kaise aaya?
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "blue",
    size: window.innerWidth < 600 ? 20 : 25,
    value: ratings,
    isHalf: true,
  };

  const applyFilter = () => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <p className="filters">Price</p>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={500}
            />
            <p className="filters">Categories</p>
            <ul className="categoryBox">
              {categories.map((cate) => (
                <li
                  className={
                    category === cate
                      ? "category-link-selected"
                      : "category-link"
                  }
                  key={cate}
                  onClick={() => setCategory(cate)}
                >
                  {cate}
                </li>
              ))}
            </ul>
            <fieldset className="fieldSet">
              <p className="filters">Ratings Above</p>
              <Rating
                onChange={(e) => setRatings(e.target.value)}
                value={ratings}
              />
            </fieldset>
            <button className="applyButton" onClick={applyFilter}>
              Apply
            </button>
          </div>

          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
