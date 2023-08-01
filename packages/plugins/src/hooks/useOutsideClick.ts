import { RefObject, useEffect } from "react";

export default function useOutsideClick(
  ref: RefObject<HTMLElement>,
  callback: VoidFunction
) {
  useEffect(() => {
    function handleClick(evt: MouseEvent) {
      if (ref.current && !ref.current.contains(evt.target as HTMLElement)) {
        callback();
      }
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [ref, callback]);
}
