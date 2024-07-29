import React from "react";
import { Navbutton } from "@/components/auth/nav-button";
import { Button } from "@/components/ui/button";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  style: "italic",
});

const HomePage = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <Image
        src={Logo}
        alt="Logo"
        width={100}
        height={100}
        priority={true}

      />
      <h1 className={cn("mb-3", font.className)}>
        Welcome to the Security Alert System
      </h1>
      <Navbutton endPoint="/login">
        <Button>Continue to Login</Button>
      </Navbutton>
    </main>
  );
};

export default HomePage;
