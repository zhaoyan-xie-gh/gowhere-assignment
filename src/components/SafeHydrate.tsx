import { useEffect, useState } from "react";
import { Hydrate } from "react-query";

export function SafeHydrate({
  dehydratedState,
  children,
}: {
  dehydratedState: unknown;
  children: JSX.Element | JSX.Element[] | null;
}) {
  const [childrenState, setChildrenState] = useState<
    JSX.Element | JSX.Element[] | null
  >(null);
  useEffect(() => {
    // https://nextjs.org/docs/messages/react-hydration-error
    if (typeof document !== undefined) {
      setChildrenState(children);
    }
  }, [children]);

  return <Hydrate state={dehydratedState}>{childrenState}</Hydrate>;
}
