import tw from 'twin.macro';

type Props = {
  text: string;
};

function Loading({ text }: Props): JSX.Element {
  return (
    <LoadingSection>
      <LoadingText>{text}</LoadingText>
    </LoadingSection>
  );
}

// eslint-disable-next-line import/no-default-export
export default Loading;

/*
 * Styled section
 * Including interfaces
 */
const LoadingSection = tw.div`container mx-auto`;
const LoadingText = tw.h1`m-4 text-4xl text-center`;
