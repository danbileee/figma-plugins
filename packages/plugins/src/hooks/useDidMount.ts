import { useEffect, useRef } from "react";

export default function useDidMount(callback: VoidFunction, condition = true) {
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current && condition) {
      callback();
      didMount.current = true;
    }
  }, [callback, condition]);
}
