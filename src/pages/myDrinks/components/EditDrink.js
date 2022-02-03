import React from "react";
import styles from "../styles.module.css";
import { Dialog, DialogTitle } from "@mui/material";
import { ListItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { userRecepies } from "../../../redux/actions/fetchActions";
import { useDispatch } from "react-redux";
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
        payload: { editData: {  ...newInstructions,...newData } },
      })
    );
    setEditDialog(false)
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
        <TextField
          label="Category"
          value={editData.strAlcoholic}
          onChange={(e) =>
            setEditData({ ...editData, strAlcoholic: e.target.value })
          }
        />
        {Object.keys(editData)
          .filter((el) => el.includes("strIngredient"))
          .map((el) => {
            return (
              <TextField
                label={`${el}`}
                value={editData[el]}
                onChange={(e) =>
                  setEditData({ ...editData, [el]: e.target.value })
                }
              />
            );
          })}

        {Object.keys(editData)
          .filter((el) => el.includes("strMeasure"))
          .map((el) => {
            return (
              <TextField
                label={`${el}`}
                value={editData[el]}
                onChange={(e) =>
                  setEditData({ ...editData, [el]: e.target.value })
                }
              />
            );
          })}

        <button onClick={() => addIngredient()}>Add Ingredient</button>

        {Object.keys(instructions)?.map((el) => {
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

        <button onClick={() => addInstruction()}>Add instruction</button>
      </ListItem>
      <button onClick={handleEdit} style={{backgroundColor:"white",color:"black",padding:".5rem 0",border:"1px solid black",fontWeight:"600"}}>Submit</button>
    </Dialog>
  );
}

export default EditDrink;
