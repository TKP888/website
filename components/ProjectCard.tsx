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

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start new interval
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 2000); // 2 seconds
  };

  const stopCycling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Reset to first image
    setCurrentImageIndex(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const cardContent = (
    <div
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden group cursor-pointer"
      onMouseEnter={startCycling}
      onMouseLeave={stopCycling}
    >
      {/* Background Images with Cycling */}
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

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Text Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        {subtitle && (
          <p className="text-sm md:text-base text-slate-300 mb-2 opacity-90">
            {subtitle}
          </p>
        )}
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
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
