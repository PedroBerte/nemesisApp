import { createContext, useState, useContext, useEffect } from "react";

export const SignUpContext = createContext({});

export default function SignUpContextProvider(props) {
  const [step, setStep] = useState(0);

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerConfirmEmail, setRegisterConfirmEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerBornDate, setRegisterBornDate] = useState("");
  const [registerSex, setRegisterSex] = useState("");
  const [registerHeight, setRegisterHeight] = useState("");
  const [registerWeight, setRegisterWeight] = useState("");
  const [registerGoal, setRegisterGoal] = useState("");
  const [gymAvailability, setGymAvailability] = useState("");
  const [gymDays, setGymDays] = useState("oi");
  const [userRes, setUserRes] = useState("");
  const [gymFreq, setGymFreq] = useState("");

  const [isLoggedWithGoogle, setIsLoggedWithGoogle] = useState(false);
  return (
    <SignUpContext.Provider
      value={{
        registerName,
        setRegisterName,
        registerEmail,
        setRegisterEmail,
        registerConfirmEmail,
        setRegisterConfirmEmail,
        registerPassword,
        setRegisterPassword,
        registerConfirmPassword,
        setRegisterConfirmPassword,
        registerBornDate,
        setRegisterBornDate,
        registerSex,
        setRegisterSex,
        registerHeight,
        setRegisterHeight,
        registerWeight,
        setRegisterWeight,
        registerGoal,
        setRegisterGoal,
        gymAvailability,
        setGymAvailability,
        gymFreq,
        setRegisterBornDate,
        gymDays,
        setGymDays,
        userRes,
        setUserRes,
        step,
        setStep,
        isLoggedWithGoogle,
        setIsLoggedWithGoogle,
        step,
        setStep,
        gymFreq,
        setGymFreq,
      }}
    >
      {props.children}
    </SignUpContext.Provider>
  );
}

export function useSignUp() {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error("useSignUp must be used within a SignUpContextProvider");
  }
  return context;
}
