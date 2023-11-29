/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://ethereum.org',
  generateRobotsTxt: true,
}
