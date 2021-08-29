import { DependencyList, useEffect } from "react";

export const useEffectAsync = (
  effect: () => void,
  deps?: DependencyList | undefined
) => {
  useEffect(() => {
    effect();
  }, deps);
};
