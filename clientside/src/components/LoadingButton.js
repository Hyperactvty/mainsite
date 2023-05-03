import React from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@mui/styles'
import { styled } from "@mui/material/styles";
import theme from "../theme";
import { Button,CircularProgress } from '@mui/material';
import Check from '@mui/icons-material/Check';

const _styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const LoadingButton = (props) => {
  const { classes, loading, done, ...other } = props;

  if (done) {
    return (
      <Button className={classes?.button} {...other} /*disabled*/>
        <Check color={"white"}/>
      </Button>
    );
  }
  else if (loading) {
      console.log("Button Loading");
    return (
      <Button className={classes?.button} {...other}>
        <CircularProgress color={"inherit"/** color={theme.palette.common.white} */}/>
      </Button>
    );
  } else {
    return (
      <Button className={classes?.button} {...other} />
    );
  }
}

LoadingButton.defaultProps = {
  loading: false,
  done: false,
  };

LoadingButton.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  done: PropTypes.bool,
};

// export default /*withStyles(styles)*/(LoadingButton);
// export default styled(_styles)(LoadingButton);
export default LoadingButton;

// const StyledButton = styled(Button)(({ theme, color }) => ({
//     minWidth: 0,
//     margin: theme.spacing(0.5),
//     backgroundColor: color ? theme.palette[color].light : undefined
//   }));
  
// export default StyledButton;