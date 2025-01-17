import Image from "next/image";
const Banner: React.FC = () => {
    return (
      <div>
      <div className="flex justify-center py-12">
        <Image
        src="/images/banner.png"
        alt="zestware"
        height={100}
        width={1500}
        />
     
        
      </div>
       <div className="flex justify-center mt-8 mb-20">
       <button
         className="bg-gray-200 text-black text-2xl font-extrabold hover:bg-yellow-500 hover:text-black rounded-full w-56 py-3 transition-all duration-300"
       >
         SHOP NOW
       </button>
     </div>
     </div>
    );
  };
  
  export default Banner;
  