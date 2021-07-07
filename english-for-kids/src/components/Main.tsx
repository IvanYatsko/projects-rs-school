import React from "react"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { CardCategory } from "./CardCategory"

export const Main: React.FC = () => {
  const {categoryCards} = useTypedSelector(state => state.cards);

  return (
  <>
  <main className="main">
    <div className="main-container">
      {categoryCards.map((item, index) => <CardCategory item={item} key={index} index={index} />)}
    </div>
  </main>
  </>
  )
}
