import tw from 'twin.macro';

interface Props {
  text: string;
}

const Loading = ({ text }: Props): JSX.Element => {
  return (
    <LoadingSection>
      <LoadingText>{text}</LoadingText>
    </LoadingSection>
  );
};

export default Loading;

/*
 * Styled section
 * Including interfaces
 */
const LoadingSection = tw.div`container mx-auto`;
const LoadingText = tw.h1`m-4 text-4xl text-center`;
