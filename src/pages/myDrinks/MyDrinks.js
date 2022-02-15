import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userRecepies } from "../../redux/actions/fetchActions";
import GenerateDrink from "./components/generateDrink";
import { Link } from "react-router-dom";
import EditDrink from "./components/EditDrink";
import AddNewDrink from "./components/AddNewDrink";
import styles from "./styles.module.css";
import { CircularProgress } from "@mui/material";
import { auth } from "../../firebase-config";
import FavDrinks from "./components/FavDrinks";
import { Helmet } from "react-helmet";
export default function MyDrinks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [myDrinksN, setMyDrinksN] = useState(8);
  const [drinksLoading, setDrinksLoading] = useState(false);
  const [editData, setEditData] = useState({
    strDrink: "",
    strAlcoholic: "",
    strDrinkThumb: "",
    idDrink: "",
  });
  const [instructions, setInstructions] = useState({
    InstructionEng: { language: "Eng", value: "" },
  });
  const drinks = useSelector((data) => data.userDrinks.data?.drinks);
  const favDrinks = useSelector((data) => data.userDrinks.data?.favourites);

  async function deleteDrink(id) {
    dispatch(userRecepies({ type: "delete", payload: { id: `${id}` } }));
  }

  function handleEditOpen(el, elem) {
    setEditData({ ...el, idDrink: `${elem}` });
    var instList = {};
    const insrtKeys = Object.keys(el).filter((el) =>
      el.includes("strInstructions")
    );
    insrtKeys.forEach((elm, index) => {
      instList = {
        ...instList,
        [`InstructionLang${index + 1}`]: {
          language: `${elm.substring(15) || "Eng"}`,
          value: `${el[elm]}`,
        },
      };
    });
    setInstructions(instList);
    setEditDialog(true);
  }
  useEffect(() => {
    !auth.currentUser && navigate("/");
  }, [auth.currentUser]);

  return (
    <div style={{display:"flex",flexDirection:"column"}}>
      <Helmet>
        <title>My Drinks</title>
      </Helmet>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className={styles.title}>Your Drinks</h1>
        <button onClick={() => setAddDialog(true)} className={styles.addButton}>
          add
        </button>
      </div>

      <div className={styles.drinksCont}>
        {drinks &&
          Object.keys(drinks)
            ?.slice(0, myDrinksN)
            .map((elem) => {
              const el = drinks[elem];
              return (
                <div className={styles.drink}>
                  <Link to={`/myDrinks/drink?id=${elem}`}>
                    <GenerateDrink el={el} category={el.strAlcoholic} />
                  </Link>
                  <div className={styles.buttonsCont}>
                    <button onClick={() => handleEditOpen(el, elem)}>
                      Edit
                    </button>
                    <button onClick={() => deleteDrink(elem)}>Delete</button>
                  </div>
                </div>
              );
            })}
        {drinksLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <CircularProgress />
          </div>
        )}
        {drinks && Object.keys(drinks).length > myDrinksN && (
          <button
            className={styles.showMore}
            onClick={() => [setDrinksLoading(true),setTimeout(function(){setDrinksLoading(false);setMyDrinksN(myDrinksN+8)},2000)]}
          >
            Show more
          </button>
        )}
      </div>
          <FavDrinks/>

      <AddNewDrink addDialog={addDialog} setAddDialog={setAddDialog} />
      <EditDrink
        editDialog={editDialog}
        setEditDialog={setEditDialog}
        editData={editData}
        setEditData={setEditData}
        instructions={instructions}
        setInstructions={setInstructions}
      />
    </div>
  );
}
