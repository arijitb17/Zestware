import Image from "next/image";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  buttonText: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Anurag Sarmah",
    role: "Chief Executive Officer (CEO)",
    image: "/aboute/ceo.png", 
    buttonText: "Know More",
  },
  {
    name: "Kalyan Dutta",
    role: "Chief Operational Officer (COO)",
    image: "/aboute/coo.png", 
    buttonText: "Know More",
  },
  {
    name: "Anuraag Thakur",
    role: "Chief Marketing Officer (CMO)",
    image: "/aboute/cmo.png", 
    buttonText: "Know More",
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="text-white py-10">
      <h1 className="text-center text-4xl font-bold mb-10">Meet Our Team</h1>
      <div className="flex flex-wrap justify-center gap-10">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="rounded-lg shadow-lg p-8 max-w-xs text-center flex flex-col items-center"
          >
            {/* Name */}
            <h1 className="text-2xl font-bold mb-2 overflow-ellipsis whitespace-nowrap uppercase">
              {member.name}
            </h1>
            {/* Image */}
            <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white">
              <Image
                src={member.image}
                alt={member.name}
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
            {/* Role */}
            <p className="text-lg text-gray-100 mb-4 font-bold uppercase">
              <span className="whitespace-nowrap">{member.role.split('(')[0].trim()}</span>
              <span className="block text-gray-100">{`(${member.role.split('(')[1]}`}</span>
            </p>
            {/* Button */}
            <button className="bg-gray-200 text-black py-2 px-4 rounded-3xl font-bold hover:bg-yellow-400 hover:text-black transition w-48">
              {member.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
