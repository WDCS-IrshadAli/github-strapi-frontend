module.exports = {
    routes: [
      { // Path defined with a regular expression
        method: 'GET',
        path: '/faqs/count', // Only match when the URL parameter is composed of lowercase letters
        handler: 'api::faq.faq.getTotalFaqCount',
        // config: {
        //     auth: false
        // }
      },

      { // Path defined with a regular expression
        method: 'POST',
        path: '/faqs/count/webhook', // Only match when the URL parameter is composed of lowercase letters
        handler: 'api::faq.faq.postTotalFaqCountWebhook',
        // config: {
        //     auth: false
        // }
      }
    ]
}