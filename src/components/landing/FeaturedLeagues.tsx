// components/FeaturedClubs.jsx
import Image from "next/image";

// Array of club badge image paths (replace with your actual badge URLs)
const clubBadges = [
  "https://i.imghippo.com/files/BRz8430c.png",
  "https://i.imghippo.com/files/Ggli9006FgY.png",
  "https://i.imghippo.com/files/IVML4242J.png",
  "https://i.imghippo.com/files/uWi7649Uzc.png",
  "https://i.imghippo.com/files/Nmz1639YA.png",
  "https://i.imghippo.com/files/ZtXS5891Rss.png",
];

const FeaturedLeagues = () => {
  return (
    <section
      id='featured-clubs'
      className='relative bg-edorange py-20 px-6 overflow-hidden text-edcream'
      style={{
        // Faint pitch pattern in edgreen (#177c4c) at ~5% opacity
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 80'%3E
            %3Crect x='0' y='0' width='120' height='80' fill='none' stroke='%23177c4c' stroke-width='1' stroke-opacity='0.05'/%3E
            %3Cline x1='60' y1='0' x2='60' y2='80' stroke='%23177c4c' stroke-width='1' stroke-opacity='0.05'/%3E
            %3Ccircle cx='60' cy='40' r='10' fill='none' stroke='%23177c4c' stroke-width='1' stroke-opacity='0.05'/%3E
            %3Crect x='0' y='20' width='20' height='40' fill='none' stroke='%23177c4c' stroke-width='1' stroke-opacity='0.05'/%3E
            %3Crect x='100' y='20' width='20' height='40' fill='none' stroke='%23177c4c' stroke-width='1' stroke-opacity='0.05'/%3E
            %3Crect x='0' y='32' width='5' height='16' fill='none' stroke='%23177c4c' stroke-width='1' stroke-opacity='0.05'/%3E
            %3Crect x='115' y='32' width='5' height='16' fill='none' stroke='%23177c4c' stroke-width='1' stroke-opacity='0.05'/%3E
            %3Ccircle cx='18' cy='40' r='2' fill='none' stroke='%23177c4c' stroke-width='1' stroke-opacity='0.05'/%3E
            %3Ccircle cx='102' cy='40' r='2' fill='none' stroke='%23177c4c' stroke-width='1' stroke-opacity='0.05'/%3E
            %3Ccircle cx='60' cy='40' r='2' fill='none' stroke='%23177c4c' stroke-width='1' stroke-opacity='0.05'/%3E
          %3C/svg%3E")
        `,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Headline */}
      <h2 className='text-3xl md:text-4xl font-bold  text-center mb-4 max-w-2xl mx-auto'>
        From Local Derbies to Top Leagues WorldWide
      </h2>

      {/* Subheadline */}
      <p className='text-lg md:text-xl text-center mb-12 max-w-xl mx-auto'>
        Explore the biggest football leagues—Premier League, La Liga,
        Bundesliga, and MLS.
      </p>

      {/* Club Badges Grid */}
      <div className='max-w-6xl mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-6'>
        {clubBadges.map((badgeSrc, index) => (
          <div
            key={index}
            className='
              group 
              flex items-center justify-center 
              bg-white rounded-lg p-4 
              filter grayscale transition duration-300
              hover:filter-none
            '
          >
            <Image
              src={badgeSrc}
              alt={`Club badge ${index + 1}`}
              width={80}
              height={80}
              className='
                object-contain 
                transition duration-300 
                group-hover:scale-105
              '
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedLeagues;
