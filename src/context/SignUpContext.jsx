// import { createContext, useState, useContext } from "react";

// export const SignUpContext = createContext({});

// export default function SignUpContextProvider(props) {
//   const [step, setStep] = useState(0);

//   return (
//     <SignUpContext.Provider
//       value={{
//         step,
//         setStep,
//       }}
//     >
//       {props.children}
//     </SignUpContext.Provider>
//   );
// }

// export function useSignUp() {
//   const context = useContext(SignUpContext);
//   if (!context) {
//     throw new Error("useSignUp must be used within a SignUpContextProvider");
//   }
//   return context;
// }
