import React from "react";
import Order from "../../components/Order/Order";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ordersIcon from "../../assets/svg/clipboard-list-solid.svg";
import Spinner from "../../components/UI/Spinner/Spiner";
import classes from "./Orders.module.css";

class Orders extends React.Component {
  componentDidMount() {
    this.props.onFetchOrder(this.props.token, this.props.userId);
  }
  render() {
    let orders = (
      <div style={{ marginTop: "150px" }}>
        <Spinner />
      </div>
    );
    if (this.props.loading === false) {
      if (this.props.orders.length !== 0) {
        orders = this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.totalPrice}
          />
        ));
      } else {
        orders = (
          <div className={classes.Container}>
            <div className={classes.OrderListIcon}>
              <img src={ordersIcon} alt="orders icon" />
            </div>
            <p>
              <span style={{ display: "block" }}>
                you don't have any orders yet .
              </span>
              please make orders
            </p>
          </div>
        );
      }
    }
    return <div>{orders}</div>;
  }
}
const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrder: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
