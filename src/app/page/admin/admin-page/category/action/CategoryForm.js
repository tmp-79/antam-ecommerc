import React, { useState } from "react";
import "./CategoryForm.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addCategoryAction } from "core/redux/actions/categoryActions";

const schemeValidation = yup.object({
  categoryName: yup.string().required("Vui lòng nhập đúng thông tin..."),
});

const CategoryForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(schemeValidation),
    mode: "onChange",
  });
  const dispatch = useDispatch();

  const submit = (values) => {
    dispatch(addCategoryAction({ name: values.categoryName }));

    reset({
      categoryName: "",
    });
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Thêm loại sản phẩm
          </Modal.Title>
        </Modal.Header>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(submit)}
          className="form-add-category"
        >
          <Modal.Body>
            <div className="form-order__item">
              <label htmlFor="categoryName">Tên loại:</label>
              <input
                type="categoryName"
                {...register("categoryName")}
                id="categoryName"
              />
              <span>{errors.categoryName?.message}</span>
            </div>
          </Modal.Body>

          <button type="submit" variant="primary">
            Thêm
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CategoryForm;
