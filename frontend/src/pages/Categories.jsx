import { useState } from "react";

import Navbar from "../components/Navbar";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

function Categories() {

  // =====================================
  // STATES
  // =====================================

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState(null);

  const [showBooks, setShowBooks] =
    useState(false);

  const [search, setSearch] =
    useState("");

  // =====================================
  // GENERATE BOOKS
  // =====================================

  const generateBooks = (
    count,
    categoryName,
    image,
    pdfs
  ) => {
    return Array.from(
      { length: count },
      (_, index) => ({
        title: `${categoryName} Book ${index + 1}`,

        author: `${categoryName} Author ${index + 1}`,

        image: image,

        pdf:
          pdfs[
            index % pdfs.length
          ],
      })
    );
  };

  // =====================================
  // PDF LINKS
  // =====================================

  const programmingPDFs = [
    "https://eloquentjavascript.net/Eloquent_JavaScript.pdf",

    "https://www.tutorialspoint.com/reactjs/reactjs_tutorial.pdf",

    "https://www.tutorialspoint.com/nodejs/nodejs_tutorial.pdf",

    "https://www.tutorialspoint.com/javascript/javascript_tutorial.pdf",
  ];

  const historyPDFs = [
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",

    "https://www.orimi.com/pdf-test.pdf",
  ];

  const sciencePDFs = [
    "https://www.orimi.com/pdf-test.pdf",

    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  ];

  const technologyPDFs = [
    "https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_tutorial.pdf",

    "https://www.tutorialspoint.com/machine_learning/machine_learning_tutorial.pdf",
  ];

  const storyPDFs = [
    "https://www.africau.edu/images/default/sample.pdf",

    "https://www.orimi.com/pdf-test.pdf",
  ];

  const cartoonPDFs = [
    "https://www.africau.edu/images/default/sample.pdf",

    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  ];

  const financePDFs = [
    "https://archive.org/download/RichDadPoorDad_201905/Rich-Dad-Poor-Dad.pdf",

    "https://dn790007.ca.archive.org/0/items/atomic-habits-pdfdrive/Atomic%20Habits%20%28%20PDFDrive%20%29.pdf",
  ];

  // =====================================
  // CATEGORY DATA
  // =====================================

  const categories = [
    {
      name: "Programming",

      description:
        "Learn MERN Stack, React, Node.js, JavaScript and modern web development.",

      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",

      books: 10,

      color:
        "from-cyan-400 via-blue-500 to-indigo-500",

      bookList:
        generateBooks(
          10,
          "Programming",
          "https://m.media-amazon.com/images/I/61IswaR8YBL.jpg",
          programmingPDFs
        ),
    },

    {
      name: "History",

      description:
        "Explore Indian history, world wars, kings and ancient civilizations.",

      image:
        "https://images.unsplash.com/photo-1461360228754-6e81c478b882",

      books: 10,

      color:
        "from-orange-400 via-red-500 to-pink-500",

      bookList:
        generateBooks(
          10,
          "History",
          "https://m.media-amazon.com/images/I/71c5U8M9J7L.jpg",
          historyPDFs
        ),
    },

    {
      name: "Science",

      description:
        "Read books about physics, chemistry, biology and discoveries.",

      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d",

      books: 15,

      color:
        "from-green-400 via-emerald-500 to-teal-500",

      bookList:
        generateBooks(
          15,
          "Science",
          "https://m.media-amazon.com/images/I/81a4kCNuH+L.jpg",
          sciencePDFs
        ),
    },

    {
      name: "Technology",

      description:
        "Discover AI, Machine Learning, Cloud Computing and Cyber Security.",

      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475",

      books: 14,

      color:
        "from-purple-400 via-pink-500 to-rose-500",

      bookList:
        generateBooks(
          14,
          "Technology",
          "https://m.media-amazon.com/images/I/71wMZ14QhFL.jpg",
          technologyPDFs
        ),
    },

    {
      name: "Story Books",

      description:
        "Enjoy adventure stories, novels and fantasy books.",

      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794",

      books: 18,

      color:
        "from-fuchsia-500 via-pink-500 to-rose-500",

      bookList:
        generateBooks(
          18,
          "Story",
          "https://m.media-amazon.com/images/I/81gepf1eMqL.jpg",
          storyPDFs
        ),
    },

    {
      name: "Cartoon Books",

      description:
        "Read funny cartoon stories and animated adventures.",

      image:
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353",

      books: 10,

      color:
        "from-yellow-400 via-orange-500 to-red-500",

      bookList:
        generateBooks(
          10,
          "Cartoon",
          "https://m.media-amazon.com/images/I/81fyoFoAxFL.jpg",
          cartoonPDFs
        ),
    },

    {
      name: "Finance",

      description:
        "Learn investing, business and financial freedom.",

      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",

      books: 10,

      color:
        "from-lime-400 via-green-500 to-emerald-600",

      bookList:
        generateBooks(
          10,
          "Finance",
          "https://tse3.mm.bing.net/th/id/OIP.3zwEgPw_jT-CH50aC10whgHaGd?pid=Api&P=0&h=180",
          financePDFs
        ),
    },
  ];

  // =====================================
  // OPEN PDF
  // =====================================

  const openBook = (pdf) => {
    window.open(pdf, "_blank");
  };

  // =====================================
  // ANIMATION
  // =====================================

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },

    visible: (i = 1) => ({
      opacity: 1,

      y: 0,

      transition: {
        delay: i * 0.1,
      },
    }),
  };

  return (
    <>
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-8"
      >

        {/* TITLE */}

        <div className="text-center mb-14">

          <motion.h1
            initial={{
              y: -40,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            className="text-6xl font-extrabold text-white mb-5"
          >
            📚 E-Library Categories
          </motion.h1>

          <p className="text-xl text-pink-100">
            Discover amazing books
            from colorful categories
          </p>

          {/* SEARCH */}

          <div className="mt-8 flex justify-center">

            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full md:w-[500px] px-6 py-4 rounded-2xl outline-none text-lg shadow-2xl"
            />

          </div>

        </div>

        {/* CATEGORY CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {categories
            .filter((category) =>
              category.name
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            )
            .map(
              (
                category,
                index
              ) => (

                <motion.div
                  key={index}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                  }}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
                >

                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-60 object-cover"
                  />

                  <div
                    className={`h-2 bg-gradient-to-r ${category.color}`}
                  />

                  <div className="p-6">

                    <h2 className="text-3xl font-bold text-white mb-3">
                      {category.name}
                    </h2>

                    <p className="text-gray-200 mb-4">
                      {
                        category.description
                      }
                    </p>

                    <div className="flex justify-between items-center">

                      <span
                        className={`bg-gradient-to-r ${category.color} text-white px-4 py-2 rounded-xl font-bold shadow-lg`}
                      >
                        {
                          category.books
                        }{" "}
                        Books
                      </span>

                      <button
                        onClick={() => {
                        setSelectedCategory(
                          category
                        );

                        setShowBooks(true);

                        setTimeout(() => {
                        window.scrollTo({
                        top:
                        document.body.scrollHeight,
                        behavior: "smooth"
                    });
                      }, 50);
                      }}
                        className={`bg-gradient-to-r ${category.color} text-white px-5 py-2 rounded-xl hover:scale-105 duration-300`}
                      >
                        View
                      </button>

                    </div>

                  </div>

                </motion.div>
              )
            )}

        </div>

        {/* CATEGORY DETAILS */}

        <AnimatePresence>

          {selectedCategory && (

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 mt-16 p-10 rounded-3xl shadow-2xl text-white"
            >

              {/* CLOSE BUTTON */}

              <div className="flex justify-end mb-5">

                <button
                  onClick={() =>
                    setSelectedCategory(
                      null
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                >
                  Close
                </button>

              </div>

              <div className="flex flex-col lg:flex-row gap-10">

                <img
                  src={
                    selectedCategory.image
                  }
                  className="w-full lg:w-96 h-80 object-cover rounded-3xl"
                  alt=""
                />

                <div>

                  <h2 className="text-5xl font-extrabold text-yellow-300 mb-5">
                    {
                      selectedCategory.name
                    }
                  </h2>

                  <p className="text-lg text-gray-200 mb-6">
                    {
                      selectedCategory.description
                    }
                  </p>

                  <div
                    className={`bg-gradient-to-r ${selectedCategory.color} text-white inline-block px-6 py-3 rounded-2xl text-xl font-bold`}
                  >
                    Total Books :{" "}
                    {
                      selectedCategory.books
                    }
                  </div>
              
                </div>

              </div>

              {/* BOOKS */}

              <AnimatePresence>

                {showBooks && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="mt-14"
                  >

                    <h2 className="text-4xl font-bold text-pink-200 mb-8">
                      Books in{" "}
                      {
                        selectedCategory.name
                      }
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                      {selectedCategory.bookList.map(
                        (
                          book,
                          index
                        ) => (

                          <motion.div
                            key={index}
                            whileHover={{
                              scale: 1.05,
                            }}
                            className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-pink-500/40"
                          >

                            <img
                              src={book.image}
                              className="w-full h-72 object-cover"
                              alt=""
                            />

                            <div className="p-5">

                              <h3 className="text-2xl font-bold text-blue-700">
                                {
                                  book.title
                                }
                              </h3>

                              <p className="text-gray-600">
                                Author :{" "}
                                {
                                  book.author
                                }
                              </p>

                              <button
                                onClick={() =>
                                  openBook(
                                    book.pdf
                                  )
                                }
                                className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl hover:scale-105 duration-300"
                              >
                                Read Book
                              </button>

                            </div>

                          </motion.div>
                        )
                      )}

                    </div>

                  </motion.div>
                )}

              </AnimatePresence>

            </motion.div>
          )}

        </AnimatePresence>

        {/* FOOTER */}

        <div className="text-center mt-20 text-pink-100 text-lg">
          ✨ © 2026 E-Library Management System ✨
        </div>

      </motion.div>
    </>
  );
}

export default Categories;