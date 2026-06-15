import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: true, // Disabled to prevent service worker conflicts, cache issues, and WebView request hangs
});

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.137.133', 'localhost'],
};

export default withPWA(nextConfig);
