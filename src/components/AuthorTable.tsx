import React, { useState } from "react";
import styles from "../styles/Table.module.scss";
import { useAuthorsData } from "../utils/data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "./Pagination";

const AuthorTable = () => {
  const { authorsData, updateAuthor, deleteAuthor, addAuthor } =
    useAuthorsData();
  const [editItem, setEditItem] = useState<any>(null);
  const [formDataEdit, setFormDataEdit] = useState<any>({});
  const [formDataAdd, setFormDataAdd] = useState<any>({});
  const [validationError, setValidationError] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(5); // Number of authors per page

  // Calculate pagination logic
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = authorsData.slice(
    indexOfFirstAuthor,
    indexOfLastAuthor
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEdit = (item: any) => {
    setEditItem(item);
    setFormDataEdit({ ...item });
  };

  const handleUpdate = () => {
    const errors: any = validateFormData(formDataEdit);
    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      return;
    }

    updateAuthor(editItem.id, formDataEdit);
    setEditItem(null);
    setValidationError({});
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      deleteAuthor(id);
    }
  };

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataEdit({ ...formDataEdit, [e.target.name]: e.target.value });
  };

  const handleChangeAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataAdd({ ...formDataAdd, [e.target.name]: e.target.value });
  };

  const handleAddAuthor = () => {
    const errors: any = validateFormData(formDataAdd);
    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      return;
    }

    const newAuthor = {
      id: authorsData.length + 1,
      Name: formDataAdd.Name,
      Biography: formDataAdd.Biography,
      "Date of Birth": formDataAdd["Date of Birth"],
      "Number of Books Published": parseInt(
        formDataAdd["Number of Books Published"],
        10
      ),
    };
    addAuthor(newAuthor);
    setFormDataAdd({});
    setValidationError({});
  };

  const handleDateChangeEdit = (date: Date) => {
    setFormDataEdit({
      ...formDataEdit,
      "Date of Birth": date.toISOString().split("T")[0],
    });
  };

  const handleDateChangeAdd = (date: Date) => {
    setFormDataAdd({
      ...formDataAdd,
      "Date of Birth": date.toISOString().split("T")[0],
    });
  };

  const validateFormData = (data: any) => {
    const errors: any = {};

    if (!data.Name) {
      errors.Name = "Name is required.";
    }

    if (!data.Biography) {
      errors.Biography = "Biography is required.";
    }

    if (!data["Date of Birth"]) {
      errors["Date of Birth"] = "Date of Birth is required.";
    } else if (!isValidDateFormat(data["Date of Birth"])) {
      errors["Date of Birth"] = "Invalid date format. Use YYYY-MM-DD.";
    } else if (!isPastDate(data["Date of Birth"])) {
      errors["Date of Birth"] = "Date of Birth must be a past date.";
    }

    if (!data["Number of Books Published"]) {
      errors["Number of Books Published"] =
        "Number of Books Published is required.";
    } else if (!isValidNumber(data["Number of Books Published"])) {
      errors["Number of Books Published"] =
        "Number of Books Published must be a number.";
    }

    return errors;
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

  const nextPage = () => {
    if (indexOfLastAuthor < authorsData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(authorsData.length / authorsPerPage);

  return (
    <div>
      <div className={styles.addForm}>
        <h3>Add New Author</h3>
        <input
          type="text"
          placeholder="Name"
          name="Name"
          value={formDataAdd.Name || ""}
          onChange={handleChangeAdd}
        />
        {validationError.Name && (
          <p className={styles.error}>{validationError.Name}</p>
        )}
        <textarea
          placeholder="Biography"
          name="Biography"
          value={formDataAdd.Biography || ""}
          onChange={handleChangeAdd}
        />
        {validationError.Biography && (
          <p className={styles.error}>{validationError.Biography}</p>
        )}
        <DatePicker
          placeholderText="Date of Birth"
          selected={
            formDataAdd["Date of Birth"]
              ? new Date(formDataAdd["Date of Birth"])
              : null
          }
          onChange={handleDateChangeAdd}
          dateFormat="yyyy-MM-dd"
          maxDate={new Date()} // Restrict to past dates only
        />
        {validationError["Date of Birth"] && (
          <p className={styles.error}>{validationError["Date of Birth"]}</p>
        )}
        <input
          type="number"
          placeholder="Number of Books Published"
          name="Number of Books Published"
          value={formDataAdd["Number of Books Published"] || ""}
          onChange={handleChangeAdd}
        />
        {validationError["Number of Books Published"] && (
          <p className={styles.error}>
            {validationError["Number of Books Published"]}
          </p>
        )}
        <button onClick={handleAddAuthor}>Add Author</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            {Object.keys(authorsData[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAuthors.map((item, index) => (
            <tr key={index}>
              {Object.keys(item).map((key) => (
                <td key={key}>
                  {editItem?.id === item.id && key === "Date of Birth" ? (
                    <DatePicker
                      selected={
                        formDataEdit["Date of Birth"]
                          ? new Date(formDataEdit["Date of Birth"])
                          : null
                      }
                      onChange={handleDateChangeEdit}
                      dateFormat="yyyy-MM-dd"
                      maxDate={new Date()} // Restrict to past dates only
                    />
                  ) : editItem?.id === item.id ? (
                    <input
                      type="text"
                      name={key}
                      value={formDataEdit[key] || ""}
                      onChange={handleChangeEdit}
                    />
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
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          {"<"} Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={currentPage === index + 1 ? styles.active : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`${
            indexOfLastAuthor >= authorsData.length ? styles.disabled : ""
          }`}
          onClick={nextPage}
          disabled={indexOfLastAuthor >= authorsData.length}
        >
          Next {">"}
        </button>
      </div>
    </div>
  );
};

export default AuthorTable;
