import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { removeFromCart } from "../store/cartSlice";
import Alert from "react-bootstrap/Alert";
import { toast } from "react-toastify";

const Cart = () => {
  const products = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleSubmit = (id) => {
    dispatch(removeFromCart(id));
    toast.error("Item removed from cart!");
  };

  const cards = products.map((product) => (
    <div
      className="col-md-12"
      key={product.itemId}
      style={{ margin: "50px 0 50px 0" }}
    >
      <Card style={{ width: "50%", margin: "0 auto" }} className="h-100">
        <div className="text-center">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ width: "100px", height: "130px", padding: "10px" }}
          />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>${product.price}</Card.Text>
          </Card.Body>
          <Card.Footer style={{ background: "white" }}>
            <Button
              variant="danger"
              onClick={() => handleSubmit(product.itemId)}
            >
              Remove Item
            </Button>
          </Card.Footer>
        </div>
      </Card>
    </div>
  ));

  return (
    <>
      <h1 className="text-center" style={{ padding: "20px" }}>
        Cart
      </h1>
      {cards.length === 0 ? (
        <Alert
          key="danger"
          className="text-center"
          style={{ width: "75%", margin: "0 auto" }}
        >
          Your cart is empty :(
        </Alert>
      ) : (
        <div className="row">{cards}</div>
      )}
    </>
  );
};

export default Cart;
