import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "1";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? "/intimflex-academy-review" : "",
  },
  ...(isGitHubPages ? {
    output: "export",
    basePath: "/intimflex-academy-review",
    assetPrefix: "/intimflex-academy-review/",
  } : {}),
};

export default nextConfig;
