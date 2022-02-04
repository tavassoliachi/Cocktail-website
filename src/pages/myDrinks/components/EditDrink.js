import React from "react";
import styles from "../styles.module.css";
import { Dialog, DialogTitle } from "@mui/material";
import { ListItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { userRecepies } from "../../../redux/actions/fetchActions";
import { useDispatch } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
function EditDrink({
  editDialog,
  setEditDialog,
  editData,
  setEditData,
  instructions,
  setInstructions,
}) {
  const dispatch = useDispatch();
  function addIngredient() {
    const n = Object.keys(editData).filter((el) =>
      el.includes("strIngredient")
    ).length;
    setEditData({
      ...editData,
      [`strIngredient${n + 1}`]: "",
      [`strMeasure${n + 1}`]: "",
    });
  }
  function addInstruction() {
    const n = Object.keys(instructions).length;
    setInstructions({
      ...instructions,
      [`InstructionLang${n + 1}`]: { language: "", value: "" },
    });
  }
  async function handleEdit() {
    const instrKeys = Object.keys(instructions);
    const editDataKeys = Object.keys(editData).filter(
      (el) => !el.includes("strInstructions")
    );
    var newInstructions = {};
    var newData = {};
    editDataKeys.forEach(
      (el) => (newData = { ...newData, [`${el}`]: editData[el] })
    );
    instrKeys.forEach(
      (el) =>
        (newInstructions = {
          ...newInstructions,
          [`strInstructions${
            instructions[el].language == "Eng" ? "" : instructions[el].language
          }`]: `${instructions[el].value}`,
        })
    );
    dispatch(
      userRecepies({
        type: "edit",
        payload: { editData: { ...newInstructions, ...newData } },
      })
    );
    setEditDialog(false);
  }

  const strIngredient = Object.keys(editData).filter((el) =>
    el.includes("strIngredient")
  );
  const strMeasures = Object.keys(editData).filter((el) =>
    el.includes("strMeasure")
  );
  const ingrArray = [];
  var n = 0;
  while (ingrArray.length !== strIngredient.length) {
    ingrArray.push([strIngredient[n], strMeasures[n]]);
    n++;
  }

  return (
    <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
      <DialogTitle className={styles.dialogTitle}>Edit Drink</DialogTitle>
      <ListItem
        style={{ display: "flex", flexDirection: "column" }}
        className={styles.dialog}
      >
        <TextField
          label="Drink name"
          value={editData.strDrink}
          onChange={(e) =>
            setEditData({ ...editData, strDrink: e.target.value })
          }
        />
        <TextField
          label="Image URL"
          value={editData.strDrinkThumb}
          onChange={(e) =>
            setEditData({ ...editData, strDrinkThumb: e.target.value })
          }
        />
        <RadioGroup
          value={editData.strAlcoholic}
          onChange={(e) =>
            setEditData({ ...editData, strAlcoholic: e.target.value })
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
        {ingrArray.map((el) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "103%",
              }}
            >
              {el.map((elem) => {
                return (
                  <TextField
                    label={`${elem}`}
                    value={editData[elem]}
                    onChange={(e) =>
                      setEditData({ ...editData, [elem]: e.target.value })
                    }
                  />
                );
              })}
            </div>
          );
        })}

        <button onClick={() => addIngredient()} style={{ margin: "1rem 0" }}>
          Add Ingredient
        </button>

        {Object.keys(instructions)?.map((el) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "103%",
              }}
            >
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

        <button onClick={() => addInstruction()} style={{ margin: "1rem 0" }}>
          Add instruction
        </button>
      </ListItem>
      <button
        onClick={handleEdit}
        style={{
          backgroundColor: "white",
          color: "black",
          padding: ".5rem 0",
          border: "1px solid black",
          fontWeight: "600",
        }}
      >
        Submit
      </button>
    </Dialog>
  );
}

export default EditDrink;
