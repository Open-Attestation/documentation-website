const extlink = require("remarkable-extlink");

const products = [
  {
    title: "OpenCerts",
    image: "/img/products/opencerts.png",
    infoLink: "https://opencerts.io",
    pinned: true
  },
  {
    title: "OpenAttestation Gallery",
    image: "/img/products/oa-gallery.png",
    infoLink: "https://gallery.openattestation.com",
    pinned: true
  },
  {
    title: "Identity Wallet",
    image: "/img/products/identity-wallet.png",
    infoLink: "/docs/appendix/identity-wallet",
    pinned: true
  },
  {
    title: "TradeTrust",
    image: "/img/products/tradetrust.png",
    infoLink: "https://tradetrust.io",
    pinned: true
  }
];

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
  products,
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
    theme: "nord",
    version: "10.1.1"
  },

  scripts: [
    "https://buttons.github.io/buttons.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    "/js/code-block-buttons.js"
  ],
  stylesheets: ["/css/code-block-buttons.css"],

  onPageNav: "separate",
  cleanUrl: true,

  ogImage: "img/undraw_online.svg",
  twitterImage: "img/undraw_tweetstorm.svg",

  docsSideNavCollapsible: true,

  enableUpdateBy: true,
  enableUpdateTime: true,
  markdownPlugins: [
    function(md) {
      extlink(md, {
        host: "openattestation.com" // The hrefs that you DON'T want to be external
      });
    }
  ],
};

module.exports = siteConfig;
