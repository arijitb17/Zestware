"use client";
import React from "react";

interface MiddlePanelProps {
  tshirtData: any;
  selectedType: string;
  selectedColor: string | null;
  selectedTexture: string | null;
  uploadedTShirtImage: string | null;
  textSize: number;
  textPositionFront: { x: number; y: number };
  textPositionBack: { x: number; y: number };
  customTextFront: string;
  customTextBack: string;
  logoPositionsFront: { x: number; y: number }[];
  logoPositionsBack: { x: number; y: number }[];
  logoSizesFront: number[];
  logoSizesBack: number[];
  uploadedLogosFront: File[];
  uploadedLogosBack: File[];
  view: "front" | "back";
}

const MiddlePanel: React.FC<MiddlePanelProps> = ({
  tshirtData,
  selectedType,
  selectedColor,
  selectedTexture,
  uploadedTShirtImage,
  textSize,
  textPositionFront,
  textPositionBack,
  customTextFront,
  customTextBack,
  logoPositionsFront,
  logoPositionsBack,
  logoSizesFront,
  logoSizesBack,
  uploadedLogosFront,
  uploadedLogosBack,
  view,
}) => {
  const renderText = (text: string, size: number, position: { x: number; y: number }) => {
    return (
      <div
        style={{
          fontSize: `${size}px`,
          position: "absolute",
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: "translate(-50%, -50%)",
          color: "white",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
        }}
      >
        {text}
      </div>
    );
  };

  const renderLogos = (
    logos: File[],
    logoPositions: { x: number; y: number }[],
    logoSizes: number[],
    side: "front" | "back"
  ) => {
    return logos.map((logo, index) => {
      const position = logoPositions[index];
      const size = logoSizes[index];
      const logoUrl = URL.createObjectURL(logo);

      // Add check to make sure position is defined
      if (position && position.x !== undefined && position.y !== undefined) {
        return (
          <img
            key={index}
            src={logoUrl}
            alt={`${side} logo ${index + 1}`}
            style={{
              position: "absolute",
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)",
              width: `${size}px`,
              height: `${size}px`,
            }}
          />
        );
      }

      // Return null if position is undefined
      return null;
    });
  };

  const renderTShirt = () => {
    let tshirtImageUrl = uploadedTShirtImage || tshirtData.tshirts.find((tshirt: any) => tshirt.type === selectedType)?.frontImageUrl;

    return (
      <img
        src={tshirtImageUrl}
        alt="T-Shirt"
        className="w-full h-full object-cover"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    );
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      {/* Render T-Shirt Image */}
      <div className="relative w-72 h-96">
        {renderTShirt()}

        {/* Render Color Overlay */}
        {selectedColor && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: selectedColor.toLowerCase(),
              opacity: 0.3,
            }}
          />
        )}

        {/* Render Texture */}
        {selectedTexture && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${selectedTexture})`,
              backgroundSize: "cover",
              opacity: 0.2,
            }}
          />
        )}

        {/* Render Front Logos */}
        {view === "front" && renderLogos(uploadedLogosFront, logoPositionsFront, logoSizesFront, "front")}

        {/* Render Back Logos */}
        {view === "back" && renderLogos(uploadedLogosBack, logoPositionsBack, logoSizesBack, "back")}

        {/* Render Text on Front */}
        {view === "front" && renderText(customTextFront, textSize, textPositionFront)}

        {/* Render Text on Back */}
        {view === "back" && renderText(customTextBack, textSize, textPositionBack)}
      </div>
    </div>
  );
};

export default MiddlePanel;
