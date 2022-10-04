import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import TabBar from "../../components/TabBar/TabBar";
import TopBar from "../../components/TopBar/TopBar";

import { useAnimationState, MotiView } from "moti";

import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import { doc, getDoc } from "firebase/firestore";

import styles from "./DietStyles";

import { useAuthContext } from "../../context/AuthContext";

import moment from "moment";
import MealBox from "./components/MealBox";
import { Skeleton } from "moti/skeleton";

export default function Diet() {
  moment().format();
  const { user } = useAuthContext();

  const [userDiet, setUserDiet] = useState("");
  const [nextMeal, setNextMeal] = useState("");
  const [option, setOption] = useState(0);
  const [seeMoreIsPressed, setSeeMoreIsPressed] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [bodyWidth, setBodyWidth] = useState(0);

  useEffect(() => {
    async function getUserDiet() {
      const userDocs = await getDoc(doc(db, "diets", user.uid));
      setUserDiet(userDocs.data().diet);
    }
    getUserDiet();
  }, [user]);

  useEffect(() => {
    if (userDiet != "") {
      if (
        userDiet.filter((meal) => meal.time > moment().format("HH:mm"))
          .length == 0
      ) {
        setNextMeal(userDiet[0]);
      } else {
        const dietFiltered = userDiet.filter(
          (meal) => meal.time > moment().format("HH:mm")
        );
        setNextMeal(dietFiltered[0]);
      }
    }
  }, [userDiet]);

  useEffect(() => {
    if (userDiet != "") {
      setIsLoading(false);
    }
  }, [nextMeal]);

  const heightAnimated = useAnimationState({
    onOpen: {
      height: 200,
    },
    onClose: {
      height: 100,
    },
  });

  const handlePress = () => {
    if (seeMoreIsPressed) {
      heightAnimated.transitionTo("onClose");
      setSeeMoreIsPressed(false);
    } else {
      heightAnimated.transitionTo("onOpen");
      setSeeMoreIsPressed(true);
    }
  };

  function checkScrollIndicatorPosition({ nativeEvent }) {
    function isCloseToBottom({
      layoutMeasurement,
      contentOffset,
      contentSize,
    }) {
      return (
        layoutMeasurement.width + contentOffset.x >= contentSize.width - 20
      );
    }
    function isCloseToTop({ contentOffset }) {
      return contentOffset.x == 0;
    }
    if (isCloseToTop(nativeEvent)) {
      setOption(0);
    }
    if (isCloseToBottom(nativeEvent)) {
      setOption(1);
    }
  }

  function getWeekSkeleton() {
    const Spacer = () => <View style={{ marginBottom: 20 }} />;
    const weekDays = Array.from({ length: 7 }).map(() => true);
    return (
      <>
        {weekDays.map((day, index) => (
          <>
            <Skeleton
              key={index}
              show={isLoading}
              colorMode="light"
              height={70}
              width={"100%"}
            />
            <Spacer />
          </>
        ))}
      </>
    );
  }

  return (
    <>
      <TopBar />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Dieta</Text>
        <Text style={styles.text}>Próxima Refeição:</Text>
        <Skeleton show={isLoading} colorMode="light" height={100}>
          <MotiView
            transition={{
              type: "timing",
              duration: 700,
            }}
            state={heightAnimated}
            style={styles.nextMealBody}
          >
            <Pressable style={styles.nextMealHeader} onPressIn={handlePress}>
              <View style={{ flexDirection: "row", marginLeft: 15 }}>
                <Text style={styles.nextMealTitle}>
                  {nextMeal != "" ? nextMeal.meal : <></>}
                </Text>
                <Text style={styles.nextMealTime}>
                  {" "}
                  - {nextMeal != "" ? nextMeal.time : <></>}
                </Text>
              </View>
              <View>
                <Image
                  style={{ marginRight: 15 }}
                  source={require("../../assets/downArrow.png")}
                />
              </View>
            </Pressable>
            <View
              onLayout={(event) => setBodyWidth(event.nativeEvent.layout)}
              style={styles.nextMealContent}
            >
              {nextMeal != "" ? (
                <>
                  {seeMoreIsPressed ? (
                    <>
                      <ScrollView
                        disableIntervalMomentum={true}
                        horizontal
                        snapToInterval={bodyWidth.width}
                        style={{
                          flexDirection: "row",
                          marginTop: 10,
                          backgroundColor: "black",
                        }}
                        showsHorizontalScrollIndicator={false}
                        onScroll={({ nativeEvent }) =>
                          checkScrollIndicatorPosition({ nativeEvent })
                        }
                      >
                        <ScrollView
                          nestedScrollEnabled
                          style={{
                            marginBottom: 20,
                            width: bodyWidth.width,
                          }}
                        >
                          {nextMeal.option[0].foods.map((food, index) => (
                            <Text key={index} style={styles.foodName}>
                              {food.name} - {food.quantity}
                            </Text>
                          ))}
                        </ScrollView>
                        <ScrollView
                          nestedScrollEnabled
                          style={{
                            marginBottom: 20,
                            width: bodyWidth.width,
                          }}
                        >
                          {nextMeal.option[1].foods.map((food, index) => {
                            return (
                              <Text key={index} style={styles.foodName}>
                                {food.name} - {food.quantity}
                              </Text>
                            );
                          })}
                        </ScrollView>
                      </ScrollView>

                      <Text style={styles.optionText}>
                        {option == 0 ? "Opção 1" : "Opção 2"}
                      </Text>

                      <View style={styles.elipseIndicator}>
                        <Image
                          source={
                            option == 0
                              ? require("./assets/ActiveElipse.png")
                              : require("./assets/InactiveElipse.png")
                          }
                        />
                        <Image
                          style={{ marginLeft: 5 }}
                          source={
                            option == 1
                              ? require("./assets/ActiveElipse.png")
                              : require("./assets/InactiveElipse.png")
                          }
                        />
                      </View>
                    </>
                  ) : (
                    <>
                      <Text style={styles.defaultText} numberOfLines={1}>
                        {nextMeal.option[option].foods.map((food, index) => {
                          return <Text key={index}>{food.name}, </Text>;
                        })}
                      </Text>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </View>
          </MotiView>
        </Skeleton>

        <Text style={styles.text}>Todas as refeições: </Text>
        <View style={styles.mealsBody}>
          {userDiet != "" ? (
            <>
              {userDiet.map((meal, i) => {
                return <MealBox key={i} snack={meal} />;
              })}
            </>
          ) : (
            <>{getWeekSkeleton()}</>
          )}
        </View>
      </ScrollView>
      <TabBar />
    </>
  );
}
