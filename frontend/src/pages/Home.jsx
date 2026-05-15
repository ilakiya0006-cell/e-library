import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  // BOOK DATA
  const books = [
    {
      title: "React Guide",

      author: "Facebook",

      category: "Programming",

      image:
        "https://m.media-amazon.com/images/I/6132FVQ5ZQL.jpg",

      pdf:
        "https://www.tutorialspoint.com/reactjs/reactjs_tutorial.pdf",
    },

    {
      title: "Node JS Mastery",

      author: "Ryan Dahl",

      category: "Programming",

      image:
        "https://m.media-amazon.com/images/I/51WIKlio9qL.jpg",

      pdf:
        "https://www.tutorialspoint.com/nodejs/nodejs_tutorial.pdf",
    },

    {
      title: "JavaScript Guide",

      author: "Brendan Eich",

      category: "Programming",

      image:
        "https://m.media-amazon.com/images/I/51gdVAEfPUL.jpg",

      pdf:
        "https://www.tutorialspoint.com/javascript/javascript_tutorial.pdf",
    },
  ];

  return (
    <>
      <Navbar />

      <motion.div

        initial={{
          opacity: 0,
        }}

        animate={{
          opacity: 1,
        }}

        transition={{
          duration: 1,
        }}

        className="min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 overflow-hidden"
      >

        {/* HERO SECTION */}

        <div className="container mx-auto px-10 py-20 grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE */}

          <motion.div

            initial={{
              opacity: 0,
              x: -100,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              duration: 1,
            }}
          >

            <h2 className="text-5xl font-extrabold text-white leading-tight">

              Welcome To Digital <br />
              E-Library

            </h2>

            <p className="text-white text-xl mt-6 leading-8">

              Discover thousands of books
              in Programming, Finance,
              Technology, Self Help,
              Science, and many more
              categories.

            </p>

            <div className="flex gap-5 mt-10 flex-wrap">

              {/* EXPLORE BOOKS BUTTON */}

              <motion.button

                whileHover={{
                  scale: 1.1,
                }}

                whileTap={{
                  scale: 0.9,
                }}

                onClick={() =>
                  navigate("/categories")
                }

                className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:bg-blue-100 transition duration-300"
              >
                Explore Books
              </motion.button>

              {/* LEARN MORE BUTTON */}

              <motion.button

                whileHover={{
                  scale: 1.1,
                }}

                whileTap={{
                  scale: 0.9,
                }}

                onClick={() => {

                  const section =
                    document.getElementById(
                      "learn-more-section"
                    );

                  section?.scrollIntoView({
                    behavior: "smooth",
                  });

                }}

                className="bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:bg-gray-800 transition duration-300"
              >
                Learn More
              </motion.button>

            </div>
          </motion.div>

          {/* RIGHT SIDE IMAGE */}

          <motion.div

            initial={{
              opacity: 0,
              y: 100,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 1.2,
            }}

            className="flex justify-center"
          >

            <motion.img

              animate={{
                y: [0, -20, 0],
              }}

              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}

              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

              alt="library"

              className="w-[450px]"
            />

          </motion.div>
        </div>

        {/* FEATURE SECTION */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 mb-20">

          <motion.div

            whileHover={{
              scale: 1.08,
              rotate: 2,
            }}

            className="bg-white p-8 rounded-3xl shadow-2xl text-center"
          >

            <h2 className="text-4xl font-extrabold text-blue-700 mb-4">
              5000+
            </h2>

            <p className="text-gray-600 text-lg">
              Digital Books Available
            </p>

          </motion.div>

          <motion.div

            whileHover={{
              scale: 1.08,
              rotate: -2,
            }}

            className="bg-white p-8 rounded-3xl shadow-2xl text-center"
          >

            <h2 className="text-4xl font-extrabold text-purple-700 mb-4">
              24/7
            </h2>

            <p className="text-gray-600 text-lg">
              Online Reading Access
            </p>

          </motion.div>

          <motion.div

            whileHover={{
              scale: 1.08,
              rotate: 2,
            }}

            className="bg-white p-8 rounded-3xl shadow-2xl text-center"
          >

            <h2 className="text-4xl font-extrabold text-pink-700 mb-4">
              100%
            </h2>

            <p className="text-gray-600 text-lg">
              Free Learning Resources
            </p>

          </motion.div>

        </div>

        {/* BOOK SECTION */}

        <motion.div

          initial={{
            opacity: 0,
            y: 50,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 1,
          }}

          className="px-10 mb-20"
        >

          <h2 className="text-5xl font-extrabold text-white mb-12 text-center">
            Popular Books
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {books.map(
              (book, index) => (

                <motion.div

                  key={index}

                  whileHover={{
                    scale: 1.05,
                    y: -10,
                  }}

                  whileTap={{
                    scale: 0.95,
                  }}

                  transition={{
                    duration: 0.3,
                  }}
                >

                  <BookCard book={book} />

                </motion.div>
              )
            )}

          </div>

        </motion.div>

        {/* LEARN MORE SECTION */}

        <motion.div

          id="learn-more-section"

          initial={{
            opacity: 0,
            y: 100,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 1,
          }}

          viewport={{
            once: true,
          }}

          className="px-10 mb-20"
        >

          <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-10 shadow-2xl">

            <h2 className="text-5xl font-extrabold text-white text-center mb-10">
              Why Choose Our E-Library?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -10,
                }}
                className="bg-white rounded-3xl p-8 text-center shadow-xl"
              >

                <h2 className="text-4xl mb-4">
                  📚
                </h2>

                <h3 className="text-2xl font-bold text-blue-700 mb-3">
                  Huge Collection
                </h3>

                <p className="text-gray-600 leading-7">
                  Access thousands of books
                  from multiple categories.
                </p>

              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -10,
                }}
                className="bg-white rounded-3xl p-8 text-center shadow-xl"
              >

                <h2 className="text-4xl mb-4">
                  ⚡
                </h2>

                <h3 className="text-2xl font-bold text-purple-700 mb-3">
                  Fast Access
                </h3>

                <p className="text-gray-600 leading-7">
                  Read books instantly anytime
                  without waiting.
                </p>

              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -10,
                }}
                className="bg-white rounded-3xl p-8 text-center shadow-xl"
              >

                <h2 className="text-4xl mb-4">
                  🌍
                </h2>

                <h3 className="text-2xl font-bold text-pink-700 mb-3">
                  Learn Anywhere
                </h3>

                <p className="text-gray-600 leading-7">
                  Use mobile, tablet, or laptop
                  from anywhere in the world.
                </p>

              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -10,
                }}
                className="bg-white rounded-3xl p-8 text-center shadow-xl"
              >

                <h2 className="text-4xl mb-4">
                  🎓
                </h2>

                <h3 className="text-2xl font-bold text-green-700 mb-3">
                  Skill Development
                </h3>

                <p className="text-gray-600 leading-7">
                  Improve programming and
                  professional skills easily.
                </p>

              </motion.div>

            </div>

          </div>

        </motion.div>

        {/* EXTRA ANIMATION SECTION */}

        <div className="px-10 mb-20">

          <motion.div

            animate={{
              y: [0, -12, 0],
            }}

            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}

            whileHover={{
              scale: 1.03,
            }}

            className="bg-white rounded-3xl p-10 shadow-2xl text-center"
          >

            <h2 className="text-3xl font-extrabold text-blue-700 mb-5">
              🚀 Learn Anytime Anywhere
            </h2>

            <p className="text-gray-600 text-lg leading-8">
              Read books online and improve
              your skills from anywhere in
              the world with our Digital
              E-Library platform.
            </p>

          </motion.div>

        </div>

        {/* FOOTER */}

        <motion.div

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          transition={{
            delay: 1,
            duration: 1,
          }}

          className="bg-black text-center py-12"
        >

          <p className="text-gray-300 mb-3 hover:text-blue-400 hover:translate-x-2 transition duration-300 cursor-pointer">
            📧 support@elibrary.com
          </p>

          <p className="text-gray-300 mb-3 hover:text-green-400 hover:translate-x-2 transition duration-300 cursor-pointer">
            📞 +91 9876543210
          </p>

          <p className="text-gray-300 mb-5 hover:text-pink-400 hover:translate-x-2 transition duration-300 cursor-pointer">
            📍 Chennai, Tamil Nadu, India
          </p>

          <p className="text-gray-400 text-lg">
            © 2026 E-Library Management System |
            Built With React & Tailwind CSS
          </p>

        </motion.div>

      </motion.div>
    </>
  );
}

export default Home;