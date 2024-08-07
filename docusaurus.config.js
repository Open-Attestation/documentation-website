require("dotenv").config();

const siteConfig = {
  title: "OpenAttestation",
  tagline: "Document Endorsement and Verification Framework",
  url: "https://openattestation.com",
  baseUrl: "/",
  projectName: "website",
  organizationName: "Open-Attestation",
  favicon: "img/favicon.svg",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          // Docs folder path relative to website dir.
          path: "./docs",
          // Sidebars file relative to website dir.
          sidebarPath: require.resolve("./sidebars.json"),
        },
        theme: {
          customCss: [require.resolve("./src/css/custom.css")],
        },
        gtag: { trackingID: "G-FT2KKZKBLR" },
      },
    ],
  ],
  plugins: [
    [
      "docusaurus-plugin-remote-content",
      {
        name: "OpenAttestation",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/open-attestation/master/",
        outDir: "docs/lib-section/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "open-attestation.md",
            content: `---
id: open-attestation
title: OpenAttestation
hide_title: true
sidebar_label: OpenAttestation
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "OpenAttestation (CLI)",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/open-attestation-cli/master/",
        outDir: "docs/lib-section/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "open-attestation-cli.md",
            content: `---
id: open-attestation-cli
title: OpenAttestation (CLI)
hide_title: true
sidebar_label: OpenAttestation (CLI)
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "OpenAttestation (Encryption)",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/oa-encryption/master/",
        outDir: "docs/lib-section/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "open-attestation-encryption.md",
            content: `---
id: open-attestation-encryption
title: OpenAttestation (Encryption)
hide_title: true
sidebar_label: OpenAttestation (Encryption)
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "OpenAttestation (Verify)",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/oa-verify/master/",
        outDir: "docs/lib-section/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "open-attestation-verify.md",
            content: `---
id: open-attestation-verify
title: OpenAttestation (Verify)
hide_title: true
sidebar_label: OpenAttestation (Verify)
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "React components for decentralized renderer",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Open-Attestation/decentralized-renderer-react-components/master/",
        outDir: "docs/lib-section/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "decentralized-renderer-react-components.md",
            content: `---
id: decentralized-renderer-react-components
title: React components for decentralized renderer
hide_title: true
sidebar_label: React components for decentralized renderer
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "React template for decentralized renderer",
        sourceBaseUrl:
          "https://raw.githubusercontent.com/Open-Attestation/decentralized-renderer-react-template/master/",
        outDir: "docs/lib-section/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "decentralized-renderer-react-template.md",
            content: `---
id: decentralized-renderer-react-template
title: React template for decentralized renderer
hide_title: true
sidebar_label: React template for decentralized renderer
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "Document store",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/document-store/master/",
        outDir: "docs/lib-section/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "document-store.md",
            content: `---
id: document-store
title: Document store
hide_title: true
sidebar_label: Document store
---

${content}`,
          };
        },
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
        name: "Token registry",
        sourceBaseUrl: "https://raw.githubusercontent.com/Open-Attestation/token-registry/master/",
        outDir: "docs/lib-section/remote-files/",
        documents: ["README.md"],
        modifyContent(fileName, content) {
          return {
            filename: "token-registry.md",
            content: `---
id: token-registry
title: Token registry
hide_title: true
sidebar_label: Token registry
---

${content}`,
          };
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: "OpenAttestation",
      logo: {
        alt: "OpenAttestation Logo",
        src: "img/logos/oa.svg",
        srcDark: "img/logos/oa.svg",
      },
      items: [
        {
          type: "dropdown",
          label: "Issue/Revoke",
          position: "left",
          items: [
            {
              label: "Overview",
              to: "/docs/overview-section/overview",
              activeBasePath: "/docs/overview-section",
            },

            {
              label: "Prerequisites",
              to: "/docs/prereq-section/prerequisites",
              activeBasePath: "/docs/prereq-section",
            },

            {
              label: "Issue verifiable documents with DID",
              to: "/docs/did-section/overview-did",
              activeBasePath: "/docs/did-section",
            },

            {
              label: "Issue verifiable documents with Ethereum",
              to: "/docs/ethereum-section/overview-eth",
              activeBasePath: "/docs/ethereum-section",
            },
            {
              label: "Issue transferable records with Ethereum",
              to: "/docs/transferable-section/overview-tr",
              activeBasePath: "/docs/transferable-section",
            },

            {
              label: "Revoke documents",
              to: "/docs/revoke-section/revoke",
              activeBasePath: "/docs/revoke-section",
            },
          ],
        },

        { to: "docs/verify-section/verify", label: "Verify", position: "left" },

        { to: "docs/distribute-section/distribute", label: "Distribute", position: "left" },

        {
          type: "dropdown",
          label: "Resources",
          position: "left",
          items: [
            {
              label: "Libraries",
              to: "/docs/lib-section/overview-lib",
              activeBasePath: "/docs/lib-section",
            },

            {
              label: "Guides",
              to: "/docs/guides-section/overview-guides",
              activeBasePath: "/docs/guides-section",
            },

            {
              label: "FAQ",
              to: "/docs/faq-section/overview-faq",
              activeBasePath: "/docs/faq-section",
            },
            {
              label: "Glossary",
              to: "/docs/glossary-section/glossary",
              activeBasePath: "/docs/glossary-section",
            },

            {
              label: "Changelog",
              to: "/docs/changelog-section/overview-changelog",
              activeBasePath: "/docs/changelog-section",
            },

            {
              label: "Blockchain costs",
              to: "/docs/costs-section/overview-costs",
              activeBasePath: "/docs/costs-section",
            },

            {
              label: "Limitations",
              to: "/docs/limit-section/limitations",
              activeBasePath: "/docs/limit-section",
            },
          ],
        },
      ],
    },
    footer: {
      logo: {
        alt: "GovTech Logo",
        src: "img/logos/govtech-blue.png",
        href: "https://www.tech.gov.sg",
      },
      copyright: `Copyright © ${new Date().getFullYear()} Government Technology Agency (Singapore)`,
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "docs/overview-section/overview",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Github",
              href: "https://github.com/Open-Attestation",
            },
          ],
        },
      ],
    },

    algolia: {
      appId: "M0GN6T3PD5",
      apiKey: process.env.ALGOLIA_SEARCH_API_KEY || "DummyKey",
      indexName: "openattestation_2024",
      contextualSearch: false, // To update if we ever want to split by language / OA docs version etc. See https://docusaurus.io/docs/search#contextual-search
      algoliaOptions: {}, // Optional, if provided by Algolia
      debug: false, // Set debug to true if you want to inspect the modal
    },
    prism: {
      theme: require("prism-react-renderer/themes/nightOwl"),
    },
    image: "img/logos/oa.png",
    metadata: [{ name: "og:image", content: "img/logos/oa.png" }],
  },
  customFields: {
    blockNativeApiKey: process.env.BLOCK_NATIVE_API_KEY,
  },
};

module.exports = siteConfig;
