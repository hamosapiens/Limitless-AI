'use client';

import { FC, useEffect, useState } from "react";
import {
  Calendar,
  Camera,
  CheckSquare,
  Clock,
  Cloud,
  Compass,
  FileText,
  Heart,
  Image as ImageIcon,
  Map,
  MessageSquare,
  Newspaper,
  Settings,
  ShoppingBag,
  Wallet,
} from "lucide-react";

type AppIconDef = {
  label: string;
  bg: string;
  Icon: FC<React.SVGProps<SVGSVGElement>>;
};

const APPS: AppIconDef[] = [
  { label: "Messages", bg: "bg-[#34C759]", Icon: MessageSquare },
  { label: "Calendar", bg: "bg-[#FF9500]", Icon: Calendar },
  { label: "Photos", bg: "bg-[#AF52DE]", Icon: ImageIcon },
  { label: "Camera", bg: "bg-[#5AC8FA]", Icon: Camera },
  { label: "Maps", bg: "bg-[#FF2D55]", Icon: Map },
  { label: "Weather", bg: "bg-[#FF9500]", Icon: Cloud },
  { label: "Wallet", bg: "bg-black", Icon: Wallet },
  { label: "Notes", bg: "bg-[#FFCC00]", Icon: FileText },
  { label: "Reminders", bg: "bg-[#FF3B30]", Icon: CheckSquare },
  { label: "Clock", bg: "bg-[#5856D6]", Icon: Clock },
  { label: "News", bg: "bg-[#FF2D55]", Icon: Newspaper },
  { label: "App Store", bg: "bg-[#007AFF]", Icon: ShoppingBag },
  { label: "Health", bg: "bg-[#FF2D55]", Icon: Heart },
  { label: "Settings", bg: "bg-[#8E8E93]", Icon: Settings },
  { label: "Safari", bg: "bg-[#007AFF]", Icon: Compass },
];

export default function ResponsiveIphoneMock({
  wallpaperUrl = "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=800&fit=crop",
  lockScroll = true,
  /** breathing room around the phone */
  stagePaddingY = 56, // top+bottom padding (px)
  stagePaddingX = 24, // left+right padding (px)
  /** keep it slightly smaller by default */
  maxScale = 0.96,
  minScale = 0.35,
}: {
  wallpaperUrl?: string;
  lockScroll?: boolean;
  stagePaddingY?: number;
  stagePaddingX?: number;
  maxScale?: number;
  minScale?: number;
}) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Track viewport using VisualViewport when available (mobile correct)
  useEffect(() => {
    const update = () => {
      const vv = window.visualViewport;
      setDimensions({
        width: Math.round((vv?.width ?? window.innerWidth)),
        height: Math.round((vv?.height ?? window.innerHeight)),
      });
    };
    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  // Scale math that respects stage padding on both axes
  const getResponsiveStyles = () => {
    const baseWidth = 375;
    const baseHeight = 812;

    const availW = Math.max(0, dimensions.width - stagePaddingX * 2);
    const availH = Math.max(0, dimensions.height - stagePaddingY * 2);

    const scaleByWidth = availW / baseWidth;
    const scaleByHeight = availH / baseHeight;

    const rawScale = Math.min(scaleByWidth, scaleByHeight);
    const scale = Math.max(minScale, Math.min(maxScale, rawScale));

    const isSmall = scale < 0.6;
    const isMedium = scale >= 0.6 && scale < 0.9;

    return {
      scale,
      isSmall,
      isMedium,
      iconSize: isSmall ? 24 : isMedium ? 28 : 32,
      appIconSize: isSmall ? 50 : isMedium ? 55 : 60,
      fontSize: isSmall ? 10 : isMedium ? 11 : 12,
      gap: isSmall ? 15 : isMedium ? 18 : 20,
      paddingInline: isSmall ? 8 : 15,
      paddingBlock: isSmall ? 15 : 25,
      islandW: isSmall ? 100 : 120,
      islandH: isSmall ? 28 : 34,
      homeW: isSmall ? 110 : 134,
      homeH: isSmall ? 4 : 5,
      screenPad: isSmall ? 12 : isMedium ? 16 : 20,
      screenPadTop: isSmall ? 40 : 48,
    };
  };

  const s = getResponsiveStyles();

  // Scroll lock
  useEffect(() => {
    if (!lockScroll) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    const prevPad = body.style.paddingRight;
    const sbw = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (sbw > 0) body.style.paddingRight = `${sbw}px`;
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      body.style.paddingRight = prevPad;
    };
  }, [lockScroll]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        // Use stage padding to create top/bottom (and side) breathing room
        padding: `${stagePaddingY}px ${stagePaddingX}px`,
        // subtle background; tweak as you like
        background:
          "linear-gradient(135deg, #0f172a 0%, #4c1d95 40%, #0f172a 100%)",
        // make sure we use the small viewport height
        minHeight: "100svh",
      }}
    >
      {/* iPhone Container */}
      <div
        className="relative rounded-[40px] bg-neutral-900 transition-transform duration-300 ease-out"
        style={{
          width: 375,
          height: 812,
          transform: `scale(${s.scale})`,
          transformOrigin: "center center",
          boxShadow: `
            0 0 0 ${Math.max(8, 14 * s.scale)}px #121212,
            0 0 0 ${Math.max(10, 17 * s.scale)}px #232323,
            0 ${Math.max(10, 20 * s.scale)}px ${Math.max(20, 40 * s.scale)}px rgba(0, 0, 0, 0.8)
          `,
        }}
      >
        {/* Screen */}
        <div className="relative w-full h-full bg-black rounded-[38px] overflow-hidden">
          {/* Dynamic Island */}
          <div
            className="absolute z-20 left-1/2 -translate-x-1/2 rounded-[20px] bg-black transition-all duration-300"
            style={{
              top: 12,
              width: s.islandW,
              height: s.islandH,
            }}
          />

          {/* Wallpaper + Content */}
          <div
            className="absolute inset-0 flex flex-col bg-center bg-cover transition-all duration-300"
            style={{
              backgroundImage: `url(${wallpaperUrl})`,
              padding: s.screenPad,
              paddingTop: s.screenPadTop,
            }}
          >
            <div className="flex flex-col text-white h-full">
              {/* App Grid */}
              <div
                className="grid grid-cols-4 transition-all duration-300"
                style={{
                  gap: s.gap,
                  padding: `${s.paddingBlock}px ${s.paddingInline}px`,
                }}
              >
                {APPS.map(({ label, bg, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    className="flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ gap: s.isSmall ? 3 : 5 }}
                  >
                    <div
                      className={`flex items-center justify-center text-white ${bg} transition-all duration-200`}
                      style={{
                        width: s.appIconSize,
                        height: s.appIconSize,
                        borderRadius: s.isSmall ? 12 : 15,
                      }}
                    >
                      <Icon width={s.iconSize} height={s.iconSize} strokeWidth={1.5} />
                    </div>
                    <p
                      className="m-0 text-white text-center leading-tight"
                      style={{
                        fontSize: s.fontSize,
                        maxWidth: s.appIconSize,
                      }}
                    >
                      {label}
                    </p>
                  </button>
                ))}
              </div>

              {/* Flexible spacer */}
              <div className="flex-1" />

              {/* Dock spacer (optional area for dock apps) */}
              <div className="h-20" />
            </div>
          </div>

          {/* Home Indicator */}
          <div
            className="absolute z-20 left-1/2 -translate-x-1/2 rounded bg-white/30 transition-all duration-300"
            style={{
              bottom: 8,
              width: s.homeW,
              height: s.homeH,
            }}
          />
        </div>
      </div>

      {/* Dev HUD */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-4 left-4 bg-black/50 text-white text-xs p-2 rounded font-mono">
          Scale: {s.scale.toFixed(3)}<br />
          Viewport: {dimensions.width}×{dimensions.height}
        </div>
      )}
    </div>
  );
}
