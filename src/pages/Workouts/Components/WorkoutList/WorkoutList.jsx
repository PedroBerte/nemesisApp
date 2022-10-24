import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Skeleton } from "moti/skeleton";

import { WorkoutBox } from "../WorkoutBox/WorkoutBox";

export default function WorkoutList(props) {
  const [endScrollView, setEndScrollView] = useState(false);

  function isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    );
  }

  function isCloseToTop({ layoutMeasurement, contentOffset, contentSize }) {
    return contentOffset.y == 0;
  }

  function renderWorkoutBoxSkeletons() {
    const Spacer = () => <View style={{ height: 15 }} />;
    const arr = Array.from({ length: 5 }).map(() => true);
    return arr.map((_, index) => (
      <>
        <Spacer />
        <Skeleton colorMode="light" height={40} width="90%" />
      </>
    ));
  }

  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          setEndScrollView(true);
        }
      }}
      nestedScrollEnabled
      style={styles.workoutsSelector}
    >
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
        <View style={styles.skeletonsContainer}>
          {renderWorkoutBoxSkeletons()}
        </View>
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
  skeletonsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
