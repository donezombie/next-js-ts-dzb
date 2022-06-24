import Link, { LinkProps } from 'next/link';
import { makeStyles } from '@mui/styles';
import { ReactNode } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    textDecoration: `none`,
  },
}));

interface NavLinkI extends LinkProps {
  children: ReactNode;
}

const NavLinkCustom = (props: NavLinkI) => {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Link className={classes.root} {...rest}>
      <a>{children}</a>
    </Link>
  );
};

export default NavLinkCustom;
