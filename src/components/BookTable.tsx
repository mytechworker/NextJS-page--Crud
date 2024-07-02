import React, { useState } from "react";
import styles from "../styles/Table.module.scss";
import { useBooksData } from "../utils/data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "./Pagination";

const BookTable = () => {
  const { booksData, updateBook, deleteBook, addBook } = useBooksData();
  const [editItem, setEditItem] = useState<any>(null);
  const [formDataEdit, setFormDataEdit] = useState<any>({});
  const [formDataAdd, setFormDataAdd] = useState<any>({});
  const [validationError, setValidationError] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5); // Number of books per page

  // Calculate pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = booksData.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEdit = (item: any) => {
    setEditItem(item);
    setFormDataEdit(item);
  };

  const handleUpdate = () => {
    const errors: any = validateFormData(formDataEdit);
    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      return;
    }

    updateBook(editItem.id, formDataEdit);
    setEditItem(null);
    setValidationError({});
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      deleteBook(id);
    }
  };

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataEdit({ ...formDataEdit, [e.target.name]: e.target.value });
  };

  const handleChangeAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataAdd({ ...formDataAdd, [e.target.name]: e.target.value });
  };

  const handleAddBook = () => {
    const errors: any = validateFormData(formDataAdd);
    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      return;
    }

    const newBook = {
      id: booksData.length + 1,
      Title: formDataAdd.Title,
      ISBN: formDataAdd.ISBN,
      "Published Date": formDataAdd["Published Date"],
      "Stock Quantity": parseInt(formDataAdd["Stock Quantity"], 10),
    };
    addBook(newBook);
    setFormDataAdd({});
    setValidationError({});
  };

  const isValidDateFormat = (dateString: string) => {
    // Regex to validate date format YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const isPastDate = (dateString: string) => {
    // Check if the date is in the past
    const currentDate = new Date();
    const selectedDate = new Date(dateString);
    return selectedDate < currentDate;
  };

  const isValidNumber = (numberString: string) => {
    // Regex to validate number
    const regex = /^\d+$/;
    return regex.test(numberString);
  };

  const handleDateChangeEdit = (date: Date) => {
    setFormDataEdit({
      ...formDataEdit,
      "Published Date": date.toISOString().split("T")[0],
    });
  };

  const handleDateChangeAdd = (date: Date) => {
    setFormDataAdd({
      ...formDataAdd,
      "Published Date": date.toISOString().split("T")[0],
    });
  };

  const validateFormData = (data: any) => {
    const errors: any = {};

    if (!data.Title) {
      errors.Title = "Title is required.";
    }

    if (!data.ISBN) {
      errors.ISBN = "ISBN is required.";
    }

    if (!data["Published Date"]) {
      errors["Published Date"] = "Published Date is required.";
    } else if (!isValidDateFormat(data["Published Date"])) {
      errors["Published Date"] = "Invalid date format. Use YYYY-MM-DD.";
    } else if (!isPastDate(data["Published Date"])) {
      errors["Published Date"] = "Published Date must be a past date.";
    }

    if (!data["Stock Quantity"]) {
      errors["Stock Quantity"] = "Stock Quantity is required.";
    } else if (!isValidNumber(data["Stock Quantity"])) {
      errors["Stock Quantity"] = "Stock Quantity must be a number.";
    }

    return errors;
  };

  return (
    <div>
      <div className={styles.addForm}>
        <h3>Add New Book</h3>
        <input
          type="text"
          placeholder="Title"
          name="Title"
          value={formDataAdd.Title || ""}
          onChange={handleChangeAdd}
        />
        {validationError.Title && (
          <p className={styles.error}>{validationError.Title}</p>
        )}
        <input
          type="text"
          placeholder="ISBN"
          name="ISBN"
          value={formDataAdd.ISBN || ""}
          onChange={handleChangeAdd}
        />
        {validationError.ISBN && (
          <p className={styles.error}>{validationError.ISBN}</p>
        )}
        <DatePicker
          placeholderText="Published Date"
          selected={
            formDataAdd["Published Date"]
              ? new Date(formDataAdd["Published Date"])
              : null
          }
          onChange={handleDateChangeAdd}
          dateFormat="yyyy-MM-dd"
          maxDate={new Date()}
        />
        {validationError["Published Date"] && (
          <p className={styles.error}>{validationError["Published Date"]}</p>
        )}
        <input
          type="text"
          placeholder="Stock Quantity"
          name="Stock Quantity"
          value={formDataAdd["Stock Quantity"] || ""}
          onChange={handleChangeAdd}
        />
        {validationError["Stock Quantity"] && (
          <p className={styles.error}>{validationError["Stock Quantity"]}</p>
        )}
        <button onClick={handleAddBook}>Add Book</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            {Object.keys(booksData[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((item, index) => (
            <tr key={index}>
              {Object.keys(item).map((key) => (
                <td key={key}>
                  {editItem?.id === item.id ? (
                    key === "Published Date" ? (
                      <DatePicker
                        selected={
                          formDataEdit["Published Date"]
                            ? new Date(formDataEdit["Published Date"])
                            : null
                        }
                        onChange={handleDateChangeEdit}
                        dateFormat="yyyy-MM-dd"
                        maxDate={new Date()}
                      />
                    ) : (
                      <input
                        type="text"
                        name={key}
                        value={formDataEdit[key]}
                        onChange={handleChangeEdit}
                      />
                    )
                  ) : (
                    item[key]
                  )}
                </td>
              ))}
              <td>
                {editItem?.id === item.id ? (
                  <>
                    <button className={styles.actionBtn} onClick={handleUpdate}>
                      Save
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => setEditItem(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button
          className={`${currentPage === 1 ? styles.disabled : ""}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"} Prev
        </button>
        {Array.from(
          { length: Math.ceil(booksData.length / booksPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? styles.active : ""}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          className={`${
            indexOfLastBook >= booksData.length ? styles.disabled : ""
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastBook >= booksData.length}
        >
          Next {">"}
        </button>
      </div>
    </div>
  );
};

export default BookTable;
