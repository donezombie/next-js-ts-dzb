import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import ModalMUI from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { TIMEOUT_TO_UNMOUNT_MODAL } from '@/constants/enum';

const style = {
  position: `absolute` as const,
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
  width: 400,
  bgcolor: `background.paper`,
  border: `2px solid #000`,
  boxShadow: 24,
  p: 4,
};

interface ModalI {
  open: boolean;
  toggle: () => void;
  children?: any;
}

const Modal = (props: ModalI) => {
  const { open, toggle, children } = props;

  return (
    <div>
      <ModalMUI
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={toggle}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: TIMEOUT_TO_UNMOUNT_MODAL,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </ModalMUI>
    </div>
  );
};

export default React.memo(Modal);
