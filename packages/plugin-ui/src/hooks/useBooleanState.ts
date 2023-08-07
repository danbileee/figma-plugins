import { Dispatch, SetStateAction, useCallback, useState } from "react";

export default function useBooleanState(
  defaultValue = false
): [boolean, Dispatch<SetStateAction<boolean>>, VoidFunction, VoidFunction] {
  const [state, setState] = useState(defaultValue);

  const setTrue = useCallback(() => {
    setState(true);
  }, []);

  const setFalse = useCallback(() => {
    setState(false);
  }, []);

  return [state, setState, setTrue, setFalse];
}
