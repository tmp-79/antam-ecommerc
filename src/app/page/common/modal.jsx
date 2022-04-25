import React, { Component } from "react";
import { ADD_PRODUCT, EDIT_PRODUCT } from "../admin/admin-page/constants";
import FormComponent from "./form";
import FormEdit from "./formEdit";
import "./styles/modal.css";

class Modal extends Component {
  render() {
    const { history, products, match, heading, type } = this.props;

    return (
      <>
        {type === ADD_PRODUCT && (
          <FormComponent
            match={match}
            history={history}
            products={products}
            heading={heading}
          />
        )}

        {type === EDIT_PRODUCT && (
          <FormEdit
            match={match}
            history={history}
            products={products}
            heading={heading}
          />
        )}
      </>
    );
  }
}

export default Modal;
