'use client'
import { Boxes } from "./ui/background-boxes";
import { cn } from "@/utils/cn";
import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import QRCodeStyling, {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
  Options,
} from "qr-code-styling";

export default function BackgroundBoxesDemo() {
  const [options, setOptions] = useState<Options>({
    width: 300,
    height: 300,
    type: "svg" as DrawType,
    data: "",
    image: "/favicon.ico",
    margin: 10,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "Q" as ErrorCorrectionLevel,
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 20,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "white",
      type: "rounded" as DotType,
    },
    backgroundOptions: {
      color: "transparent",
    },
    cornersSquareOptions: {
      color: "white",
      type: "extra-rounded" as CornerSquareType,
    },
    cornersDotOptions: {
      color: "skyblue",
      type: "dot" as CornerDotType,
    },
  });

  const [fileExt, setFileExt] = useState<"svg" | "png" | "jpeg" | "webp">("svg");
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!qrCode || !ref.current) return;
    qrCode.update(options);
  }, [qrCode, options]);

  useEffect(() => {
    if (!ref.current) return;
    const qr = new QRCodeStyling(options);
    qr.append(ref.current);
    setQrCode(qr);
  }, [options]);

  const onDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      data: event.target.value,
    }));
  };

  const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFileExt(event.target.value as typeof fileExt);
  };

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      extension: fileExt,
    });
  };

  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center ">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <h1 className={cn("md:text-6xl text-xl text-white font-jersey relative z-20 ")}>
        QRonium
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20 pb-10">
        Create, share, and connect with ease - QR Code magic at your fingertips!
      </p>
      <div className="z-10">
        <div className="QRCodeWrapper pb-4 " ref={ref}></div>
        <input
          value={options.data}
          onChange={onDataChange}
          className="inputBox bg-blue-900 text-white p-2 w-full mb-2 rounded-lg shadow-inner"
          type="text"
          placeholder="Enter your URL here..."
        />
        <div className="inputWrapper mx-auto max-w-sm flex items-center justify-between pt-4">
          <div className="flex items-center">
            <select
              onChange={onExtensionChange}
              value={fileExt}
              className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-40"
            >
              <option value="svg">SVG</option>
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WEBP</option>
            </select>
            <button
              onClick={onDownloadClick}
              className="group/button rounded-lg bg-white text-white ml-2"
            >
              <span className="block -translate-x-1 -translate-y-1 rounded-lg border-2 border-[#222222] bg-blue-500 px-4 py-1 text-sm font-medium tracking-tight transition-all group-hover/button:-translate-y-2 group-active/button:translate-x-0 group-active/button:translate-y-0">
                Download
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
