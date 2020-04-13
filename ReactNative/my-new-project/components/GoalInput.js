import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  Modal,
} from "react-native";

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState("");

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goal"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
          <View style= {styles.button}>
            <Button
              title="ADD"
              onPress={() => {
                props.addGoalhandler(enteredGoal);
                setEnteredGoal("");
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Cancel"
              color="red"
              onPress={() => {
                props.cancelButton();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "55%",
    justifyContent: "space-evenly",
    padding: 10,
  },
  button: {
    width: "40%",
  },
});
export default GoalInput;
