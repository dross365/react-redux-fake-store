import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { getProducts } from "../store/productSlice";
import Alert from "react-bootstrap/Alert";
import StatusCode from "../utils/StatusCode";
import { toast } from "react-toastify";

const Products = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (status === StatusCode.LOADING) {
    return <p className="text-center">Loading...</p>;
  }

  if (status === StatusCode.ERROR) {
    return (
      <Alert key="danger" variant="danger" className="text-center">
        Something went wrong!!!
      </Alert>
    );
  }

  const handleSubmit = (product) => {
    //dispatch an add action
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  const cards = products.map((product) => (
    <div
      className="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
      key={product.id}
    >
      <Card
        style={{ width: "18rem", height: "100%" }}
        className="h-100 d-flex flex-column justify-content-between"
      >
        <div className="text-center">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ width: "100px", height: "130px", padding: "10px" }}
          />
          <Card.Body style={{ minHeight: "150px" }}>
            <Card.Title
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product.title}
            </Card.Title>
            <Card.Text>${product.price}</Card.Text>
          </Card.Body>
          <Card.Footer style={{ background: "white" }}>
            <Button variant="primary" onClick={() => handleSubmit(product)}>
              Add To Cart
            </Button>
          </Card.Footer>
        </div>
      </Card>
    </div>
  ));

  return (
    <>
      <div>
        <h1 className="text-center" style={{ padding: "20px" }}>
          Products Dashboard
        </h1>
        <div className="row gx-4 gy-5">{cards}</div>
      </div>
    </>
  );
};

export default Products;
