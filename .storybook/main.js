module.exports = {
  refs: {
    'design-system': {
      title: 'nWayPlay Design System',
      url: 'https://designsystem.nwayplay.com',
    },
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ]
}