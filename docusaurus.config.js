// docusaurus.config.js

const config = {
  title: 'Rokodo n8n Documentation',
  tagline: 'Documentation Rokodo pour n8n : expressions, nodes, workflows, APIs et bonnes pratiques',
  favicon: 'img/favicon.ico',

  url: 'https://rokodo-io.github.io',
  baseUrl: '/rokodo-n8n-docs/',

  organizationName: 'rokodo-io',
  projectName: 'rokodo-n8n-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Rokodo n8n Docs',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'n8nSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://docs.n8n.io/',
          label: 'Docs n8n',
          position: 'right',
        },
        {
          href: 'https://github.com/rokodo-io/rokodo-n8n-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Rokodo',
          items: [
            {
              label: 'Site web',
              href: 'https://rokodo.io/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/rokodo-io',
            },
          ],
        },
        {
          title: 'n8n',
          items: [
            {
              label: 'Documentation officielle',
              href: 'https://docs.n8n.io/',
            },
            {
              label: 'Expressions n8n',
              href: 'https://docs.n8n.io/data/expressions/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Rokodo.IO`,
    },

    prism: {
      additionalLanguages: ['javascript', 'json', 'bash', 'yaml'],
    },
  },
};

export default config;