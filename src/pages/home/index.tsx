import {
  directionType,
  Grid,
  justifyContentType,
  Typography,
  TypoVariant,
  wrapType,
} from "lib";

import PageBody from "stories/components/PageBody";

const Page = () => {
  return (
    <PageBody>
      <Grid
        container
        spacing={2}
        wrap={wrapType.nowrap}
        direction={directionType.column}
        justifyContent={justifyContentType.center}
      >
        <Grid item>
          <Typography variant={TypoVariant.h1}>메인 홈 화면</Typography>
        </Grid>
      </Grid>
    </PageBody>
  );
};

export default Page;
