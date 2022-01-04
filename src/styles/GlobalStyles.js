import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body {
  width: 100vw;
  overflow-x: hidden;
  color: #ffffff;
  background-color: #332222;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
button,
ul,
ol,
li {
  margin-top: 0;
  margin-bottom: 0;
}

ul {
  padding-left: 0;
}

img,
a, 
svg
 {
  display: block;
}

img {
  max-width: 100%;
  height: auto;
}

button {
  overflow: hidden;
  padding: 5px;
  border: none;
}

.link {
  text-decoration: none;
  color: inherit;
}

.list {
  list-style: none;
}
`;
