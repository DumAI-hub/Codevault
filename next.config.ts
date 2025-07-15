import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Vercel-specific optimizations
  serverExternalPackages: [
    'firebase-admin',
    'genkit',
    '@genkit-ai/core',
    '@genkit-ai/googleai',
    '@opentelemetry/sdk-node',
    'handlebars'
  ],
  // Ensure proper routing for Vercel
  async rewrites() {
    return [];
  },
  // Handle webpack configuration for serverless functions
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'firebase-admin': 'commonjs firebase-admin',
        'genkit': 'commonjs genkit',
        '@genkit-ai/core': 'commonjs @genkit-ai/core',
        '@genkit-ai/googleai': 'commonjs @genkit-ai/googleai',
        '@opentelemetry/sdk-node': 'commonjs @opentelemetry/sdk-node',
        'handlebars': 'commonjs handlebars',
      });
    }

    // Ignore problematic modules for client-side builds
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      path: false,
      os: false,
      stream: false,
      util: false,
    };

    // Handle problematic dynamic imports
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    return config;
  },
};

export default nextConfig;
