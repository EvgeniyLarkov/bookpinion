import { useRef, FocusEvent } from 'react';

export interface UseOuterFocusInterface {
  wrapperRef: React.RefObject<HTMLDivElement>
  handleLeave: (ev: FocusEvent<HTMLDivElement>) => void
}

const useOuterFocus = (handler: () => void): UseOuterFocusInterface => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleLeave = (ev: FocusEvent<HTMLDivElement>) => {
    if (!wrapperRef?.current?.contains(ev.relatedTarget as Node)) {
      handler();
    }
  };

  return { wrapperRef, handleLeave };
};

export default useOuterFocus;
