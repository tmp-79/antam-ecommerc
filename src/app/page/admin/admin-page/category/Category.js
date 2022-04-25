import {
  removeProductAction,
  updateCategoryAction,
} from "core/redux/actions/categoryActions";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryForm from "./action/CategoryForm";
import CategoryEdit from "./edit/CategoryFormEdit";

import "./Category.scss";

const Category = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [defaultValue, setDefaultValue] = useState({});
  const { categoryList } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const handleAddCategory = () => {
    setShowModal(true);
  };

  const handleShowEditModal = (item) => {
    setShowModalEdit(true);
    setDefaultValue(item);
  };

  const handleUpdateCategory = (values) => {
    dispatch(updateCategoryAction(values.id, { name: values.name }));
  };

  const handleRemoveCategory = (id) => {
    //   Có thể add thêm popup confirm cho việc xóa action ở đây nha Phú
    dispatch(removeProductAction(id));
  };

  return (
    <section className="table-section mt-4">
      <div className="category-list">
        <h1> Phân loại sản phẩm</h1>
        <div className="header-category mt-5">
          <button className="product-btn-create" onClick={handleAddCategory}>
            Thêm loại
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th
              style={{
                width: "15%",
              }}
            ></th>
          </tr>
        </thead>
        <tbody>
          {categoryList?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td
                style={{
                  width: "15%",
                  cursor: "pointer",
                }}
              >
                <span
                  className="btn-edit"
                  style={{
                    margin: "0 15px 0 0",
                  }}
                  onClick={() => {
                    handleShowEditModal(item);
                  }}
                >
                  <i className="fa fa-pen-to-square"></i>
                </span>

                <span
                  className="btn-delete"
                  onClick={() => {
                    handleRemoveCategory(item.id);
                  }}
                >
                  <i className="fa fa-trash"></i>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CategoryEdit
        show={showModalEdit}
        onHide={() => {
          setShowModalEdit(false);
          setDefaultValue({});
        }}
        onHandleUpdateCategory={handleUpdateCategory}
        defaultValue={defaultValue}
      />

      <CategoryForm show={showModal} onHide={() => setShowModal(false)} />
    </section>
  );
};

export default Category;
