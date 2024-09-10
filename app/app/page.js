import React from "react";
import Bento from "@/components/bento";
import Image from "next/image";

const about =
  "Aloha! At Aloha Volunteer, we are passionate about connecting individuals with meaningful volunteer opportunities throughout the beautiful islands of Hawaii. Our mission is to empower locals and visitors alike to make a positive impact on our communities while fostering a genuine appreciation for Hawaiian culture and the environment. We believe that volunteering is a powerful way to engage with the spirit of aloha, promote sustainability, and contribute to the well-being of our islands. Join us in our commitment to service, and together, let's create lasting change and unforgettable experiences in paradise!";

export default function Home() {
  return (
    <>
      <div className="relative text-center text-white">
        <img
          src="/hawaii-splash.jpg"
          className="object-cover w-full h-[50vh]"
        />
        <h1 className="centered">Volunteer</h1>
      </div>

      <div className="container mx-auto">
        <div className="aspect-square p-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array(6)
            .fill()
            .map((_, i) => (
              <Bento
                key={i}
                className="col-span-1 text-center hover:scale-[1.01] transition-transform"
                text={about}
              />
            ))}
        </div>
      </div>
    </>
  );
}
