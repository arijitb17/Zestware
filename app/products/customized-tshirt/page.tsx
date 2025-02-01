"use client";
import React, { useState } from "react";
import tshirtData from "@/public/custom/tshirts.json";
import Image from "next/image";
import {  useRef, useEffect } from 'react';


const CustomTShirt: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("Round Neck");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedTexture, setSelectedTexture] = useState<string | null>(null);
  const [uploadedLogosFront, setUploadedLogosFront] = useState<File[]>([]);
  const [uploadedLogosBack, setUploadedLogosBack] = useState<File[]>([]);
  const [customTextFront, setCustomTextFront] = useState<string>("");
  const [customTextBack, setCustomTextBack] = useState<string>("");
  const [textColorFront, setTextColorFront] = useState<string>("white");
  const [textColorBack, setTextColorBack] = useState<string>("white");
  const [textPositionFront, setTextPositionFront] = useState<{ x: number; y: number }>({ x: 50, y: 150 });
  const [textPositionBack, setTextPositionBack] = useState<{ x: number; y: number }>({ x: 50, y: 150 });
  const [textSize, setTextSize] = useState<number>(16); // Initial text size in pixels
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [view, setView] = useState<"front" | "back">("front");
  const [logoPositionsFront, setLogoPositionsFront] = useState<{ x: number; y: number }[]>([{ x: 100, y: 100 }]);
  const [logoPositionsBack, setLogoPositionsBack] = useState<{ x: number; y: number }[]>([{ x: 100, y: 100 }]);
  const [logoSizesFront, setLogoSizesFront] = useState<number[]>([64]);
  const [logoSizesBack, setLogoSizesBack] = useState<number[]>([64]);
  const [uploadedTShirtImage, setUploadedTShirtImage] = useState<string | null>(null);
  const [uploadedTShirtFront, setUploadedTShirtFront] = useState<string | null>(null);
  const [uploadedTShirtBack, setUploadedTShirtBack] = useState<string | null>(null);
  
  const [orderFormVisible, setOrderFormVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  
  const getImageForView = () => {
    if (view === "front" && uploadedTShirtFront) {
      return uploadedTShirtFront;
    }
    if (view === "back" && uploadedTShirtBack) {
      return uploadedTShirtBack;
    }
    // Default: return a placeholder or a default T-shirt image (if no image uploaded)
    return null; // Replace with your default image
  };

  const tshirt = tshirtData.tshirts.find((t) => t.type === selectedType);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const getTShirtImage = (view: "front" | "back") => {
    
    if (selectedColor) {
      const selectedColorData = tshirt?.colors.find((c) => c.name === selectedColor);
      return view === "front" ? selectedColorData?.frontImageUrl : selectedColorData?.backImageUrl;
    }

    if (selectedTexture) {
      const selectedTextureData = tshirt?.textures.find((t) => t.name === selectedTexture);
      return view === "front" ? selectedTextureData?.frontImageUrl : selectedTextureData?.backImageUrl;
    }

    return view === "front" ? tshirt?.frontImageUrl : tshirt?.backImageUrl;
  };

  const adjustTextSize = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setTextSize((prevSize) => prevSize + 2); // Increase font size by 2px
    } else if (action === "decrease") {
      setTextSize((prevSize) => Math.max(prevSize - 2, 8)); // Decrease font size, minimum size 8px
    }
  };

  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, view: "front" | "back") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (view === "front") {
        setUploadedLogosFront((prev) => [...prev, file]);
        setLogoPositionsFront((prev) => [...prev, { x: 100, y: 100 }]);
        setLogoSizesFront((prev) => [...prev, 64]);
      } else {
        setUploadedLogosBack((prev) => [...prev, file]);
        setLogoPositionsBack((prev) => [...prev, { x: 100, y: 100 }]);
        setLogoSizesBack((prev) => [...prev, 64]);
      }
    }
  };

  const handleRemoveLogo = (index: number, view: "front" | "back") => {
    if (view === "front") {
      setUploadedLogosFront((prev) => prev.filter((_, idx) => idx !== index));
      setLogoPositionsFront((prev) => prev.filter((_, idx) => idx !== index));
      setLogoSizesFront((prev) => prev.filter((_, idx) => idx !== index));
    } else {
      setUploadedLogosBack((prev) => prev.filter((_, idx) => idx !== index));
      setLogoPositionsBack((prev) => prev.filter((_, idx) => idx !== index));
      setLogoSizesBack((prev) => prev.filter((_, idx) => idx !== index));
    }
  };
  const captureCanvasImages = () => {
    if (canvasRef.current) {
      const frontCanvasImage = canvasRef.current.toDataURL("image/png");

      // Assuming the back view is rendered on another canvas or part of the same canvas
      const backCanvasImage = canvasRef.current.toDataURL("image/png");

      return { frontCanvasImage, backCanvasImage };
    }
    return { frontCanvasImage: "", backCanvasImage: "" };
  };

  // Handle order form submission
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { frontCanvasImage, backCanvasImage } = captureCanvasImages();
    
    const orderData = {
      name,
      email,
      selectedType,
      selectedColor,
      selectedTexture,
      selectedSize,
      frontCanvasImage, // Send front canvas image
      backCanvasImage, // Send back canvas image
    };
    console.log("Order submitted: ", orderData);
    setOrderFormVisible(false); // Close the form after submission
  };


  const moveLogo = (direction: "up" | "down" | "left" | "right", index: number, view: "front" | "back") => {
    const step = 10;
    if (view === "front") {
      setLogoPositionsFront((prev) => {
        const newPositions = [...prev];
        switch (direction) {
          case "up":
            newPositions[index].y -= step;
            break;
          case "down":
            newPositions[index].y += step;
            break;
          case "left":
            newPositions[index].x -= step;
            break;
          case "right":
            newPositions[index].x += step;
            break;
        }
        return newPositions;
      });
    } else {
      setLogoPositionsBack((prev) => {
        const newPositions = [...prev];
        switch (direction) {
          case "up":
            newPositions[index].y -= step;
            break;
          case "down":
            newPositions[index].y += step;
            break;
          case "left":
            newPositions[index].x -= step;
            break;
          case "right":
            newPositions[index].x += step;
            break;
        }
        return newPositions;
      });
    }
  };

  const resizeLogo = (direction: "increase" | "decrease", index: number, view: "front" | "back") => {
    const step = 10;
    if (view === "front") {
      setLogoSizesFront((prev) => {
        const newSizes = [...prev];
        const newSize = direction === "increase" ? newSizes[index] + step : newSizes[index] - step;
        newSizes[index] = Math.max(30, newSize);
        return newSizes;
      });
    } else {
      setLogoSizesBack((prev) => {
        const newSizes = [...prev];
        const newSize = direction === "increase" ? newSizes[index] + step : newSizes[index] - step;
        newSizes[index] = Math.max(30, newSize);
        return newSizes;
      });
    }
  };
  const moveText = (direction: "up" | "down" | "left" | "right", view: "front" | "back") => {
    const step = 10;
    if (view === "front") {
      setTextPositionFront((prev) => {
        const newPos = { ...prev };
        switch (direction) {
          case "up":
            newPos.y -= step;
            break;
          case "down":
            newPos.y += step;
            break;
          case "left":
            newPos.x -= step;
            break;
          case "right":
            newPos.x += step;
            break;
        }
        return newPos;
      });
    } else {
      setTextPositionBack((prev) => {
        const newPos = { ...prev };
        switch (direction) {
          case "up":
            newPos.y -= step;
            break;
          case "down":
            newPos.y += step;
            break;
          case "left":
            newPos.x -= step;
            break;
          case "right":
            newPos.x += step;
            break;
        }
        return newPos;
      });
    }
  };


  const handleRemoveText = (view: "front" | "back") => {
    if (view === "front") {
      setCustomTextFront("");
    } else {
      setCustomTextBack("");
    }
  };
  
 
  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col items-center p-10 font-sans">
      <div className="w-full max-w-8xl flex flex-col lg:flex-row justify-between gap-10 lg:gap-20">
        {/* Left Panel */}
      <div className="lg:w-2/4 flex flex-col space-y-10 bg-transparent border p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-yellow-500 mb-4">Customize Your T-Shirt</h2>
          <div className="flex items-center space-x-6">
            <label className="text-2xl font-thin">SELECT TYPE</label>
            <select
              className="bg-transparent border text-slate-100 px-10 py-3 rounded-3xl"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {tshirtData.tshirts.map((tshirt) => (
                <option key={tshirt.id} value={tshirt.type}>
                  {tshirt.type}
                </option>
              ))}
            </select>
          </div>

          {/* Select Size */}
          <div className="flex flex-col space-y-6">
  <label className="text-2xl font-thin">SELECT SIZE</label>
  <div className="flex space-x-3">
    {["S", "M", "L", "XL", "XXL"].map((size) => (
      <button
        key={size}
        className={`py-2 px-4 rounded-3xl w-16 h-12 flex items-center justify-center ${
          selectedSize === size
            ? "bg-yellow-500 text-black"
            : "bg-transparent border text-white"
        }`}
        onClick={() => setSelectedSize(size)}
      >
        {size}
      </button>
    ))}
  </div>
</div>


          {/* Select Color */}
          <div className="flex flex-col space-y-4">
            <label className="text-2xl font-thin">SELECT COLOR</label>
            <div className="flex space-x-3">
              {tshirt?.colors.map((color) => (
                <div
                  key={color.name}
                  className={`w-8 h-8 rounded-full cursor-pointer border ${
                    selectedColor === color.name ? "border-yellow-500" : "border-gray-400"
                  }`}
                  style={{ backgroundColor: color.name.toLowerCase() }}
                  onClick={() => {
                    if (selectedColor === color.name) {
                      setSelectedColor(null);
                    } else {
                      setSelectedColor(color.name);
                      setSelectedTexture(null);
                    }
                  }}
                />
              ))}
            </div>
          </div>
          {/* Select Texture */}
<div className="flex flex-col space-y-4">
  <label className="text-2xl font-thin">SELECT TEXTURE</label>
  <div className="flex space-x-3">
    {tshirt?.textures.map((texture) => (
      <div
        key={texture.name}
        className={`w-12 h-12 bg-transparent rounded-full cursor-pointer ${
          selectedTexture === texture.name
            ? "border-2 border-yellow-500"
            : "border border-gray-400"
        }`}
        onClick={() => {
          if (selectedTexture === texture.name) {
            setSelectedTexture(null); // Deselect texture
          } else {
            setSelectedTexture(texture.name); // Select texture
            setSelectedColor(null); // Deselect color
          }
        }}
      >
        <Image
          src={view === "front" ? texture.frontImageUrl : texture.backImageUrl}
          alt={texture.name}
          width={48} // Set the size for the image
          height={48}
          className="rounded-full"
        />
      </div>
    ))}
  </div>
</div>

          
<div className="flex flex-col space-y-6">
  <label className="text-2xl font-thin">UPLOAD T-SHIRT FRONT</label>
  <input
    type="file"
    accept="image/*"
    className="bg-transparent border text-slate-100 px-3 py-3 rounded-3xl"
    onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setUploadedTShirtFront(URL.createObjectURL(file)); // Update the uploaded front image
      }
    }}
  />

  <label className="text-2xl font-thin">UPLOAD T-SHIRT BACK</label>
  <input
    type="file"
    accept="image/*"
    className="bg-transparent border text-slate-100 px-3 py-3 rounded-3xl"
    onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setUploadedTShirtBack(URL.createObjectURL(file)); // Update the uploaded back image
      }
    }}
  />
</div>


        </div>
        {/* T-Shirt Preview */}
        <div
  className="lg:w-3/4 flex flex-col items-center bg-transparent border rounded-lg p-6 shadow-xl relative"
  style={{ height: "600px" }}
>
<div className="relative w-3/4 h-[500px]">
          {getImageForView() ? (
            <Image
              src={getImageForView()||""}
              alt={`Uploaded T-Shirt - ${view}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          ) : (
            <Image
              src={getTShirtImage(view)||""}
              alt={`T-Shirt ${view}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          )}
    {(view === "front" ? uploadedLogosFront : uploadedLogosBack).map((logo, index) => (
      <Image
        key={index}
        src={URL.createObjectURL(logo)}
        alt="Uploaded Logo"
        width={view === "front" ? logoSizesFront[index] : logoSizesBack[index]}
        height={view === "front" ? logoSizesFront[index] : logoSizesBack[index]}
        className="absolute transition-transform duration-300"
        style={{
          top: `${view === "front" ? logoPositionsFront[index].y : logoPositionsBack[index].y}px`,
          left: `${view === "front" ? logoPositionsFront[index].x : logoPositionsBack[index].x}px`,
        }}
      />
    ))}
    {(view === "front" ? customTextFront : customTextBack) && (
      <p
        className="absolute font-bold"
        style={{
          color: view === "front" ? textColorFront : textColorBack,
          fontSize: `${textSize}px`,
          top: `${view === "front" ? textPositionFront.y : textPositionBack.y}px`,
          left: `${view === "front" ? textPositionFront.x : textPositionBack.x}px`,
        }}
      >
        {view === "front" ? customTextFront : customTextBack}
      </p>
    )}
  </div>
  <div className="flex flex-col space-y-6 space-x-4">
  <div className="flex space-x-4">
    {/* Select Quantity */}
  <label className="text-2xl font-thin">SELECT QUANTITY</label>
  <select
    value={quantity}
    onChange={(e) => setQuantity(Number(e.target.value))}
    className="bg-black border text-slate-100 px-4 py-2 rounded-md "
  >
    {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
      <option key={num} value={num}>
        {num}
      </option>
    ))}
  </select>
</div>
  <div className="flex justify-center mt-8">
    


          <button
            className="bg-transparent border hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-xl"
            
          >
            Add to Cart
          </button>
        </div>
        </div>
</div>


        {/* Tools Panel */}
        <div className="lg:w-2/4 flex flex-col space-y-6 bg-transparent border p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-yellow-500 mb-4">Customize Your T-Shirt</h2>

          {/* View Buttons */}
          <div className="space-y-2">
            <h3 className="text-2xl font-thin">View</h3>
            <button
              className={`w-full py-2 px-4 rounded-md ${view === "front" ? "bg-yellow-500 text-black" : "bg-transparent border"}`}
              onClick={() => setView("front")}
            >
              Front View
            </button>
            <button
              className={`w-full py-2 px-4 rounded-md ${view === "back" ? "bg-yellow-500 text-black" : "bg-transparent border"}`}
              onClick={() => setView("back")}
            >
              Back View
            </button>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-thin">Upload Logo</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleLogoUpload(e, view)}
              className="w-full bg-transparent border text-white p-2 rounded-md"
            />
          </div>

          {/* Logo Controls */}
          {(view === "front" ? uploadedLogosFront : uploadedLogosBack).map((_, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-sm font-semibold text-white">Logo {index + 1}</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => moveLogo("up", index, view)}
                  className="bg-transparent border text-white py-2 px-4 rounded-md"
                >
                  Up
                </button>
                <button
                  onClick={() => moveLogo("down", index, view)}
                  className="bg-transparent border text-white py-2 px-4 rounded-md"
                >
                  Down
                </button>
                <button
                  onClick={() => moveLogo("left", index, view)}
                  className="bg-transparent border text-white py-2 px-4 rounded-md"
                >
                  Left
                </button>
                <button
                  onClick={() => moveLogo("right", index, view)}
                  className="bg-transparent border text-white py-2 px-4 rounded-md"
                >
                  Right
                </button>
                <button
                  onClick={() => resizeLogo("increase", index, view)}
                  className="bg-transparent border border-green-600 text-white py-2 px-4 rounded-md"
                >
                  Increase Size
                </button>
                <button
                  onClick={() => resizeLogo("decrease", index, view)}
                  className="bg-transparent border border-red-400 text-white py-2 px-4 rounded-md"
                >
                  Decrease Size
                </button>
                <button
                  onClick={() => handleRemoveLogo(index, view)}
                  className="bg-transparent border border-red-600 text-white py-2 px-10 rounded-md"
                >
                  Remove
                </button>
              </div>
            </div>
            
          ))}
 <div className="space-y-2">
            <h3 className="text-2xl font-thin">Select Text:</h3>
            <input
              type="text"
              value={view === "front" ? customTextFront : customTextBack}
              onChange={(e) =>
                view === "front" ? setCustomTextFront(e.target.value) : setCustomTextBack(e.target.value)
              }
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
              placeholder="Enter custom text"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-thin">Text Color:</h3>
            <input
              type="color"
              value={view === "front" ? textColorFront : textColorBack}
              onChange={(e) =>
                view === "front" ? setTextColorFront(e.target.value) : setTextColorBack(e.target.value)
              }
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-thin">Move Text:</h3>
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white py-2 px-4 text-sm rounded-md"
                onClick={() => moveText("up", view)}
              >
                Up
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 text-sm rounded-md"
                onClick={() => moveText("down", view)}
              >
                Down
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 text-sm rounded-md"
                onClick={() => moveText("left", view)}
              >
                Left
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 text-sm rounded-md"
                onClick={() => moveText("right", view)}
              >
                Right
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-thin">Adjust Text Size:</h3>
            <div className="flex gap-2">
              <button
                className="bg-green-500 text-white py-2 px-4 text-sm rounded-md"
                onClick={() => adjustTextSize("increase")}
              >
                Increase
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 text-sm rounded-md"
                onClick={() => adjustTextSize("decrease")}
              >
                Decrease
              </button>
            </div>
          </div>

          <div>
            <button
              className="bg-red-600 text-white w-full py-2 px-4 text-sm rounded-md"
              onClick={() => handleRemoveText(view)}
            >
              Remove Text
            </button>
  </div>
</div>

        
        </div>
        
      </div>
    
  );
};

export default CustomTShirt;
