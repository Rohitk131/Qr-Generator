'use client'
import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import Extension from "qr-code-styling";
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

export default function App() {
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
      color: "#222222",
      type: "rounded" as DotType,
    },
    backgroundOptions: {
      color: "#5FD4F3",
    },
    cornersSquareOptions: {
      color: "#222222",
      type: "extra-rounded" as CornerSquareType,
    },
    cornersDotOptions: {
      color: "#222222",
      type: "dot" as CornerDotType,
    },
  });
  const [fileExt, setFileExt] = useState<Extension>("svg");
  const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
  }, [qrCode, options]);

  const onDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions((options) => ({
      ...options,
      data: event.target.value,
    }));
  };

  const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFileExt(event.target.value as Extension);
  };

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      extension: fileExt,
    });
  };

  return (
    <div className="flex flex-col items-center pt-10">
    <h2 className="text-6xl font-bold mb-4 font-jersey">QRonium</h2>
    <div className="rounded-xl pb-10">
    <div className="QRCodeWrapper " ref={ref}></div>
    </div>
    <div className="inputWrapper mx-auto max-w-sm ">
        <input
            value={options.data}
            onChange={onDataChange}
            className="inputBox bg-blue-900 text-white p-2 w-full mb-2 rounded-lg shadow-inner"
            type="text"
            placeholder= 'Enter your URL here...'
        />
        <select onchange={onExtensionChange} value={fileExt} className="p-2 text-black z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 m-8 ">
            <option value="svg">SVG</option>
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WEBP</option>
        </select>
        <button onclick={onDownloadClick} class="group/button rounded-lg bg-[#222222] text-black">
            <span className="block -translate-x-1 -translate-y-1 rounded-lg border-2 border-[#222222] bg-[#ff527a] px-4 py-1 text-sm font-medium tracking-tight transition-all group-hover/button:-translate-y-2 group-active/button:translate-x-0 group-active/button:translate-y-0">
                Download
            </span>
        </button>
    </div>
</div>

  );
}
