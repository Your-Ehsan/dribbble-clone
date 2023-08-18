"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode, useCallback, useRef } from "react";

const Model = ({ children }: { children: ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null),
    wrapper = useRef<HTMLDivElement>(null),
    _router = useRouter();

  const closeModel = useCallback(async () => {
      await _router.push("/");
    }, [_router]),
    openModel = useCallback(
      async (e: MouseEvent) => {
        if (e.target === overlay.current && closeModel) {
          await closeModel();
        }
      },
      [overlay, closeModel],
    );

  return (
    <div
      className="modal"
      ref={overlay}
      onClick={async (e) => await openModel(e)}
    >
      <button
        type="button"
        onClick={async () => await closeModel()}
        className="absolute top-4 right-8"
      >
        <Image src={"./close.svg"} width={17} height={17} alt="close-icon" />
      </button>
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
};

export default Model;
