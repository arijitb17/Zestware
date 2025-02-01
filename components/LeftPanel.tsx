import React from "react";

interface LeftPanelProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedColor: string | null;
  setSelectedColor: (color: string | null) => void;
  selectedTexture: string | null;
  setSelectedTexture: (texture: string | null) => void;
  uploadedTShirtImage: string | null;
  setUploadedTShirtImage: (image: string | null) => void;
  textSize: number;
  setTextSize: (size: number) => void;
  textPositionFront: { x: number; y: number };
  setTextPositionFront: (position: { x: number; y: number }) => void;
  textPositionBack: { x: number; y: number };
  setTextPositionBack: (position: { x: number; y: number }) => void;
  customTextFront: string;
  setCustomTextFront: (text: string) => void;
  customTextBack: string;
  setCustomTextBack: (text: string) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  selectedType,
  setSelectedType,
  selectedColor,
  setSelectedColor,
  selectedTexture,
  setSelectedTexture,
  uploadedTShirtImage,
  setUploadedTShirtImage,
  textSize,
  setTextSize,
  textPositionFront,
  setTextPositionFront,
  textPositionBack,
  setTextPositionBack,
  customTextFront,
  setCustomTextFront,
  customTextBack,
  setCustomTextBack,
}) => {
  return (
    <div className="left-panel p-6 bg-gray-800 text-white rounded-lg w-full max-w-xs">
      <div className="section mb-6">
        <label className="block text-sm font-semibold mb-2">Shirt Type:</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm"
        >
          <option value="tshirt-type">T-Shirt</option>
          <option value="hoodie-type">Hoodie</option>
        </select>
      </div>

      <div className="section mb-6">
        <label className="block text-sm font-semibold mb-2">Color:</label>
        <input
          type="color"
          value={selectedColor || "#ffffff"}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm"
        />
      </div>

      <div className="section mb-6">
        <label className="block text-sm font-semibold mb-2">Texture:</label>
        <input
          type="text"
          value={selectedTexture || ""}
          onChange={(e) => setSelectedTexture(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm"
        />
      </div>

      <div className="section mb-6">
        <label className="block text-sm font-semibold mb-2">Upload T-Shirt Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setUploadedTShirtImage(URL.createObjectURL(file));
          }}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm"
        />
        {uploadedTShirtImage && (
          <img
            src={uploadedTShirtImage}
            alt="Uploaded T-shirt"
            className="mt-2 w-full h-auto border-2 border-gray-600 rounded"
          />
        )}
      </div>

      <div className="section mb-6">
        <label className="block text-sm font-semibold mb-2">Text Size:</label>
        <input
          type="range"
          min="10"
          max="100"
          value={textSize}
          onChange={(e) => setTextSize(Number(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded"
        />
        <div className="text-sm text-center mt-2">Text Size: {textSize}</div>
      </div>

      <div className="section mb-6">
        <label className="block text-sm font-semibold mb-2">Front Text:</label>
        <input
          type="text"
          value={customTextFront}
          onChange={(e) => setCustomTextFront(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm"
        />
      </div>

      <div className="section mb-6">
        <label className="block text-sm font-semibold mb-2">Back Text:</label>
        <input
          type="text"
          value={customTextBack}
          onChange={(e) => setCustomTextBack(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm"
        />
      </div>
    </div>
  );
};

export default LeftPanel;
