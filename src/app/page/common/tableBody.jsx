import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAction } from "core/redux/actions/productActions";
import Delete from "./delete";
import { icons } from "assets/icons/icons-svg";
import { getCategoryAction } from "core/redux/actions/categoryActions";
function TableBody({ data }) {
  const dispatch = useDispatch();
  const { categoryList, isLoading } = useSelector((state) => state.category);

  const handleDelete = (item) => {
    dispatch(deleteProductAction(item.id));
  };

  useEffect(() => {
    dispatch(getCategoryAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [content, setContent] = useState();
  const prevContent = useRef();

  useEffect(() => {
    prevContent.current = content;
  }, [content]);


  if (categoryList) {
    data.forEach((item) => {
      categoryList.forEach((cate) => {
        if (item.categoryId == cate.id) {
          item.categoryName = cate.name;
        }
      })
    })
  }

  const HandleContentClick = (index) => {
    if (prevContent.current === index) {
      setContent(undefined);
    } else setContent(index);
  };

  return (
    <tbody>
      {data.map((item, index) => {
        return (
          <tr key={item?.id} className="value-row">
            <td className="value-column">
              {index + 1}
            </td>
            <td className="value-column">
              <p>{item?.title}</p>
            </td>
            <td className="value-column">{item.categoryName}</td>

            <td
              className="value-column"
              data-toggle="tooltip" data-placement="bottom" title="Click để xem nội dung"
              onClick={() => HandleContentClick(index)}
            >
              <p className={index === content ? "txt-full" : "txt-truncate"}>
                {item?.content}
              </p>
            </td>
            <td className="value-column">
              <div style={{ width: "15rem", gap: "4px 0" }} className="row">
                {item?.img.map((link) => {
                  return (
                    <div className="col-4" key={link}>
                      <div className="img-wrapper">
                        <img src={link} className="img-fluid" alt={link} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </td>
            <td className="value-column">
              <div className="options">
                <span data-toggle="tooltip" data-placement="bottom" title="Click để Sửa">
                  <Link
                    to={`/admin/tat-ca-san-pham/sua-san-pham/${item.id}`}
                    className="btn-edit"
                  >
                    <i className="fa fa-pen-to-square"></i>
                  </Link>
                </span>
                <span data-toggle="tooltip" data-placement="bottom" title="Click để Xóa">
                  <Delete
                    item={item}
                    list="products"
                    onDelete={() => {
                      handleDelete(item);
                    }}
                  />
                </span>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
