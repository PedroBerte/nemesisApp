import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";

function StopWatch(props) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 60);
      }, 60);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStartAndStop = () => {
    if (isActive) {
      setIsActive(false);
      setIsPaused(true);
    } else {
      setIsActive(true);
      setIsPaused(false);
    }
  };
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <Modal
      isVisible={props.isOpen}
      onBackdropPress={() => props.setClose(false)}
      onBackButtonPress={() => props.setClose(false)}
      hideModalContentWhileAnimating={""}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={500}
      animationOutTiming={500}
    >
      <View style={styles.modalBody}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => props.setClose(false)}>
            <Image
              style={styles.modalCloseIcon}
              source={require("../../../../assets/closeIcon.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.timerAlign}>
          <View style={styles.timerBackground}>
            <View style={styles.timer}>
              <Text style={styles.timerNumbers}>
                {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
              </Text>
              <Text style={styles.timerNumbers}>
                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.timerButtonsContainer}>
          {!isActive ? (
            <TouchableOpacity
              onPress={() => handleStartAndStop()}
              style={styles.timerButtons}
            >
              <Image
                style={{ marginRight: 8 }}
                source={require("./assets/playIcon.png")}
              />
              <Text>Iniciar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => handleStartAndStop()}
              style={styles.stopButton}
            >
              <Image
                style={{ marginRight: 8 }}
                source={require("./assets/stopIcon.png")}
              />
              <Text style={{ color: "white" }}>Parar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => handleReset()}
            style={styles.timerButtons}
          >
            <Image
              style={{ marginRight: 8 }}
              source={require("./assets/resetIcon.png")}
            />
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = {
  modalBody: {
    backgroundColor: "#fff",
    width: "75%",
    alignSelf: "center",
    borderRadius: 10,
  },
  modalCloseIcon: {
    marginRight: 24,
    marginTop: 18,
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  timer: {
    display: "flex",
    borderRadius: 160,
    width: 160,
    height: 160,
    backgroundColor: "#F0F0F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timerAlign: {
    alignItems: "center",
  },
  timerBackground: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 168,
    width: 168,
    height: 168,
    backgroundColor: "#45C4B0",
  },
  timerNumbers: {
    fontSize: 45,
    color: "#303030",
    fontWeight: "300",
  },
  timerButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  timerButtons: {
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#D5D5D5",
    color: "#303030",
  },
  stopButton: {
    backgroundColor: "#DB4848",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#B91414",
    color: "white",
  },
};

export default StopWatch;
