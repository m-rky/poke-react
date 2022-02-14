/* eslint-disable @typescript-eslint/no-explicit-any */
import tw from 'twin.macro';

type Props = {
  goToNextPage?: any;
  goToPrevPage?: any;
};

function Paginate({ goToNextPage, goToPrevPage }: Props): JSX.Element {
  return (
    <PaginateContainer>
      {goToPrevPage && (
        <PaginateButton onClick={goToPrevPage}>Previous Page</PaginateButton>
      )}
      {goToNextPage && (
        <PaginateButton onClick={goToNextPage}>Next Page</PaginateButton>
      )}
    </PaginateContainer>
  );
}

// eslint-disable-next-line import/no-default-export
export default Paginate;

/*
 * Styled section
 * Including interfaces
 */
const PaginateContainer = tw.div`flex py-4 m-4 justify-evenly`;
const PaginateButton = tw.button`font-bold rounded py-2 px-4 sm:py-4 sm:px-8 shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl`;
