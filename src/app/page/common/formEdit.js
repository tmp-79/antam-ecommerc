import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { storage } from "app/const/firebase";
import {
  editProductAction,
  getDetailProductAction,
} from "core/redux/actions/productActions";
import { Toasts } from "./toasts/toasts";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "app/components/loading";
import { Form } from "react-bootstrap";

function FormEdit({ heading }) {
  const { id } = useParams();
  const { isLoadingDetail, editProduct } = useSelector(
    (state) => state.product
  );
  const [dataSubmit, setDataSubmit] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  const [errors, setErrors] = useState({});
  const [urls, setUrls] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getDetailProductAction(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setDataSubmit(editProduct);
  }, [editProduct]);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
  };

  const handleChangeFile = (e) => {
    setUrls([]);
    const { files } = e.target;
    const uploadList = [];
    const extension = /\.(gif|jpe?g|png|jpg)$/i;
    let canUploadFile = false;

    for (let i = 0; i < files.length; i++) {
      const image = files[i];

      if (extension.test(image.name)) {
        canUploadFile = true;
        uploadList.push(files[i]);
      }
    }

    if (canUploadFile) {
      const promises = [];
      uploadList.forEach((image) => {
        const uploadTask = storage
          .ref()
          .child(`images/${image.name}`)
          .put(image);

        promises.push(uploadTask);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            if (snapshot.state === "running") {
              // console.log(`Đang tải: ${progress}%`);
            }
          },
          (error) => {
            console.log({ error });
          },
          async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

            setUrls((prevState) => [...prevState, downloadURL]);
          }
        );
      });

      Promise.all(promises)
        .then(() => {
          alert("Đã upload thành công!!!");
        })
        .catch((err) => console.log(err.code));
    } else {
      setErrors({
        ...errors,
        files: "Vui lòng chọn đúng định dạng hình ảnh",
      });
    }
    // show file hiển thị ra bên ngoài ô input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content } = dataSubmit;

    let errorMgs = {};

    if (!title.length) {
      errorMgs.title = "Vui lòng điền vào trường này";
    }

    if (!content.length) {
      errorMgs.content = "Vui lòng điền vào trường này";
    }

    if (_.isEmpty(errorMgs)) {
      let payload = { ...dataSubmit };

      if (urls.length) {
        payload = {
          ...dataSubmit,
          img: [...urls],
          categoryId: dataSubmit.categoryId || categoryList[0].id,
        };
      }

      dispatch(editProductAction(id, payload));

      cancelModal();
    } else {
      setErrors({ ...errorMgs });
    }

    return;
  };

  const cancelModal = () => {
    setDataSubmit({});
    history.push("/admin/tat-ca-san-pham");
  };

  console.log(urls)
  return (
    <div className="modal-form">
      <div className="modal-body">
        <h1>{heading}</h1>

        {isLoadingDetail ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div>
            <form>
              <div className="form-group">
                <label htmlFor="title">Tên sản phẩm</label>
                <input
                  id="title"
                  name="title"
                  value={dataSubmit?.title}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                />
              </div>

              {errors.title && (
                <div className="alert alert-danger">{errors.title}</div>
              )}

              <div className="form-group">
                <label htmlFor="content">Nội dung</label>
                <textarea
                  id="content"
                  name="content"
                  value={dataSubmit?.content}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                />
              </div>

              {errors.content && (
                <div className="alert alert-danger">{errors.content}</div>
              )}

              <div className="form-group">
                <label htmlFor="content">Loại sản phẩm</label>

                <Form.Select
                  size="lg"
                  className="form-control"
                  name="categoryId"
                  onChange={handleChange}
                  defaultValue={editProduct.categoryId}
                >
                  {categoryList.map((item) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </Form.Select>
              </div>

              <div className="form-group">
                <label className="choose-file" htmlFor="image">
                  <i className="fa-solid fa-arrow-up-from-bracket"></i>
                  Tải hình ảnh từ máy tính
                </label>
                <input
                  id="image"
                  type="file"
                  multiple
                  onChange={handleChangeFile}
                  accept="image/png, image/jpg, image/jpeg"
                />
              </div>

              {errors.files && (
                <div className="alert alert-danger">{errors.files}</div>
              )}
            </form>
            <div className="row files-box">
              {(urls.length === 0 ? true : false) && (
                <div className="content">
                  {/* <i class="fa-solid fa-cloud-arrow-up"></i> */}
                  <span>Chưa có file ảnh</span>
                </div>
              )}
              {urls.map((url) => {
                return (
                  <div
                    style={{ padding: "1rem" }}
                    className="col-3 image-uploaded"
                    key={url}
                  >
                    <img src={url} alt={url} />
                  </div>
                );
              })}
            </div>
            <div className="modal-button">
              <button onClick={cancelModal} className="modal-button-cancel">
                Hủy
              </button>

              <button
                onClick={handleSubmit}
                className="modal-button-save"
                type="button"
              >
                Sửa sản phẩm
              </button>
            </div>
          </div>
        )}
      </div>

      <Toasts />
    </div>
  );
}

export default FormEdit;
