function BookCard({ book }) {
  // OPEN PDF
  const openBook = () => {
    window.open(book.pdf, "_blank");
  };

  return (
    <div
      onClick={openBook}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition duration-300"
    >
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-80 object-cover"
      />

      <div className="p-5">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          {book.title}
        </h2>

        <p className="text-gray-600 mb-2">
          Author: {book.author}
        </p>

        <span className="bg-purple-200 text-purple-800 px-4 py-1 rounded-full text-sm font-semibold">
          {book.category}
        </span>

        <button className="mt-5 w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800">
          Read Book
        </button>
      </div>
    </div>
  );
}

export default BookCard;