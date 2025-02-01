import { useState, useRef, useEffect } from 'react';

const TShirtUpload: React.FC = () => {
  const [uploadedTShirtFront, setUploadedTShirtFront] = useState<string | null>(null);
  const [uploadedTShirtBack, setUploadedTShirtBack] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Function to draw the uploaded images on the canvas
  const drawImageOnCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clear the canvas before drawing new image
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the front image if available
        if (uploadedTShirtFront) {
          const frontImage = new Image();
          frontImage.src = uploadedTShirtFront;
          frontImage.onload = () => {
            ctx.drawImage(frontImage, 0, 0, canvas.width, canvas.height); // Draw the front image
          };
        }

        // Draw the back image if available
        if (uploadedTShirtBack) {
          const backImage = new Image();
          backImage.src = uploadedTShirtBack;
          backImage.onload = () => {
            ctx.drawImage(backImage, 0, 0, canvas.width, canvas.height); // Draw the back image
          };
        }
      }
    }
  };

  useEffect(() => {
    drawImageOnCanvas();
  }, [uploadedTShirtFront, uploadedTShirtBack]); // Re-run the drawing when an image is uploaded

  return (
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

      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="border mt-4"
      />
    </div>
  );
};

export default TShirtUpload;
