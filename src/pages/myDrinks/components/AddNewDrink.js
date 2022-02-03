import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { ListItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import styles from "../styles.module.css";
import { userRecepies } from "../../../redux/actions/fetchActions";
import { useDispatch } from "react-redux";
export default function AddNewDrink({ setAddDialog, addDialog }) {
  const [ingredients, setIngredients] = useState({});
  const dispatch = useDispatch();

  const [addData, setAddData] = useState({
    strDrink: "",
    strAlcoholic: "",
    strDrinkThumb: "",
  });
  const [instructions, setInstructions] = useState({
    InstructionEng: { language: "Eng", value: "" },
  });

  function addIngredient() {
    const n = Object.keys(ingredients).length / 2 || 0;
    n > 0
      ? setIngredients({
          ...ingredients,
          [`strIngredient${n + 1}`]: "",
          [`strMeasure${n + 1}`]: "",
        })
      : setIngredients({
          [`strIngredient${n + 1}`]: "",
          [`strMeasure${n + 1}`]: "",
        });
  }
  function addInstruction() {
    const n = Object.keys(instructions).length || 0;
    setInstructions({
      ...instructions,
      [`InstructionLang${n + 1}`]: { language: "", value: "" },
    });
  }
  async function addDrink() {
    var strInstructions = {};
    Object.values(instructions).map((el) => {
      el.language == "Eng"
        ? (strInstructions = { strInstructions: `${el.value}` })
        : (strInstructions = {
            ...strInstructions,
            [`strInstructions${el.language}`]: `${el.value}`,
          });
    });
    dispatch(
      userRecepies({
        type: "add",
        payload: { ...addData, ...ingredients, ...strInstructions },
      })
    );
  }
  return (
    <Dialog open={addDialog} onClose={() => setAddDialog(false)}>
      <DialogTitle className={styles.dialogTitle}>Add Drink</DialogTitle>
      <ListItem
        style={{ display: "flex", flexDirection: "column" }}
        className={styles.dialog}
      >
        <TextField
          label="Drink name"
          value={addData.strDrink}
          onChange={(e) => setAddData({ ...addData, strDrink: e.target.value })}
        />
        <TextField
          label="Image URL"
          value={addData.strDrinkThumb}
          onChange={(e) =>
            setAddData({ ...addData, strDrinkThumb: e.target.value })
          }
        />
        <TextField
          label="Category"
          value={addData.strAlcoholic}
          onChange={(e) =>
            setAddData({ ...addData, strAlcoholic: e.target.value })
          }
        />
        {Object.keys(ingredients).map((el) => {
          return (
            <TextField
              label={`${el}`}
              value={ingredients[el]}
              onChange={(e) =>
                setIngredients({ ...ingredients, [el]: e.target.value })
              }
            />
          );
        })}
        <button onClick={() => addIngredient()}>add ingredient</button>
        {Object.keys(instructions).map((el) => {
          return (
            <>
              <TextField
                label={`${el}`}
                value={instructions[el].value}
                onChange={(e) =>
                  setInstructions({
                    ...instructions,
                    [el]: {
                      value: e.target.value,
                      language: instructions[el].language,
                    },
                  })
                }
              />
              <TextField
                label={"language"}
                value={instructions[el].language}
                onChange={(e) =>
                  setInstructions({
                    ...instructions,
                    [el]: {
                      value: instructions[el].value,
                      language: e.target.value,
                    },
                  })
                }
              />
            </>
          );
        })}
        <button onClick={() => addInstruction()}>add Instruction</button>
      </ListItem>
      <button onClick={addDrink} style={{backgroundColor:"white",color:"black",padding:".5rem 0",border:"1px solid black",fontWeight:"600"}}>Submit</button>
    </Dialog>
  );
}
