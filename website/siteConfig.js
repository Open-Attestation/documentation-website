const users = [
  {
    caption: "OpenCerts",
    image: "/img/partners/opencerts.svg",
    infoLink: "https://opencerts.io",
    pinned: true
  },
  {
    caption: "TradeTrust",
    image: "/img/partners/tradetrust.svg",
    infoLink: "https://tradetrust.io",
    pinned: true
  }
];

const siteConfig = {
  title: "Open Attestation",
  tagline: "Document Notarisation Framework",
  url: "https://openattestation.com",
  baseUrl: "/",
  projectName: "website",
  organizationName: "Open-Attestation",
  headerLinks: [
    { doc: "getting-started", label: "Docs" },
    { page: "help", label: "Help" }
    // { blog: true, label: "Blog" }
  ],
  users,
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        theme: {
          customCss: require.resolve("./static/css/bootstrap.css")
        }
      }
    ]
  ],
  /* path to images for header/footer */
  // headerIcon: 'img/favicon.ico',
  // footerIcon: 'img/favicon.ico',
  // favicon: 'img/favicon.ico',

  colors: {
    primaryColor: "#324353",
    secondaryColor: "#232e38"
  },
  copyright: `Copyright © ${new Date().getFullYear()} Government Technology Agency (Singapore)`,

  highlight: {
    theme: "default"
  },

  scripts: ["https://buttons.github.io/buttons.js"],

  onPageNav: "separate",
  cleanUrl: true,

  ogImage: "img/undraw_online.svg",
  twitterImage: "img/undraw_tweetstorm.svg",

  docsSideNavCollapsible: true,

  enableUpdateBy: true,
  enableUpdateTime: true
};

module.exports = siteConfig;
