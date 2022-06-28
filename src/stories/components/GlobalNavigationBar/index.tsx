import { Link } from "react-router-dom";
import configs from "../../../configs";
import {
  Button,
  Grid,
  Icon,
  Stack,
  Typography,
  useTheme,
} from "@nwaycorp/nwayplay-designsystem-fe";
import { StyledHeader } from "./styles";
import { Fragment, useContext } from "react";
import { ReactComponent as NwayNewLogo } from "../../../assets/icons/logo_nway.svg";
import { useModalContext } from "store/ModalProvider";

const GlobalNavigationBar = () => {
  const theme = useTheme();
  const { setShowModal } = useModalContext();
  return (
    <Fragment>
      <StyledHeader>
        <Grid xs={12} item>
          <Stack direction="row" spacing="200" alignItems="center">
            <a href={configs.NWAYPLAY_DOMAIN || "/"}>
              <Icon size={37}>
                <NwayNewLogo />
              </Icon>
            </a>
            <Link to="/">
              <Typography variant="subtitle1" color={theme.colors.gray[900]}>
                Boilerplate
              </Typography>
            </Link>
          </Stack>
        </Grid>
        <Button
          color="gray"
          size="m"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <Typography variant="h9">Start</Typography>
        </Button>
      </StyledHeader>
    </Fragment>
  );
};

export default GlobalNavigationBar;
