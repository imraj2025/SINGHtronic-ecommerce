const rawBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://singhtronic-ecommerce.onrender.com";

const config = {
  apiBaseUrl: rawBaseUrl.replace(/\/+$/, ""),
  nextAuthUrl: (process.env.NEXTAUTH_URL || "http://localhost:3000").replace(
    /\/+$/,
    ""
  ),
};

export default config;