import tw from 'twin.macro';

export const Footer = (): JSX.Element => {
  return (
    <FooterSection>
      <FooterText>Made with Watmel Berries.</FooterText>
    </FooterSection>
  );
};

/*
 * Styled section
 * Including interfaces
 */
const FooterSection = tw.footer`container p-4 sm:mx-auto`;
const FooterText = tw.p`text-center my-4`;
