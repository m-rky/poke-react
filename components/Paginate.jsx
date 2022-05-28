function Paginate({ goToNextPage, goToPrevPage }) {
  return (
    <div className="flex py-4 m-4 justify-evenly">
      {goToPrevPage && (
        <button
          type="button"
          className="font-bold rounded py-2 px-4 sm:py-4 sm:px-8 shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
          onClick={goToPrevPage}
        >
          Previous Page
        </button>
      )}
      {goToNextPage && (
        <button
          type="button"
          className="font-bold rounded py-2 px-4 sm:py-4 sm:px-8 shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
          onClick={goToNextPage}
        >
          Next Page
        </button>
      )}
    </div>
  );
}

export default Paginate;
