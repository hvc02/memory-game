import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Confetti from "react-confetti";

const FinishDialog = ({ showModal, setShowModal, moves, restartGame }) => {
  function handleClose() {
    setShowModal(false);
  }
  const width = window.innerWidth;
  const height = window.innerHeight;
  return (
    <>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="finish-game-dialog"
      >
        <DialogTitle id="alert-dialog-title">Congratulations!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You completed the game in {moves} moves.
            <br />
            Wanna play again?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="restart-button"
            onClick={restartGame}
            color="primary"
            autoFocus
          >
            Play Again
          </button>
        </DialogActions>
      </Dialog>
      {showModal && <Confetti width={width} height={height} />}
    </>
  );
};

export default FinishDialog;
