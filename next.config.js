/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    compress: false,
    trailingSlash: true,
    basePath: '/hogehoge',
    assetPrefix: '/hogehoge',
    publicRuntimeConfig: {
        basePath: '/hogehoge',
    },
}

module.exports = nextConfig
