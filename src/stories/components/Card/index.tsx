import { ReactNode } from "react";
import * as styles from "./styles";

const Card = ({ page, children }: { page?: boolean; children?: ReactNode }) => {
  return (
    <div css={styles.CardStyle} className={`card-page-${page}`}>
      {children}
    </div>
  );
};

export default Card;
