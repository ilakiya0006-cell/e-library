import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Dashboard() {

  // =========================================
  // DEFAULT BOOKS
  // =========================================

  const defaultBooks = [
    {
      _id: 1,
      title: "Harry Potter",
      author: "J.K. Rowling",
      category: "Story",
      image:
        "https://m.media-amazon.com/images/I/81YOuOGFCJL.jpg",
      pdf:
        "https://dn790007.ca.archive.org/0/items/harrypotter1_202004/1_harry_potter_and_the_sorcerers_stone.pdf",
      reads: 0,
      description: "Fantasy story book",
    },

    {
      _id: 2,
      title: "World History",
      author: "Howard Spodek",
      category: "History",
      image:
        "https://m.media-amazon.com/images/I/91zbi9M+mKL.jpg",
      pdf:
        "https://www.orimi.com/pdf-test.pdf",
      reads: 0,
      description: "World history learning book",
    },

    {
      _id: 3,
      title: "Science Basics",
      author: "Isaac Newton",
      category: "Science",
      image:
        "https://m.media-amazon.com/images/I/81rtt6Kj+fL.jpg",
      pdf:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      reads: 0,
      description: "Basic science concepts",
    },

    {
      _id: 4,
      title: "AI Technology",
      author: "Andrew NG",
      category: "Technology",
      image:
        "https://m.media-amazon.com/images/I/71wMZ14QhFL.jpg",
      pdf:
        "https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_tutorial.pdf",
      reads: 0,
      description: "Artificial Intelligence book",
    },

    {
      _id: 5,
      title: "Tom and Jerry Comics",
      author: "Cartoon Network",
      category: "Cartoon",
      image:
        "https://m.media-amazon.com/images/I/91zR8g1vLhL.jpg",
      pdf:
        "https://www.orimi.com/pdf-test.pdf",
      reads: 0,
      description: "Funny cartoon comics",
    },

    {
      _id: 6,
      title: "React JS Guide",
      author: "Flavio Copes",
      category: "Programming",
      image:
        "https://m.media-amazon.com/images/I/61IswaR8YBL.jpg",
      pdf:
        "https://www.tutorialspoint.com/reactjs/reactjs_tutorial.pdf",
      reads: 0,
      description: "Complete React JS guide",
    },
  ];

  // =========================================
  // STATES
  // =========================================

  const [registeredUsers, setRegisteredUsers] =
    useState([]);

  const [recentBooks, setRecentBooks] =
    useState(defaultBooks);

  const [selectedBook, setSelectedBook] =
    useState(null);

  const [selectedCard, setSelectedCard] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const booksSectionRef = useRef(null);

  const [newBook, setNewBook] =
    useState({
      title: "",
      author: "",
      category: "",
      image: "",
      pdf: "",
    });

  // =========================================
  // CATEGORY LIST
  // =========================================

  const categories = [
    "Programming",
    "Technology",
    "Science",
    "History",
    "Story",
    "Cartoon",
    "AI",
    "Machine Learning",
    "Database",
    "Java",
    "Python",
    "React",
  ];

  // =========================================
  // LOAD USERS FROM MONGODB
  // =========================================

  const loadUsers = async () => {
    try {

      const response =
        await API.get("/users");

      setRegisteredUsers(
        response.data
      );

    } catch (error) {

      console.log(error);

      setRegisteredUsers([]);

    }
  };

  // =========================================
  // LOAD BOOKS
  // =========================================

  const loadBooks = async () => {
    try {

      const response =
        await API.get("/books");

      if (
        response.data &&
        response.data.length > 0
      ) {

        setRecentBooks(
          response.data
        );

      } else {

        setRecentBooks(
          defaultBooks
        );

      }

    } catch (error) {

      console.log(error);

      setRecentBooks(
        defaultBooks
      );

    }
  };

  // =========================================
  // USE EFFECT
  // =========================================

  useEffect(() => {

    loadUsers();
    loadBooks();

  }, []);

  // =========================================
  // TOTALS
  // =========================================

  const totalBooksRead =
    recentBooks.reduce(
      (total, book) =>
        total + (book.reads || 0),
      0
    );

  const totalCategories = [
    ...new Set(
      recentBooks.map(
        (book) => book.category
      )
    ),
  ].length;

  // =========================================
  // STATS
  // =========================================

  const stats = [
    {
      title: "Total Books",
      value: recentBooks.length,
      color:
        "from-blue-500 to-blue-700",
      icon: "📚",
      type: "books",
    },

    {
      title: "Categories",
      value: totalCategories,
      color:
        "from-purple-500 to-purple-700",
      icon: "📂",
      type: "categories",
    },

    {
      title: "Registered Users",
      value:
        registeredUsers.length,
      color:
        "from-pink-500 to-pink-700",
      icon: "👤",
      type: "users",
    },

    {
      title: "Reads",
      value: totalBooksRead,
      color:
        "from-green-500 to-green-700",
      icon: "📖",
      type: "reads",
    },
  ];

  // =========================================
  // CARD CLICK
  // =========================================

  const handleCardClick = (type) => {

    setSelectedCard(type);

    if (
      type === "books" &&
      booksSectionRef.current
    ) {

      booksSectionRef.current.scrollIntoView({
        behavior: "smooth",
      });

    }
  };

  // =========================================
  // ADD BOOK
  // =========================================

  const handleAddBook = async () => {

    if (
      !newBook.title ||
      !newBook.author ||
      !newBook.category ||
      !newBook.image ||
      !newBook.pdf
    ) {

      alert("Please Fill All Fields");
      return;

    }

    try {

      const response =
        await API.post(
          "/books/add",
          {
            ...newBook,
            reads: 0,
            description:
              "Newly Added Book",
          }
        );

      alert(response.data.message);

      loadBooks();

    } catch (error) {

      console.log(error);

      alert("Error Adding Book");

    }

    setNewBook({
      title: "",
      author: "",
      category: "",
      image: "",
      pdf: "",
    });

    setShowForm(false);
  };

  // =========================================
  // DELETE BOOK
  // =========================================

  const deleteBook = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this book?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/books/${id}`
      );

      loadBooks();

      alert("Book Deleted");

    } catch (error) {

      console.log(error);

      alert("Error Deleting Book");

    }
  };

  // =========================================
  // DELETE USER FROM MONGODB
  // =========================================

  const deleteUser = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this user?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/users/${id}`
      );

      alert("User Deleted");

      loadUsers();

    } catch (error) {

      console.log(error);

      alert("Error Deleting User");

    }
  };

  // =========================================
  // OPEN BOOK
  // =========================================

  const openBook = (pdf) => {

    window.open(pdf, "_blank");

  };

  // =========================================
  // SEARCH FILTER
  // =========================================

  const filteredBooks =
    recentBooks.filter((book) =>
      book.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // =========================================
  // REPORT
  // =========================================

  const generateReport = () => {

    alert(`
E-Library Report

Total Books : ${recentBooks.length}

Total Categories : ${totalCategories}

Registered Users : ${registeredUsers.length}

Books Read : ${totalBooksRead}
`);

  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-8">

        {/* HEADER */}

        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-10">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

            <div>

              <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
                Admin Dashboard
              </h1>

              <p className="text-gray-600 text-lg">
                Manage Books & Users Easily
              </p>

            </div>

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="dashboard"
              className="w-40"
            />

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {stats.map((item, index) => (

            <div
              key={index}
              onClick={() =>
                handleCardClick(
                  item.type
                )
              }
              className={`bg-gradient-to-r ${item.color} text-white rounded-3xl p-8 shadow-xl cursor-pointer hover:scale-105 transition duration-300`}
            >

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-2xl font-bold mb-3">
                    {item.title}
                  </h2>

                  <p className="text-5xl font-extrabold">
                    {item.value}
                  </p>

                </div>

                <div className="text-6xl animate-bounce">
                  {item.icon}
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* REGISTERED USERS DETAILS */}

        {selectedCard ===
          "users" && (

          <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-4xl font-bold text-pink-700">
                Registered Users
              </h2>

              <button
                onClick={() =>
                  setSelectedCard("")
                }
                className="bg-red-500 text-white px-5 py-2 rounded-xl"
              >
                Close
              </button>

            </div>

            {registeredUsers.length === 0 ? (

              <h2 className="text-3xl text-center text-pink-700 font-bold">
                No Registered Users
              </h2>

            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {registeredUsers.map(
                  (user) => (

                    <div
                      key={user._id}
                      className="bg-pink-100 p-6 rounded-3xl shadow-lg"
                    >

                      <h2 className="text-2xl font-bold text-pink-700">
                        👤 {user.name}
                      </h2>

                      <p className="text-gray-700 mt-3">
                        📧 {user.email}
                      </p>

                      <button
                        onClick={() =>
                          deleteUser(
                            user._id
                          )
                        }
                        className="mt-5 bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600"
                      >
                        Delete User
                      </button>

                    </div>
                  )
                )}

              </div>
            )}

          </div>
        )}

        {/* QUICK ACTIONS */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">

          <div className="flex flex-col lg:flex-row justify-between gap-5">

            <div className="flex flex-wrap gap-4">

              <button
                onClick={() =>
                  setShowForm(true)
                }
                className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800"
              >
                Add New Book
              </button>

              <button
                onClick={
                  generateReport
                }
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
              >
                Generate Report
              </button>

            </div>

            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="border p-4 rounded-xl w-full lg:w-80 outline-none"
            />

          </div>

        </div>

        {/* ADD BOOK FORM */}

        {showForm && (

          <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12">

            <h2 className="text-4xl font-bold text-blue-700 mb-8">
              Add New Book
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <input
                type="text"
                placeholder="Book Title"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({
                    ...newBook,
                    title:
                      e.target.value,
                  })
                }
                className="border p-5 rounded-2xl"
              />

              <input
                type="text"
                placeholder="Author"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook({
                    ...newBook,
                    author:
                      e.target.value,
                  })
                }
                className="border p-5 rounded-2xl"
              />

              <select
                value={newBook.category}
                onChange={(e) =>
                  setNewBook({
                    ...newBook,
                    category:
                      e.target.value,
                  })
                }
                className="border p-5 rounded-2xl"
              >

                <option value="">
                  Select Category
                </option>

                {categories.map(
                  (
                    category,
                    index
                  ) => (

                    <option
                      key={index}
                      value={category}
                    >
                      {category}
                    </option>
                  )
                )}

              </select>

              <input
                type="text"
                placeholder="Image URL"
                value={newBook.image}
                onChange={(e) =>
                  setNewBook({
                    ...newBook,
                    image:
                      e.target.value,
                  })
                }
                className="border p-5 rounded-2xl"
              />

              <input
                type="text"
                placeholder="PDF URL"
                value={newBook.pdf}
                onChange={(e) =>
                  setNewBook({
                    ...newBook,
                    pdf:
                      e.target.value,
                  })
                }
                className="border p-5 rounded-2xl md:col-span-2"
              />

            </div>

            <div className="flex gap-5 mt-8">

              <button
                onClick={handleAddBook}
                className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800"
              >
                Save Book
              </button>

              <button
                onClick={() =>
                  setShowForm(false)
                }
                className="bg-red-500 text-white px-8 py-3 rounded-xl hover:bg-red-600"
              >
                Cancel
              </button>

            </div>

          </div>
        )}

        {/* AVAILABLE BOOKS */}

        <div
          ref={booksSectionRef}
          className="bg-white rounded-3xl shadow-xl p-8"
        >

          <div className="flex justify-between items-center mb-10">

            <h2 className="text-4xl font-bold text-blue-700">
              Available Books
            </h2>

            <span className="bg-blue-100 text-blue-700 px-6 py-3 rounded-xl font-bold">
              {filteredBooks.length} Books
            </span>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {filteredBooks.map(
              (book) => (

                <div
                  key={book._id}
                  onClick={() =>
                    setSelectedBook(book)
                  }
                  className="bg-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer"
                >

                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-72 object-cover"
                  />

                  <div className="p-5">

                    <h3 className="text-2xl font-bold text-blue-700 mb-2">
                      {book.title}
                    </h3>

                    <p className="text-gray-600 mb-2">
                      Author:
                      {book.author}
                    </p>

                    <p className="text-gray-600 mb-2">
                      Category:
                      {book.category}
                    </p>

                    <p className="text-green-600 font-semibold mb-4">
                      Reads:
                      {book.reads}
                    </p>

                    <div className="flex gap-3">

                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          openBook(
                            book.pdf
                          );
                        }}
                        className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800"
                      >
                        Read
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          deleteBook(
                            book._id
                          );
                        }}
                        className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>

        </div>

        {/* BOOK MODAL */}

        {selectedBook && (

          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-5">

            <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative">

              <button
                onClick={() =>
                  setSelectedBook(null)
                }
                className="absolute top-4 right-5 text-3xl font-bold text-red-500"
              >
                ×
              </button>

              <img
                src={selectedBook.image}
                alt={selectedBook.title}
                className="w-full h-80 object-cover rounded-2xl mb-6"
              />

              <h2 className="text-4xl font-bold text-blue-700 mb-4">
                {selectedBook.title}
              </h2>

              <p className="mb-3">
                Author:
                {selectedBook.author}
              </p>

              <p className="mb-3">
                Category:
                {selectedBook.category}
              </p>

              <p className="mb-3">
                Reads:
                {selectedBook.reads}
              </p>

              <p className="text-gray-600 mb-6">
                {
                  selectedBook.description
                }
              </p>

              <button
                onClick={() =>
                  window.open(
                    selectedBook.pdf,
                    "_blank"
                  )
                }
                className="w-full bg-blue-700 text-white py-4 rounded-2xl text-lg hover:bg-blue-800"
              >
                Read Full Book
              </button>

            </div>

          </div>
        )}

        {/* FOOTER */}

        <div className="text-center mt-16 text-gray-700 text-lg font-semibold">
          © 2026 E-Library Management System
        </div>

      </div>
    </>
  );
}

export default Dashboard;