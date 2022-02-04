import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { ListItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import styles from "../styles.module.css";
import { userRecepies } from "../../../redux/actions/fetchActions";
import { useDispatch } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
export default function AddNewDrink({ setAddDialog, addDialog }) {
  const [ingredients, setIngredients] = useState({});
  const dispatch = useDispatch();

  const [addData, setAddData] = useState({
    strDrink: "",
    strAlcoholic: "Alcoholic",
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
    setAddDialog(false);
    setTimeout(() => {
      resetValues();
    }, 2000);
  }
  const resetValues = () => {
    setIngredients({});
    setAddData({
      strDrink: "",
      strAlcoholic: "Alcoholic",
      strDrinkThumb: "",
    });
    setInstructions({
      InstructionEng: { language: "Eng", value: "" },
    });
  };
  const strIngredient = Object.keys(ingredients).filter((el) =>
    el.includes("strIngredient")
  );
  const strMeasures = Object.keys(ingredients).filter((el) =>
    el.includes("strMeasure")
  );
  const ingrArray = [];
  var n = 0;
  while (ingrArray.length !== strIngredient.length) {
    ingrArray.push([strIngredient[n], strMeasures[n]]);
    n++;
  }
  return (
    <Dialog
      open={addDialog}
      onClose={() => [setAddDialog(false), resetValues()]}
    >
      <DialogTitle className={styles.dialogTitle}>Add Drink</DialogTitle>
      <ListItem
        style={{ display: "flex", flexDirection: "column" }}
        className={styles.dialog}
      >
        <RadioGroup
          value={addData.strAlcoholic}
          onChange={(e) =>
            setAddData({ ...addData, strAlcoholic: e.target.value })
          }
          style={{ display: "flex", flexDirection: "row" }}
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="Alcoholic"
            style={{ color: "white" }}
            control={<Radio style={{ color: "white" }} />}
            label="Alcoholic"
          />
          <FormControlLabel
            value="nonAlcoholic"
            style={{ color: "white" }}
            control={<Radio style={{ color: "white" }} />}
            label="nonAlcoholic"
          />
        </RadioGroup>
        <TextField
          label="Drink name*"
          value={addData.strDrink}
          onChange={(e) => setAddData({ ...addData, strDrink: e.target.value })}
        />

        <TextField
          label="Image URL*"
          value={addData.strDrinkThumb}
          onChange={(e) =>
            setAddData({ ...addData, strDrinkThumb: e.target.value })
          }
        />

        {ingrArray.map((el) => {
          return (
            <div style={{ display: "flex", flexDirection: "row",justifyContent:"space-between",width:'103%'}}>
              {el.map((elem) => {
                return (
                  <TextField
                    label={`${elem}`}
                    value={ingredients[elem]}
                    onChange={(e) =>
                      setIngredients({ ...ingredients, [elem]: e.target.value })
                    }
         
                  />
                );
              })}
            </div>
          );
        })}
        <button onClick={() => addIngredient()} style={{margin:"1rem 0"}}>add ingredient</button>
        {Object.keys(instructions).map((el) => {
          return (
            <div  style={{ display: "flex", flexDirection: "row",justifyContent:"space-between",width:'103%'}}>
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
            </div>
          );
        })}
        <button onClick={() => addInstruction()} style={{margin:"1rem 0"}}>add Instruction</button>
      </ListItem>
      <button
        disabled={
          !Boolean(addData.strDrink.length && addData.strDrinkThumb.length)
        }
        onClick={addDrink}
        className={styles.submitBTN}
      >
        Submit
      </button>
    </Dialog>
  );
}
