import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userRecepies } from "../../redux/actions/fetchActions";
import RenderDrink from "../homepage/components/RenderDrink";
import GenerateDrink from "./components/generateDrink";
import { Link } from "react-router-dom";
import EditDrink from "./components/EditDrink";
import AddNewDrink from "./components/AddNewDrink";
import styles from "./styles.module.css";
export default function MyDrinks() {
  const dispatch = useDispatch();
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
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


  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1  className={styles.title}>Your Drinks</h1>
        <button onClick={() => setAddDialog(true)} className={styles.addButton}>
          add
        </button>
      </div>

      <div className={styles.drinksCont}>
        {drinks &&
          Object.keys(drinks)?.map((elem) => {
            const el = drinks[elem];
            return (
              <div className={styles.drink}>
                <Link to={`/myDrinks/drink?id=${elem}`}>
                  <GenerateDrink el={el} category={el.strAlcoholic} />
                </Link>
                <div className={styles.buttonsCont}>
                  <button onClick={() => handleEditOpen(el, elem)}>Edit</button>
                  <button onClick={() => deleteDrink(elem)}>Delete</button>
                </div>
              </div>
            );
          })}
      </div>
     { Object.keys(favDrinks).length && <h1 className={styles.title}>Favourite Drinks</h1>}
      <div className={styles.drinksCont}>
        {favDrinks &&
          Object.keys(favDrinks).map((el) => {
            return (
              <div className={styles.drink}>
                <RenderDrink
                  el={favDrinks[el]}
                  category={favDrinks[el].strAlcoholic}
                />
              </div>
            );
          }) }
      </div>
      <AddNewDrink addDialog={addDialog} setAddDialog={setAddDialog} />
      <EditDrink
        editDialog={editDialog}
        setEditDialog={setEditDialog}
        editData={editData}
        setEditData={setEditData}
        instructions={instructions}
        seInstructions={setInstructions}
      />
    </div>
  );
}
