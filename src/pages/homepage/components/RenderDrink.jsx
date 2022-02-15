import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles.module.css";
import { setDoc, doc, deleteField } from "firebase/firestore";
import { auth } from "../../../firebase-config";
import { db } from "../../../firebase-config";
import { useSelector } from "react-redux";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useDispatch } from "react-redux";
import { userRecepies } from "../../../redux/actions/fetchActions";
import { Modal } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {useTranslation} from 'react-i18next'
export default function RenderDrink({ el, category }) {
  const {t} = useTranslation()
  const data = useSelector((data) => data.userDrinks?.data?.favourites);
  const [authModal, setAuthModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const favKeys = data ? Object.keys(data) : [];
  const handleFav = async () => {
    if (auth.currentUser) {
      setLoading(true);
      await setDoc(
        doc(db, "users", auth.currentUser.uid),
        {
          favourites: {
            [el.idDrink]: {
              idDrink: `${el.idDrink}`,
              strDrink: `${el.strDrink}`,
              strDrinkThumb: `${el.strDrinkThumb}`,
              strAlcoholic: `${category}`,
            },
          },
        },
        { merge: true }
      );
      dispatch(userRecepies({ type: "attach" }));
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } else {
      setAuthModal(true);
    }
  };
  const handleUnFav = async () => {
    setLoading(true);
    await setDoc(
      doc(db, "users", auth.currentUser.uid),
      { favourites: { [el.idDrink]: deleteField() } },
      { merge: true }
    );
    dispatch(userRecepies({ type: "attach" }));
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    p: 4,
  };
  return (
    <div style={{ position: "relative" }}>
      <Modal
        open={authModal}
        onClose={() => setAuthModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You need to be Authorized to add drink to favourites
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Link to="/login" className={styles.authBTN}>
              LOGIN
            </Link>{" "}
            <Link to="/register" className={styles.authBTN}>
              REGISTER
            </Link>
          </Typography>
        </Box>
      </Modal>
      <Link to={`/drink?id=${el.idDrink}`} className={styles.link}>
        <div className={styles.drink}>
          <img
            src={el.strDrinkThumb}
            className={styles.drinkImg}
            alt="cocktail"
          />
          <p
            style={{ color: "#9D2A2C", width: "100%", textAlign: "start" }}
            className={styles.cocktailCat}
          >
            {category} {t('cocktail')}
          </p>
          <p
            style={{ textAlign: "start", width: "%", margin: "0" }}
            className={styles.cocktailTitle}
          >
            {el.strDrink}
          </p>
        </div>
      </Link>
      {favKeys && !loading ? (
        favKeys?.includes(`${el.idDrink}`) ? (
          <StarIcon
            className={styles.star}
            id={`star_${el.idDrink}`}
            onClick={() => handleUnFav()}
          />
        ) : (
          <StarOutlineIcon
            className={styles.star}
            id={`star_${el.idDrink}`}
            onClick={() => handleFav()}
          />
        )
      ) : (
        <CircularProgress
          id={`loading_${el.idDrink}`}
          size={25}
          className={styles.loading}
        />
      )}
    </div>
  );
}
