import React, { useMemo, useState } from "react";
import "./styles.scss";
import Modal from "react-bootstrap/Modal";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schemeValidation = yup.object({
  name: yup.string().required("Vui lòng nhập đúng thông tin..."),
});

const CategoryEdit = (props) => {
  const { onHandleUpdateCategory, defaultValue } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schemeValidation),
    mode: "onChange",
    defaultValues: useMemo(() => {
      return props.defaultValue;
    }, [props]),
  });

  React.useEffect(() => {
    reset(props.defaultValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.defaultValue]);

  const submit = (values) => {
    onHandleUpdateCategory && onHandleUpdateCategory(values);

    reset({
      name: "",
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
            Sửa loại sản phẩm
          </Modal.Title>
        </Modal.Header>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(submit)}
          className="form-add-category"
        >
          <Modal.Body>
            <div className="form-order__item">
              <label htmlFor="name">Tên loại:</label>

              <Controller
                name="name"
                control={control}
                render={({ field }) => <input {...field} />}
              />

              <span>{errors.name?.message}</span>
            </div>
          </Modal.Body>

          <button type="submit" variant="primary">
            Sửa
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CategoryEdit;
