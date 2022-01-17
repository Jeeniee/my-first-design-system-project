import * as styles from "./styles";

const Container = ({ children }: { children?: React.ReactNode }) => {
  return <div css={styles.ContainerStyle}>{children}</div>;
};

export default Container;
