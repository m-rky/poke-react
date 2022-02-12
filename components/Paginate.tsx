import tw from 'twin.macro';

interface Props {
  goToNextPage?: any;
  goToPrevPage?: any;
}

const Paginate = ({ goToNextPage, goToPrevPage }: Props): JSX.Element => {
  return (
    <PaginateContainer>
      {goToPrevPage && <PaginateButton onClick={goToPrevPage}>Previous Page</PaginateButton>}
      {goToNextPage && <PaginateButton onClick={goToNextPage}>Next Page</PaginateButton>}
    </PaginateContainer>
  );
};

export default Paginate;

/*
 * Styled section
 * Including interfaces
 */
const PaginateContainer = tw.div`flex py-4 m-4 justify-evenly`;
const PaginateButton = tw.button`font-bold rounded py-2 px-4 sm:py-4 sm:px-8 shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl`;
