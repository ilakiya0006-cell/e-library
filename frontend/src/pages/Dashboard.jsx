import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

function Dashboard() {
  // =========================================
  // REGISTERED USERS
  // =========================================

  const [registeredUsers, setRegisteredUsers] =
    useState(0);

  const loadUsers = () => {
    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    setRegisteredUsers(users.length);
  };

  useEffect(() => {
    loadUsers();

    window.addEventListener(
      "storage",
      loadUsers
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadUsers
      );
    };
  }, []);

  // =========================================
  // BOOK DATA
  // =========================================

  const [recentBooks, setRecentBooks] =
    useState([
      {
        title: "JavaScript Guide",

        author: "Brendan Eich",

        category: "Programming",

        image:
          "https://m.media-amazon.com/images/I/51gdVAEfPUL.jpg",

        pdf:
          "https://www.tutorialspoint.com/javascript/javascript_tutorial.pdf",

        reads: 0,

        description:
          "Complete JavaScript guide for beginners and advanced developers.",
      },

      {
        title: "Python Crash Course",

        author: "Eric Matthes",

        category: "Python",

        image:
          "https://m.media-amazon.com/images/I/51W1sBPO7tL.jpg",

        pdf:
          "https://cfm.ehu.es/ricardo/docs/python/Learning_Python.pdf",

        reads: 0,

        description:
          "Learn Python programming with real-world examples and projects.",
      },

      {
        title: "React JS Handbook",

        author: "Flavio Copes",

        category: "React",

        image:
          "https://m.media-amazon.com/images/I/61uA2UVnYWL.jpg",

        pdf:
          "https://flaviocopes.com/page/react-handbook/react-handbook.pdf",

        reads: 0,
        description:
          "Modern React concepts including hooks, routing and state management.",
      },

      {
        title: "Node JS Mastery",

        author: "Ryan Dahl",

        category: "Backend",

        image:
          "https://tse2.mm.bing.net/th/id/OIP.c8O1lB-Z2-a8AWLvsJ-xdQAAAA?pid=Api&P=0&h=180",

        pdf:
          "https://www.tutorialspoint.com/nodejs/nodejs_tutorial.pdf",

        reads: 0,

        description:
          "Master backend development using Node.js and Express.js.",
      },

      {
        title: "MongoDB Basics",

        author: "MongoDB Inc",

        category: "Database",

        image:
          "https://tse1.mm.bing.net/th/id/OIP.DiNIG4Bfpm65_wwXf_JwMAHaHa?pid=Api&P=0&h=180",

        pdf:
          "https://www.tutorialspoint.com/mongodb/mongodb_tutorial.pdf",

        reads: 0,

        description:
          "Learn MongoDB CRUD operations, collections and aggregation.",
      },

      {
        title: "Artificial Intelligence",

        author: "Andrew NG",

        category: "Technology",

        image:
          "https://tse3.mm.bing.net/th/id/OIP.LlSTGgwwc-yVwqqB_s9O6gHaHa?pid=Api&P=0&h=180",

        pdf:
          "https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_tutorial.pdf",

        reads: 0,

        description:
          "Introduction to Artificial Intelligence and Machine Learning concepts.",
      },
    ]);

  // =========================================
  // STATES
  // =========================================

  const [selectedBook, setSelectedBook] =
    useState(null);

  const [selectedCard, setSelectedCard] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [newBook, setNewBook] =
    useState({
      title: "",

      author: "",

      category: "",

      image: "",

      pdf: "",
    });

  // =========================================
  // TOTAL BOOK READS
  // =========================================

  const totalBooksRead =
    recentBooks.reduce(
      (total, book) =>
        total + book.reads,
      0
    );

  // =========================================
  // TOTAL CATEGORIES
  // =========================================

  const totalCategories = [
    ...new Set(
      recentBooks.map(
        (book) => book.category
      )
    ),
  ].length;

  // =========================================
  // DASHBOARD STATS
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

      value: registeredUsers,

      color:
        "from-pink-500 to-pink-700",

      icon: "👤",

      type: "users",
    },

    {
      title: "Books Read",

      value: totalBooksRead,

      color:
        "from-green-500 to-green-700",

      icon: "📖",

      type: "reads",
    },
  ];

  // =========================================
  // ADD BOOK
  // =========================================

  const handleAddBook = () => {
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

    setRecentBooks([
      ...recentBooks,

      {
        ...newBook,

        reads: 0,

        description:
          "Newly added book in E-Library.",
      },
    ]);

    alert(
      "New Book Added Successfully"
    );

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
  // OPEN BOOK
  // =========================================

  const openBook = (pdf, index) => {
    const updatedBooks = [
      ...recentBooks,
    ];

    updatedBooks[index].reads += 1;

    setRecentBooks(updatedBooks);

    window.open(pdf, "_blank");
  };

  // =========================================
  // DELETE BOOK
  // =========================================

  const deleteBook = (index) => {
    const confirmDelete =
      window.confirm(
        "Are you sure want to delete this book?"
      );

    if (!confirmDelete) return;

    const updatedBooks =
      recentBooks.filter(
        (_, i) => i !== index
      );

    setRecentBooks(updatedBooks);
  };

  // =========================================
  // SEARCH FILTER
  // =========================================

  const filteredBooks =
    recentBooks.filter((book) =>
      book.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // =========================================
  // REPORT
  // =========================================

  const generateReport = () => {
    alert(`
E-Library Report

Total Books : ${recentBooks.length}

Total Categories : ${totalCategories}

Registered Users : ${registeredUsers}

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
                Manage books, users,
                reports and categories
                easily in your E-Library
                system.
              </p>
            </div>

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="dashboard"
              className="w-40 hover:scale-110 transition duration-300"
            />
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                setSelectedCard(
                  item.type
                )
              }
              className={`bg-gradient-to-r ${item.color} text-white rounded-3xl p-8 shadow-xl hover:scale-105 hover:rotate-1 transition duration-300 cursor-pointer`}
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

                <div className="text-5xl animate-bounce">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CARD DETAILS */}

        {selectedCard && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold text-blue-700">
                {selectedCard ===
                  "books" &&
                  "All Books"}

                {selectedCard ===
                  "categories" &&
                  "All Categories"}

                {selectedCard ===
                  "users" &&
                  "Registered Users"}

                {selectedCard ===
                  "reads" &&
                  "Books Read Details"}
              </h2>

              <button
                onClick={() =>
                  setSelectedCard("")
                }
                className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600"
              >
                Close
              </button>
            </div>
           
            {/* BOOKS */}

            {selectedCard ===
              "books" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentBooks.map(
                  (
                    book,
                    index
                  ) => (
                    <div
                      key={index}
                      className="bg-gray-100 rounded-2xl p-5 shadow-lg"
                    >
                      <img
                        src={
                          book.image
                        }
                        alt={
                          book.title
                        }
                        className="w-full h-60 object-cover rounded-2xl mb-4"
                      />

                      <h3 className="text-2xl font-bold text-blue-700">
                        {
                          book.title
                        }
                      </h3>

                      <p className="text-gray-600 mt-2">
                        Author:
                        {
                          book.author
                        }
                      </p>

                      <p className="text-gray-600">
                        Category:
                        {
                          book.category
                        }
                      </p>

                      <p className="text-green-600 font-bold mt-2">
                        Reads:
                        {
                          book.reads
                        }
                      </p>
                    </div>
                  )
                )}
              </div>
            )}

            {/* CATEGORIES */}

            {selectedCard ===
              "categories" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  ...new Set(
                    recentBooks.map(
                      (
                        book
                      ) =>
                        book.category
                    )
                  ),
                ].map(
                  (
                    category,
                    index
                  ) => (
                    <div
                      key={index}
                      className="bg-purple-100 p-8 rounded-2xl shadow-lg text-center"
                    >
                      <h3 className="text-3xl font-bold text-purple-700">
                        📂{" "}
                        {
                          category
                        }
                      </h3>
                    </div>
                  )
                )}
              </div>
            )}

            {/* USERS */}

{selectedCard === "users" && (
  <div className="bg-pink-100 rounded-2xl p-8">

    <h3 className="text-3xl font-bold text-pink-700 mb-5">
      Total Registered Users :
      {registeredUsers}
    </h3>

    {(JSON.parse(
      localStorage.getItem("users")
    ) || []).map((user, index) => (

      <div
        key={index}
        className="bg-white p-5 rounded-2xl shadow mb-4 flex justify-between items-center hover:shadow-xl transition duration-300"
      >

        {/* USER DETAILS */}

        <div>
          <p className="text-2xl font-bold text-black">
            👤 {user.name}
          </p>

          <p className="text-gray-600 text-lg mt-2">
            📧 {user.email}
          </p>
        </div>

        {/* DELETE BUTTON */}

        <button
          onClick={() => {

            // GET USERS
            const users =
              JSON.parse(
                localStorage.getItem(
                  "users"
                )
              ) || [];

            // CONFIRM DELETE
            const confirmDelete =
              window.confirm(
                `Delete ${user.name} ?`
              );

            if (!confirmDelete) return;

            // REMOVE USER
            const updatedUsers =
              users.filter(
                (_, i) => i !== index
              );

            // SAVE UPDATED USERS
            localStorage.setItem(
              "users",
              JSON.stringify(
                updatedUsers
              )
            );

            // UPDATE UI
            setRegisteredUsers(
              updatedUsers.length
            );

            alert(
              "User Deleted Successfully"
            );
          }}

          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold transition duration-300 hover:scale-105"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
)}

            {/* READS */}

            {selectedCard ===
              "reads" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentBooks.map(
                  (
                    book,
                    index
                  ) => (
                    <div
                      key={index}
                      className="bg-green-100 p-6 rounded-2xl shadow-lg"
                    >
                      <h3 className="text-2xl font-bold text-green-700">
                        {
                          book.title
                        }
                      </h3>

                      <p className="text-4xl font-extrabold mt-4">
                        📖{" "}
                        {
                          book.reads
                        }
                      </p>
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
                className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800 hover:scale-105 transition duration-300"
              >
                Add New Book
              </button>

              <button
                onClick={
                  generateReport
                }
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 hover:scale-105 transition duration-300"
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
              className="border p-4 rounded-xl w-full lg:w-80 focus:ring-4 focus:ring-blue-300 outline-none"
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

              <input
                type="text"
                placeholder="Category"
                value={newBook.category}
                onChange={(e) =>
                  setNewBook({
                    ...newBook,
                    category:
                      e.target.value,
                  })
                }
                className="border p-5 rounded-2xl"
              />

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

        {/* BOOK LIST */}

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-10">

            <h2 className="text-4xl font-bold text-blue-700">
              Available Books
            </h2>

            <span className="bg-blue-100 text-blue-700 px-6 py-3 rounded-xl font-bold">
              {filteredBooks.length}
              Books
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {filteredBooks.map(
              (book, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setSelectedBook(
                      book
                    )
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
                      Total Reads:
                      {book.reads}
                    </p>

                    <div className="flex gap-3">

                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          openBook(
                            book.pdf,
                            index
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
                            index
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

        {/* BOOK DETAILS MODAL */}

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

              <p className="text-lg text-gray-700 mb-3">
                <span className="font-bold">
                  Author:
                </span>{" "}
                {selectedBook.author}
              </p>

              <p className="text-lg text-gray-700 mb-3">
                <span className="font-bold">
                  Category:
                </span>{" "}
                {
                  selectedBook.category
                }
              </p>

              <p className="text-lg text-gray-700 mb-3">
                <span className="font-bold">
                  Reads:
                </span>{" "}
                {selectedBook.reads}
              </p>

              <p className="text-gray-600 leading-7 mb-6">
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
          © 2026 E-Library Management
          System | All Rights Reserved
        </div>
      </div>
    </>
  );
}

export default Dashboard;