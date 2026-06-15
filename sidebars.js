const sidebars = {
  n8nSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Expressions n8n',
      collapsed: false,
      items: [
        'expressions/overview',
        'expressions/text',
        'expressions/numbers',
        'expressions/dates',
        'expressions/arrays',
        'expressions/conditions',
      ],
    },
    {
      type: 'category',
      label: 'Nodes n8n',
      collapsed: false,
      items: [
        'nodes/edit-fields',
        'nodes/http-request',
        'nodes/if',
        'nodes/code',
        'nodes/webhook',
        'nodes/respond-to-webhook',
      ],
    },
    {
      type: 'category',
      label: 'Workflows',
      collapsed: false,
      items: [
        'workflows/architecture',
        'workflows/naming-conventions',
        'workflows/error-handling',
        'workflows/testing',
        'workflows/production-checklist',
      ],
    },
    {
      type: 'category',
      label: 'Credentials & Sécurité',
      collapsed: false,
      items: [
        'credentials/overview',
        'credentials/api-key',
        'credentials/oauth2',
        'security/webhooks',
        'security/secrets',
      ],
    },
    {
      type: 'category',
      label: 'Intégrations',
      collapsed: false,
      items: [
        'integrations/rest-api',
        'integrations/outsystems',
        'integrations/database',
        'integrations/ai',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      collapsed: false,
      items: [
        'troubleshooting/common-errors',
        'troubleshooting/expression-errors',
        'troubleshooting/http-errors',
        'troubleshooting/webhook-errors',
        'troubleshooting/code-node-errors',
      ],
    },
  ],
};

export default sidebars;