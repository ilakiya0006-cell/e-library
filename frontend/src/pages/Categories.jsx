import { useState } from "react";

import Navbar from "../components/Navbar";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

function Categories() {

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

      books: 12,

      bookList:
        generateBooks(
          12,
          "Programming",
          "https://m.media-amazon.com/images/I/61IswaR8YBL.jpg",
          programmingPDFs
        ),
    },

    {
      name: "History",

      description:
        "Explore Indian history, world wars, kings, freedom fighters and ancient civilizations.",

      image:
        "https://images.unsplash.com/photo-1461360228754-6e81c478b882",

      books: 10,

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
        "Read books about physics, chemistry, biology, astronomy and discoveries.",

      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d",

      books: 15,

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
        "Enjoy adventure stories, novels, fantasy books and emotional stories.",

      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794",

      books: 18,

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
        "Read funny cartoon stories, kids comics and animated adventures.",

      image:
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353",

      books: 10,

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
        "Learn investing, business, stock market and financial freedom.",

      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",

      books: 10,

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
  // STATES
  // =====================================

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState(null);

  const [showBooks, setShowBooks] =
    useState(false);

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
        className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-8"
      >

        {/* TITLE */}

        <div className="text-center mb-14">

          <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
            Book Categories
          </h1>

          <p className="text-xl text-gray-700">
            Explore different types of
            books in your E-Library
          </p>

        </div>

        {/* CATEGORY CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {categories.map(
            (category, index) => (

              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={{
                  scale: 1.05,
                }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl"
              >

                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-60 object-cover"
                />

                <div className="p-6">

                  <h2 className="text-3xl font-bold text-blue-700 mb-3">
                    {category.name}
                  </h2>

                  <p className="text-gray-600 mb-4">
                    {
                      category.description
                    }
                  </p>

                  <div className="flex justify-between items-center">

                    <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-xl font-semibold">
                      {category.books}
                      {" "}Books
                    </span>

                    <button
                      onClick={() => {
                        setSelectedCategory(
                          category
                        );

                        setShowBooks(
                          false
                        );
                      }}
                      className="bg-blue-700 text-white px-5 py-2 rounded-xl hover:bg-blue-800"
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
              exit={{ opacity: 0 }}
              className="bg-white mt-16 p-10 rounded-3xl shadow-2xl"
            >

              <div className="flex flex-col lg:flex-row gap-10">

                <img
                  src={
                    selectedCategory.image
                  }
                  className="w-full lg:w-96 h-80 object-cover rounded-3xl"
                  alt=""
                />

                <div>

                  <h2 className="text-5xl font-extrabold text-blue-700 mb-5">
                    {
                      selectedCategory.name
                    }
                  </h2>

                  <p className="text-lg text-gray-700 mb-6">
                    {
                      selectedCategory.description
                    }
                  </p>

                  <div className="bg-purple-100 text-purple-700 inline-block px-6 py-3 rounded-2xl text-xl font-bold">
                    Total Books :
                    {" "}
                    {
                      selectedCategory.books
                    }
                  </div>

                  <div className="mt-8">

                    <button
                      onClick={() =>
                        setShowBooks(
                          true
                        )
                      }
                      className="bg-green-600 text-white px-8 py-3 rounded-2xl hover:bg-green-700"
                    >
                      Explore Books
                    </button>

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

                    <h2 className="text-4xl font-bold text-purple-700 mb-8">
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
                            className="bg-gray-100 rounded-3xl overflow-hidden shadow-lg"
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
                                Author:
                                {" "}
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
                                className="w-full mt-4 bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800"
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

        <div className="text-center mt-20 text-gray-600 text-lg">
          © 2026 E-Library Management
          System
        </div>

      </motion.div>
    </>
  );
}

export default Categories;