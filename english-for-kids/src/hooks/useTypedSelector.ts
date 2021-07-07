import { RootState } from "../store/reducers/rootReducer";
import { TypedUseSelectorHook, useSelector } from "react-redux"

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector 