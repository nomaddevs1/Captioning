
import { Global, css } from '@emotion/react';
import { useColorMode } from '@chakra-ui/react';

const GlobalStyle = () => {
  const { colorMode } = useColorMode();
  const highlightColor = colorMode === 'dark' ? 'rgba(182, 61, 85, 0.7)' : 'rgba(251, 211, 141, 0.7)'; 
  
  return (
    <Global
      styles={css`       
        ::selection {
          background-color: ${highlightColor};
      }`
      }
      />
)
};

export default GlobalStyle
