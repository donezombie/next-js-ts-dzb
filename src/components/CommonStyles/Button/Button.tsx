import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { makeStyles } from '@mui/styles';
import { LoadingButtonProps } from '@mui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    // borderRadius: `${theme.spacing(3)} !important`,
  },
  div: {
    // width: theme.spacing(3),
  },
}));

interface StyledButtonI extends LoadingButtonProps {
  children?: any;
  style?: object;
  loading?: boolean;
}

const StyledButton = (props: StyledButtonI) => {
  const { children, style, ...rest } = props;
  const classes = useStyles();

  return (
    <LoadingButton {...rest} sx={{ ...style }} className={classes.root}>
      {children}
    </LoadingButton>
  );
};

export default StyledButton;
