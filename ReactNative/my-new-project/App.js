import React, { useState, Fragment } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";

import GoalItem from "./components/GoalItem.js";
import GoalInput from "./components/GoalInput.js";
export default function App() {
  const [isAddMode, setIsAddMode] = useState(false);

  const [courseGoals, setCourseGoals] = useState([]);

  const addGoalhandler = (enteredGoal) => {
    if(enteredGoal.length === 0)
    {
      return;
    }
    //setCourseGoals([...courseGoals, enteredGoal]); (this is not always 100 guarantee courseGoals state, to get guarantee, use below)
    setCourseGoals((curGoals) => [
      ...curGoals,
      { id: Math.random().toString(), value: enteredGoal },
    ]);
    setIsAddMode(false);
  };

  const onItemDelete = (itemId) => {
    setCourseGoals((curGoals) => {
      return curGoals.filter((curItem) => curItem.id !== itemId);
    });
  };

  const setIsVisible = () => {
    setIsAddMode(!isAddMode);
  };
  return (
    <View style={{ padding: 100 }}>
      <Button
        style={styles.isAddModeButton}
        title="Add New Goals"
        onPress={() => setIsVisible()}
      />
      <GoalInput
        cancelButton={setIsVisible}
        visible={isAddMode}
        addGoalhandler={addGoalhandler}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem onDelete={onItemDelete} itemData={itemData} />
        )}
      />
    </View>
  );
}
styles
const styles = StyleSheet.create({
  screen: {
    padding: 100,
  },
});
