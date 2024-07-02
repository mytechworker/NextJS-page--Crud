// /utils/data.ts
import { useState } from "react";

let initialBooksData = [
  {
    id: 1,
    Title: "Book 1",
    ISBN: "1234567890",
    "Published Date": "2021-01-01",
    "Stock Quantity": 10,
  },
  {
    id: 2,
    Title: "Book 2",
    ISBN: "0987654321",
    "Published Date": "2022-02-02",
    "Stock Quantity": 20,
  },
  {
    id: 3,
    Title: "Book 3",
    ISBN: "2345678901",
    "Published Date": "2023-03-03",
    "Stock Quantity": 15,
  },
  {
    id: 4,
    Title: "Book 4",
    ISBN: "3456789012",
    "Published Date": "2024-04-04",
    "Stock Quantity": 12,
  },
  {
    id: 5,
    Title: "Book 5",
    ISBN: "4567890123",
    "Published Date": "2025-05-05",
    "Stock Quantity": 18,
  },
  {
    id: 6,
    Title: "Book 6",
    ISBN: "5678901234",
    "Published Date": "2026-06-06",
    "Stock Quantity": 25,
  },
  {
    id: 7,
    Title: "Book 7",
    ISBN: "6789012345",
    "Published Date": "2027-07-07",
    "Stock Quantity": 14,
  },
  {
    id: 8,
    Title: "Book 8",
    ISBN: "7890123456",
    "Published Date": "2028-08-08",
    "Stock Quantity": 22,
  },
  {
    id: 9,
    Title: "Book 9",
    ISBN: "8901234567",
    "Published Date": "2029-09-09",
    "Stock Quantity": 17,
  },
  {
    id: 10,
    Title: "Book 10",
    ISBN: "9012345678",
    "Published Date": "2030-10-10",
    "Stock Quantity": 30,
  },
  {
    id: 11,
    Title: "Book 11",
    ISBN: "0123456789",
    "Published Date": "2031-11-11",
    "Stock Quantity": 19,
  },
  {
    id: 12,
    Title: "Book 12",
    ISBN: "1234509876",
    "Published Date": "2032-12-12",
    "Stock Quantity": 16,
  },
  {
    id: 13,
    Title: "Book 13",
    ISBN: "2345678901",
    "Published Date": "2033-01-01",
    "Stock Quantity": 23,
  },
  {
    id: 14,
    Title: "Book 14",
    ISBN: "3456789012",
    "Published Date": "2034-02-02",
    "Stock Quantity": 28,
  },
  {
    id: 15,
    Title: "Book 15",
    ISBN: "4567890123",
    "Published Date": "2035-03-03",
    "Stock Quantity": 21,
  },
];

let initialAuthorsData = [
  {
    id: 1,
    Name: "Author 1",
    Biography: "Bio 1",
    "Date of Birth": "1980-01-01",
    "Number of Books Published": 5,
  },
  {
    id: 2,
    Name: "Author 2",
    Biography: "Bio 2",
    "Date of Birth": "1990-02-02",
    "Number of Books Published": 10,
  },
  {
    id: 3,
    Name: "Author 3",
    Biography: "Bio 3",
    "Date of Birth": "1985-03-03",
    "Number of Books Published": 7,
  },
  {
    id: 4,
    Name: "Author 4",
    Biography: "Bio 4",
    "Date of Birth": "1975-04-04",
    "Number of Books Published": 12,
  },
  {
    id: 5,
    Name: "Author 5",
    Biography: "Bio 5",
    "Date of Birth": "1988-05-05",
    "Number of Books Published": 8,
  },
  {
    id: 6,
    Name: "Author 6",
    Biography: "Bio 6",
    "Date of Birth": "1970-06-06",
    "Number of Books Published": 15,
  },
  {
    id: 7,
    Name: "Author 7",
    Biography: "Bio 7",
    "Date of Birth": "1983-07-07",
    "Number of Books Published": 9,
  },
  {
    id: 8,
    Name: "Author 8",
    Biography: "Bio 8",
    "Date of Birth": "1992-08-08",
    "Number of Books Published": 6,
  },
  {
    id: 9,
    Name: "Author 9",
    Biography: "Bio 9",
    "Date of Birth": "1978-09-09",
    "Number of Books Published": 11,
  },
  {
    id: 10,
    Name: "Author 10",
    Biography: "Bio 10",
    "Date of Birth": "1995-10-10",
    "Number of Books Published": 13,
  },
  {
    id: 11,
    Name: "Author 11",
    Biography: "Bio 11",
    "Date of Birth": "1982-11-11",
    "Number of Books Published": 14,
  },
  {
    id: 12,
    Name: "Author 12",
    Biography: "Bio 12",
    "Date of Birth": "1973-12-12",
    "Number of Books Published": 16,
  },
  {
    id: 13,
    Name: "Author 13",
    Biography: "Bio 13",
    "Date of Birth": "1993-01-01",
    "Number of Books Published": 18,
  },
  {
    id: 14,
    Name: "Author 14",
    Biography: "Bio 14",
    "Date of Birth": "1984-02-02",
    "Number of Books Published": 20,
  },
  {
    id: 15,
    Name: "Author 15",
    Biography: "Bio 15",
    "Date of Birth": "1977-03-03",
    "Number of Books Published": 17,
  },
];

export const useBooksData = () => {
  const [booksData, setBooksData] = useState(initialBooksData);

  const updateBook = (id: number, updatedBook: any) => {
    const updatedData = booksData.map((book) =>
      book.id === id ? { ...book, ...updatedBook } : book
    );
    setBooksData(updatedData);
  };

  const deleteBook = (id: number) => {
    const updatedData = booksData.filter((book) => book.id !== id);
    setBooksData(updatedData);
  };

  const addBook = (newBook: any) => {
    setBooksData([...booksData, { id: booksData.length + 1, ...newBook }]);
  };

  return { booksData, updateBook, deleteBook, addBook };
};

export const useAuthorsData = () => {
  const [authorsData, setAuthorsData] = useState(initialAuthorsData);

  const updateAuthor = (id: number, updatedAuthor: any) => {
    const updatedData = authorsData.map((author) =>
      author.id === id ? { ...author, ...updatedAuthor } : author
    );
    setAuthorsData(updatedData);
  };

  const deleteAuthor = (id: number) => {
    const updatedData = authorsData.filter((author) => author.id !== id);
    setAuthorsData(updatedData);
  };

  const addAuthor = (newAuthor: any) => {
    setAuthorsData([
      ...authorsData,
      { id: authorsData.length + 1, ...newAuthor },
    ]);
  };

  return { authorsData, updateAuthor, deleteAuthor, addAuthor };
};
