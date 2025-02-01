"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const OrderPage = () => {
  const searchParams = useSearchParams();
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);

  useEffect(() => {
    const storedFrontImage = localStorage.getItem("frontImage");
    const storedBackImage = localStorage.getItem("backImage");

    console.log("Retrieved Front Image:", storedFrontImage);
    console.log("Retrieved Back Image:", storedBackImage);

    setFrontImage(storedFrontImage);
    setBackImage(storedBackImage);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Order Summary</h1>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {frontImage ? (
          <div>
            <h2 className="text-lg font-semibold">Front View</h2>
            <img src={frontImage} alt="Front View" className="w-64 h-64 object-contain border" />
          </div>
        ) : (
          <p>Front Image Not Found</p>
        )}

        {backImage ? (
          <div>
            <h2 className="text-lg font-semibold">Back View</h2>
            <img src={backImage} alt="Back View" className="w-64 h-64 object-contain border" />
          </div>
        ) : (
          <p>Back Image Not Found</p>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
