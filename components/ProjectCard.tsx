"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  id: string;
  title: string;
  subtitle?: string;
  imageUrls: string[];
  href?: string;
}

export default function ProjectCard({
  id,
  title,
  subtitle,
  imageUrls,
  href,
}: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCycling = () => {
    if (imageUrls.length <= 1) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 2000); // 2 seconds
  };

  const stopCycling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImageIndex(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const cardContent = (
    <div
      className="relative w-full h-[175px] md:h-[300px] overflow-hidden group cursor-pointer"
      onMouseEnter={startCycling}
      onMouseLeave={stopCycling}
    >
      {imageUrls.map((imageUrl, index) => (
        <Image
          key={`${id}-${index}`}
          src={imageUrl}
          alt={`${title} - Image ${index + 1}`}
          fill
          className={`object-cover transition-all duration-1000 ${
            index === currentImageIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-110"
          } group-hover:scale-110`}
          priority={index === 0}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        {subtitle && (
          <p className="text-xs md:text-sm text-slate-300 mb-1 opacity-90">
            {subtitle}
          </p>
        )}
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
          {title}
        </h3>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
