import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { WorkoutBox } from "../WorkoutBox/WorkoutBox";

export default function WorkoutList(props) {
  return (
    <ScrollView nestedScrollEnabled style={styles.workoutsSelector}>
      {props.userWorkouts[props.workoutTypeIndex] != undefined ? (
        <>
          {props.userWorkouts
            .filter((item) => item.workoutInfos.name != undefined)
            [props.workoutTypeIndex].workoutInfos.workoutsList.map(
              (workout, index) => {
                return (
                  <WorkoutBox
                    onPress={() => props.setWorkoutIndex(index)}
                    gif={workout.gif}
                    rep={workout.rep}
                    key={index}
                    workoutIndex={props.workoutIndex}
                    isActive={
                      props.workoutIndex == index && props.workoutIsStarted
                        ? true
                        : false
                    }
                  >
                    {workout.name}
                  </WorkoutBox>
                );
              }
            )}
        </>
      ) : (
        <></>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  workoutsSelector: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxHeight: 270,
    minHeight: 270,
    overflow: "scroll",
  },
});
