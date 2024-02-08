import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import {
  clearErrors,
  getProduct
} from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Typewriter from "typewriter-effect";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products} = useSelector(
    (state) => state.products
  );

  const optionsTypewriter = {
      loop:true,
      delay:80,
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Ecommerce" />
          <div className="banner">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("<p>Origins' hub of Video Games</p>")
                  .pauseFor(2000)
                  .deleteAll()
                  .typeString(
                    "<p>Find Best of Video Games from all over the world here</p>"
                  )
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString(
                    "<p>Best discount offered for every product</p>"
                  )
                  .pauseFor(3000)
                  .deleteAll()
                  .start();
              }}
              options={optionsTypewriter}
            />

            <a href="#container">
              <button>
                Scroll <CgMouse size={13} style={{ color: "purple" }} />
              </button>
            </a>
          </div>
          <div className="bottomContainer">
            <h2 className="homeHeading">Featured Products</h2>
            <div className="container" id="container">
              {products &&
                products.map((product) => <ProductCard product={product} />)}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
