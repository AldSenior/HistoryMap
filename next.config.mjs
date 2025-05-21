/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.mds.yandex.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "avatars.dzeninfra.ru",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static1-repo.aif.ru",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sun9-70.userapi.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.dynamo.su",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.izi.travel",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdnn21.img.ria.ru",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.pravoslavie.ru",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn3.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "revo.kemrsl.ru",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "protivpytok.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-media.tass.ru",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "icdn.lenta.ru",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ru.openlist.wiki",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
