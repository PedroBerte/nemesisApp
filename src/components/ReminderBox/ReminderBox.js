import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import * as Notifications from "expo-notifications";

import { db } from "../../services/firebase-config";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useAuthContext } from "../../context/AuthContext";

import Toast from "react-native-toast-message";

const ReminderBox = (props) => {
  const { user } = useAuthContext();
  const [isSelected, setSelected] = useState(props.isChecked);

  useEffect(() => {
    async function getReminders() {
      const userDocs = await getDoc(doc(db, "users", user.uid));
    }
    getReminders();
  }, [user]);

  async function handleCheck() {
    setSelected(!isSelected);
    props.set(!isSelected);
    sendPushNotification(!isSelected);
    switch (props.type) {
      case "water":
        await updateDoc(doc(db, "users", user.uid), {
          waterReminder: !isSelected,
        });
        break;
      case "meal":
        await updateDoc(doc(db, "users", user.uid), {
          mealReminder: !isSelected,
        });
        break;
      case "workout":
        await updateDoc(doc(db, "users", user.uid), {
          workoutReminder: !isSelected,
        });
        break;
    }
  }

  async function sendPushNotification(bool) {
    switch (props.type) {
      case "water":
        if (bool) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Melhor uma pedra no caminho, do que no rim! 🗣️",
              body: "Beba seus 200ml de água!",
            },
            trigger: {
              seconds: 7200,
              repeats: true,
            },
          });
        } else {
          await Notifications.cancelAllScheduledNotificationsAsync();
          const userDocs = await getDoc(doc(db, "users", user.uid));
          if (userDocs.data().mealReminder) {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "Café da manhã: Bora bater seus macros. ☀️",
                body: "Amigo, sua dieta não é da fé - come tudo e espera que um milagre se realize",
              },
              trigger: {
                hour: Number(
                  userDocs
                    .data()
                    .reminders[0].time.split(":")[0]
                    .replace("0", "")
                ),
                minute: Number(
                  userDocs
                    .data()
                    .reminders[0].time.split(":")[1]
                    .replace("0", "")
                ),
                repeats: true,
              },
            });
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "Lanche: Vamos, mais uma refeição. 😋",
                body: "Coisas que não dispensamos: Wi-fi, dinheiro e comida!",
              },
              trigger: {
                hour: Number(
                  userDocs
                    .data()
                    .reminders[2].time.split(":")[0]
                    .replace("0", "")
                ),
                minute: Number(
                  userDocs
                    .data()
                    .reminders[2].time.split(":")[1]
                    .replace("0", "")
                ),
                repeats: true,
              },
            });
            await Notifications.scheduleNotificationAsync({
              content: {
                title:
                  "Almoço: Se não comer, não cresce hein... Tá na hora. 🍽️ ",
                body: "A maior prova de amor é quando a pessoa diz: não quero mais, pode comer.",
              },
              trigger: {
                hour: Number(
                  userDocs
                    .data()
                    .reminders[3].time.split(":")[0]
                    .replace("0", "")
                ),
                minute: Number(
                  userDocs
                    .data()
                    .reminders[3].time.split(":")[1]
                    .replace("0", "")
                ),
                repeats: true,
              },
            });
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "Café da tarde: Já tava com fome de novo né? 😵‍💫",
                body: "Comida gordurosa é romântica. Vai direto para o coração.",
              },
              trigger: {
                hour: Number(
                  userDocs
                    .data()
                    .reminders[4].time.split(":")[0]
                    .replace("0", "")
                ),
                minute: Number(
                  userDocs
                    .data()
                    .reminders[4].time.split(":")[1]
                    .replace("0", "")
                ),
                repeats: true,
              },
            });
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "Confira no cardápio sua próxima refeição. 🤤",
                body: "Quando digo que te amo, não é pelo que você é por fora, mas pelo seu interior. Obrigado por tudo… Geladeira.",
              },
              trigger: {
                hour: Number(
                  userDocs
                    .data()
                    .reminders[5].time.split(":")[0]
                    .replace("0", "")
                ),
                minute: Number(
                  userDocs
                    .data()
                    .reminders[5].time.split(":")[1]
                    .replace("0", "")
                ),
                repeats: true,
              },
            });
          }
          if (userDocs.data().workoutReminder) {
            await Notifications.scheduleNotificationAsync({
              content: {
                title:
                  "A vida é cheia de altos e baixos. Nós chamamos isso de: Agachamentos 🏋🏿‍♀️",
                body: "Eu sei que sua motivação tá tão baixa quanto o saldo no banco, mas isso não é desculpa hein...",
              },
              trigger: {
                hour: Number(
                  userDocs
                    .data()
                    .reminders[1].time.split(":")[0]
                    .replace("0", "")
                ),
                minute: Number(
                  userDocs
                    .data()
                    .reminders[1].time.split(":")[1]
                    .replace("0", "")
                ),
                repeats: true,
              },
            });
          }
        }
        break;
      case "meal":
        if (bool) {
          const userDocs = await getDoc(doc(db, "users", user.uid));
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Café da manhã: Bora bater seus macros. ☀️",
              body: "Amigo, sua dieta não é da fé - come tudo e espera que um milagre se realize",
            },
            trigger: {
              hour: Number(
                userDocs.data().reminders[0].time.split(":")[0].replace("0", "")
              ),
              minute: Number(
                userDocs.data().reminders[0].time.split(":")[1].replace("0", "")
              ),
              repeats: true,
            },
          });
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Lanche: Vamos, mais uma refeição. 😋",
              body: "Coisas que não dispensamos: Wi-fi, dinheiro e comida!",
            },
            trigger: {
              hour: Number(
                userDocs.data().reminders[2].time.split(":")[0].replace("0", "")
              ),
              minute: Number(
                userDocs.data().reminders[2].time.split(":")[1].replace("0", "")
              ),
              repeats: true,
            },
          });
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Almoço: Se não comer, não cresce hein... Tá na hora. 🍽️ ",
              body: "A maior prova de amor é quando a pessoa diz: não quero mais, pode comer.",
            },
            trigger: {
              hour: Number(
                userDocs.data().reminders[3].time.split(":")[0].replace("0", "")
              ),
              minute: Number(
                userDocs.data().reminders[3].time.split(":")[1].replace("0", "")
              ),
              repeats: true,
            },
          });
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Café da tarde: Já tava com fome de novo né? 😵‍💫",
              body: "Comida gordurosa é romântica. Vai direto para o coração.",
            },
            trigger: {
              hour: Number(
                userDocs.data().reminders[4].time.split(":")[0].replace("0", "")
              ),
              minute: Number(
                userDocs.data().reminders[4].time.split(":")[1].replace("0", "")
              ),
              repeats: true,
            },
          });
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Confira no cardápio sua próxima refeição. 🤤",
              body: "Quando digo que te amo, não é pelo que você é por fora, mas pelo seu interior. Obrigado por tudo… Geladeira.",
            },
            trigger: {
              hour: Number(
                userDocs.data().reminders[5].time.split(":")[0].replace("0", "")
              ),
              minute: Number(
                userDocs.data().reminders[5].time.split(":")[1].replace("0", "")
              ),
              repeats: true,
            },
          });
        } else {
          await Notifications.cancelAllScheduledNotificationsAsync();
          const userDocs = await getDoc(doc(db, "users", user.uid));
          if (userDocs.data().workoutReminder) {
            await Notifications.scheduleNotificationAsync({
              content: {
                title:
                  "A vida é cheia de altos e baixos. Nós chamamos isso de: Agachamentos 🏋🏿‍♀️",
                body: "Eu sei que sua motivação tá tão baixa quanto o saldo no banco, mas isso não é desculpa hein...",
              },
              trigger: {
                hour: Number(
                  userDocs
                    .data()
                    .reminders[1].time.split(":")[0]
                    .replace("0", "")
                ),
                minute: Number(
                  userDocs
                    .data()
                    .reminders[1].time.split(":")[1]
                    .replace("0", "")
                ),
                repeats: true,
              },
            });
          }
          if (userDocs.data().waterReminder) {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "Melhor uma pedra no caminho, do que no rim! 🗣️",
                body: "Beba seus 200ml de água!",
              },
              trigger: {
                minutes: 7200,
                repeats: true,
              },
            });
          }
        }
        break;
      case "workout":
        if (bool) {
          const userDocs = await getDoc(doc(db, "users", user.uid));
          await Notifications.scheduleNotificationAsync({
            content: {
              title:
                "A vida é cheia de altos e baixos. Nós chamamos isso de: Agachamentos 🏋🏿‍♀️",
              body: "Eu sei que sua motivação tá tão baixa quanto o saldo no banco, mas isso não é desculpa hein...",
            },
            trigger: {
              hour: Number(
                userDocs.data().reminders[1].time.split(":")[0].replace("0", "")
              ),
              minute: Number(
                userDocs.data().reminders[1].time.split(":")[1].replace("0", "")
              ),
              repeats: true,
            },
          });
        } else {
          await Notifications.cancelAllScheduledNotificationsAsync();
          const userDocs = await getDoc(doc(db, "users", user.uid));
          if (userDocs.data().mealReminder) {
            const userDocs = await getDoc(doc(db, "users", user.uid));
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "Café da manhã: Bora bater seus macros. ☀️",
                body: "Amigo, sua dieta não é da fé - come tudo e espera que um milagre se realize",
              },
              trigger: {
                hour: Number(
                  userDocs
                    .data()
                    .reminders[0].time.split(":")[0]
                    .replace("0", "")
                ),
                minute: Number(
                  userDocs
                    .data()
                    .reminders[0].time.split(":")[1]
                    .replace("0", "")
                ),
                repeats: true,
              },
            });
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "Lanche: Vamos, mais uma refeição. 😋",
                body: "Coisas que não dispensamos: Wi-fi, dinheiro e comida!",
              },
              trigger: {
                hour: Number(
                  userDocs
                    .data()
                    .reminders[2].time.split(":")[0]
                    .replace("0", "")
                ),
                minute: Number(
                  userDocs
                    .data()
                    .reminders[2].time.split(":")[1]
                    .replace("0", "")
                ),
                repeats: true,
              },
            });
            await Notifications.scheduleNotificationAsync({
              content: {
                title:
                  "Almoço: Se não comer, não cresce hein... Tá na hora. 🍽️ ",
                body: "A maior prova de amor é quando a pessoa diz: não quero mais, pode comer.",
              },
              trigger: {
                hour: Number(
                  userDocs
                    .data()
                    .reminders[3].time.split(":")[0]
                    .replace("0", "")
                ),
                minute: Number(
                  userDocs
                    .data()
                    .reminders[3].time.split(":")[1]
                    .replace("0", "")
                ),
                repeats: true,
              },
            });
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "Café da tarde: Já tava com fome de novo né? 😵‍💫",
                body: "Comida gordurosa é romântica. Vai direto para o coração.",
              },
              trigger: {
                hour: Number(
                  userDocs
                    .data()
                    .reminders[4].time.split(":")[0]
                    .replace("0", "")
                ),
                minute: Number(
                  userDocs
                    .data()
                    .reminders[4].time.split(":")[1]
                    .replace("0", "")
                ),
                repeats: true,
              },
            });
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "Confira no cardápio sua próxima refeição. 🤤",
                body: "Quando digo que te amo, não é pelo que você é por fora, mas pelo seu interior. Obrigado por tudo… Geladeira.",
              },
              trigger: {
                hour: Number(
                  userDocs
                    .data()
                    .reminders[5].time.split(":")[0]
                    .replace("0", "")
                ),
                minute: Number(
                  userDocs
                    .data()
                    .reminders[5].time.split(":")[1]
                    .replace("0", "")
                ),
                repeats: true,
              },
            });
          }
          if (userDocs.data().waterReminder) {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "Melhor uma pedra no caminho, do que no rim! 🗣️",
                body: "Beba seus 200ml de água!",
              },
              trigger: {
                minutes: 7200,
                repeats: true,
              },
            });
          }
        }
        break;
    }
  }

  return (
    <TouchableOpacity
      onPress={() => {
        handleCheck();
      }}
    >
      <View style={styles.tasks}>
        <Text style={styles.taskText}>{props.children}</Text>

        {isSelected == false ? (
          <Image
            source={require("../../assets/grayCircle.png")}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require("../../assets/check.png")}
            resizeMode="contain"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tasks: {
    backgroundColor: "rgba(29, 29, 29, 0.08)",
    height: 45,
    width: "100%",
    marginTop: 15,
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgba(29, 29, 29, 0.20)",
    borderWidth: 1,
  },
  taskText: {
    fontSize: 15,
  },
});

export default ReminderBox;
