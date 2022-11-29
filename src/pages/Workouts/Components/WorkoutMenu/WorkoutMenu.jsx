import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Skeleton } from "moti/skeleton";

export default function WorkoutMenu({
  userWorkouts,
  workoutTypeIndex,
  setWorkoutTypeIndex,
  isLoading,
  setWorkoutIndex,
}) {
  const setWorkouts = new Set();

  function handleMenuItemPress(index) {
    setWorkoutIndex(0);
    setWorkoutTypeIndex(index);
  }

  const filterWorkouts = userWorkouts.filter((workouts) => {
    const duplicatedWorkout = setWorkouts.has(workouts.workoutInfos.name);
    setWorkouts.add(workouts.workoutInfos.name);
    return !duplicatedWorkout;
  });

  return (
    <Skeleton isLoading={isLoading}>
      <View style={styles.workoutMenu}>
        {!isLoading ? (
          <>
            {filterWorkouts
              .filter((e) => e.workoutInfos.name != undefined)
              .filter((e, index) => userWorkouts.indexOf(e) === index)
              .sort((a, b) => a.workoutInfos.name > b.workoutInfos.name)
              .map((workoutDay, index) => {
                return (
                  <Text
                    key={index}
                    onPress={() => handleMenuItemPress(index)}
                    style={
                      workoutTypeIndex == index
                        ? styles.active
                        : styles.inactive
                    }
                  >
                    {workoutDay.workoutInfos.name}
                  </Text>
                );
              })}
          </>
        ) : (
          <></>
        )}
      </View>
    </Skeleton>
  );
}

const styles = StyleSheet.create({
  workoutMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 1,
  },
  active: {
    color: "#45C4B0",
    fontWeight: "bold",
    borderBottomColor: "#45C4B0",
    paddingBottom: 5,
    borderBottomWidth: 3,
    zIndex: 1,
  },
  inactive: {
    paddingBottom: 5,
  },
});
