import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

const Skeleton = (props) => (
<ContentLoader 
    speed={2}
    width={500}
    height={124}
    viewBox="0 0 500 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    animate="false"
    title="settings"
    {...props}
  >
    <Rect x="225" y="44" rx="8" ry="8" width="150" height="15" /> 
    <Rect x="223" y="16" rx="8" ry="8" width="200" height="20" /> 
    <Circle cx="133" cy="55" r="49" /> 
    <Rect x="225" y="65" rx="8" ry="8" width="150" height="15" /> 
    <Rect x="354" y="84" rx="8" ry="8" width="70" height="15" /> 
    <Circle cx="104" cy="96" r="2" />
  </ContentLoader>
)

export default Skeleton