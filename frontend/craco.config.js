const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
                  "@primary-color": "#de7615",
              "@layout-header-background": "#050505",
              "@layout-sider-background": "#151515",
                  "@layout-trigger-background": "#de7615",
                  "@menu-dark-inline-submenu-bg":"#252525",
                  
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

// nani kore