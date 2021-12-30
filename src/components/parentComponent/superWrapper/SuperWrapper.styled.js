import styled from "styled-components";

export const SuWrapp = styled.div.attrs((props) => {
  const { opacity, transform } = props.animation;
  const { theme, delay } = props;

  const transition = Object.keys(props.animation)
    .filter((key) => key)
    .map((key) => `${key} ${delay}ms linear`)
    .join(",");

  const trans = Object.keys(transform)
    .map((key) => `${key}(${transform[key]})`)
    .join(" ");

  return {
    theme,
    opacity: opacity !== undefined ? opacity : 1,
    transform: trans,
    transition,
  };
})`
  opacity: ${({ opacity }) => opacity};
  transform: ${({ transform }) => transform};
  transition: ${({ transition }) => transition};
`;
