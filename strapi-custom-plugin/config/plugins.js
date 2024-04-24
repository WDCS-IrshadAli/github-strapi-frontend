module.exports = {
    'todo': {
      enabled: true,
      resolve: './src/plugins/todo'
    },
    'menus': {
      config: {
        layouts: {
          menuItem: { // This is the menu item edit panel.
            link: [ // This is the "link" tab in the menu item edit panel.
              {
                input: {
                  label: 'Icon',
                  name: 'icon_field',
                  type: 'text',
                  description: 'Refer radix icons',
                  placeholder: 'Type something...'
                },
                grid: {
                  col: 6,
                },
              },
            ],
          },
        },
      },
    },
    'email': {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
            user: 'irshadali.kadiwala@codezeros.com',
            pass: 'wgzgvzcjkyezkroy',
          },
          // ... any custom nodemailer options
        },
        settings: {
          defaultFrom: 'no-reply@example.com',
          defaultReplyTo: 'irshadali.kadiwala@codezeros.com',
        },
      },
    },
}