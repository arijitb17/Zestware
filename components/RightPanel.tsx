"use client";
import React from "react";

interface RightPanelProps {
  uploadedLogosFront: File[];
  uploadedLogosBack: File[];
  logoPositionsFront: { x: number; y: number }[];
  logoPositionsBack: { x: number; y: number }[];
  logoSizesFront: number[];
  logoSizesBack: number[];
  setLogoPositionsFront: (positions: { x: number; y: number }[]) => void;
  setLogoPositionsBack: (positions: { x: number; y: number }[]) => void;
  setLogoSizesFront: (sizes: number[]) => void;
  setLogoSizesBack: (sizes: number[]) => void;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>, view: "front" | "back") => void;
  handleRemoveLogo: (index: number, view: "front" | "back") => void;
  resizeLogo: (direction: "increase" | "decrease", index: number, view: "front" | "back") => void;
  moveLogo: (direction: "up" | "down" | "left" | "right", index: number, view: "front" | "back") => void;
}

const RightPanel: React.FC<RightPanelProps> = ({
  uploadedLogosFront,
  uploadedLogosBack,
  logoPositionsFront,
  logoPositionsBack,
  logoSizesFront,
  logoSizesBack,
  setLogoPositionsFront,
  setLogoPositionsBack,
  setLogoSizesFront,
  setLogoSizesBack,
  handleLogoUpload,
  handleRemoveLogo,
  resizeLogo,
  moveLogo,
}) => {
  return (
    <div className="lg:w-2/4 flex flex-col space-y-10 bg-transparent border p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-yellow-500 mb-4">Customize Your Logos</h2>

      {/* Upload Front Logo */}
      <div className="flex flex-col space-y-6">
        <label className="text-2xl font-thin">UPLOAD FRONT LOGO</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleLogoUpload(e, "front")}
          className="bg-transparent border text-slate-100 px-3 py-3 rounded-3xl"
        />
        {uploadedLogosFront.map((logo, index) => (
          <div key={index} className="flex space-x-3 items-center">
            <img src={URL.createObjectURL(logo)} alt="Front Logo" width={logoSizesFront[index]} height={logoSizesFront[index]} />
            <button onClick={() => handleRemoveLogo(index, "front")}>Remove</button>
            <button onClick={() => moveLogo("up", index, "front")}>Up</button>
            <button onClick={() => moveLogo("down", index, "front")}>Down</button>
            <button onClick={() => moveLogo("left", index, "front")}>Left</button>
            <button onClick={() => moveLogo("right", index, "front")}>Right</button>
            <button onClick={() => resizeLogo("increase", index, "front")}>Increase Size</button>
            <button onClick={() => resizeLogo("decrease", index, "front")}>Decrease Size</button>
          </div>
        ))}
      </div>

      {/* Upload Back Logo */}
      <div className="flex flex-col space-y-6">
        <label className="text-2xl font-thin">UPLOAD BACK LOGO</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleLogoUpload(e, "back")}
          className="bg-transparent border text-slate-100 px-3 py-3 rounded-3xl"
        />
        {uploadedLogosBack.map((logo, index) => (
          <div key={index} className="flex space-x-3 items-center">
            <img src={URL.createObjectURL(logo)} alt="Back Logo" width={logoSizesBack[index]} height={logoSizesBack[index]} />
            <button onClick={() => handleRemoveLogo(index, "back")}>Remove</button>
            <button onClick={() => moveLogo("up", index, "back")}>Up</button>
            <button onClick={() => moveLogo("down", index, "back")}>Down</button>
            <button onClick={() => moveLogo("left", index, "back")}>Left</button>
            <button onClick={() => moveLogo("right", index, "back")}>Right</button>
            <button onClick={() => resizeLogo("increase", index, "back")}>Increase Size</button>
            <button onClick={() => resizeLogo("decrease", index, "back")}>Decrease Size</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightPanel;
