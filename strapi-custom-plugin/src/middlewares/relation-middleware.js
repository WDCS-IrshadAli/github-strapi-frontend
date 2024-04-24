"use strict";
const jwt = require("jsonwebtoken");

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {

    if ( ctx.request.url.startsWith("/api/auth") ) {
      return next();
    } else if ( ctx.request.url.startsWith("/api") && ctx.request.header.authorization ) {
      const { user, auth } = ctx.state;
      let organizationName = "";
      let userData = null;
      if (
        auth.strategy.name === "users-permissions" &&
        ctx.request &&
        ctx.request.header &&
        ctx.request.header.authorization
      ) {
            userData = await strapi.db.query("plugin::users-permissions.user").findOne({
                where: { id: user.id },
                populate: ["organization_id", "createdBy", "role"],
            });
            organizationName = userData.organization_id.name;
            console.log("POPULATED USER DATA = ", userData);
      } else {
            let apiTokenUser = await strapi.db.query("admin::api-token").findOne({
                where: { id: auth.credentials.id },
            });
            organizationName = apiTokenUser.name;
            console.log("API TOKEN = ", apiTokenUser);
      }
      if (ctx.request.method === "GET" && (organizationName != "" || organizationName != undefined)) {
        ctx.query = {
          ...ctx.query,
          filters: { organization_id: { name: `${organizationName}` } },
        };
        console.log("GET QUERY = ", ctx.query);
      }
      if (ctx.request.method === "POST" || ctx.request.method === "PUT") {  
        ctx.request.body = {
            "data": {
              ...JSON.parse(ctx.request.body),
              organization_id: userData.organization_id.id,
              user_id: user.id
            }
        }
        console.log("POST DATA = ", ctx.request.body.data);
      }
    }
    return await next()
  };
};



















// const jwt = require("jsonwebtoken");

// module.exports = (config, { strapi })=> {
//     return async (context, next) => {

//         try {
//             // console.log("body = ", context);

//             if (context.request.url.startsWith("/api") && context.request.header.authorization) {
//                 const bearertoken = context.request.header.authorization.split("Bearer ")[1];
//                     const apiTokenService = strapi.services["admin::api-token"];
//                     const accessKey = await apiTokenService.hash(bearertoken);
//                     const storedToken = await apiTokenService.getBy({
//                         accessKey: accessKey,
//                     });
//                     console.log("STORED TOKEN = ", storedToken);
//                     if (!storedToken) {
//                         const decodeToken = await strapi.plugins['users-permissions'].services.jwt.verify(bearertoken);
//                         let user = await strapi.db.query('plugin::users-permissions.user').findOne({
//                             where: { id: decodeToken.id },
//                             populate: ["organization_id"]
//                         });

//                         let par = context.request.url.includes("?");
//                         if (context.request.method === "GET") {
//                             context.request.url = `${context.request.url}${par ? "&" : "?"}filters[organization_id][name]=${user.organization_id.name}&populate=*`;
//                         } else if (context.request.method === "POST") {
//                             console.log("zzzzzzzzzzzzzzzzzzzzzz", context.request.body);
//                             context.request.body = {
//                                 data: {
//                                     ...context.request.body.data,
//                                     organization_id: user.organization_id.id,
//                                     user_id: user.id,
//                                     // created_by_id: user.id
//                                 }
//                             }
//                         }
//                         console.log("USER = ", user);
//                     }
//             }
//             return next()
//             // await next();
//             // console.log("cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc");
//         } catch (err) {
//             context.throw(401, 'Unauthorized');
//         }
//     };
// }































// // module.exports = (config, { strapi })=> {
// //     return (context, next) => {
// //         // console.log("skcfgweifgiweg", context.request.url);
// //         // context.request.url = `${context.request.url}?filters[organization_id][name]=codezeros`;
// //         console.log("new    = ", context);
// //         return next()
// //     };
// // }