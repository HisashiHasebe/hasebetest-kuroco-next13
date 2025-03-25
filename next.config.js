/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    compress: false,
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig
