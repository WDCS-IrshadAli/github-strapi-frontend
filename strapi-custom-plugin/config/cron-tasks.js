module.exports = {
    /**
     * Simple example.
     * Every monday at 1am.
     */
  
    myJob: {
      task: async ({ strapi }) => {
        // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
        // 1. run this cmd
        // crontab -e

        // 2. add your custom route that you wanna trigger everytime
        // http://localhost:1337/api/faqs/count/webhook

        console.log(`Faqs -----`);    

      },
      options: {
        // rule: "0 0 1 * * 1",
        // Every minute
        rule: "*/1 * * * *",
      },
    },
  };