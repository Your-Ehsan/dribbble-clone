import { g, auth, config } from "@grafbase/sdk";

// Welcome to Grafbase!
// Define your data models, integrate auth, permission rules, custom resolvers, search, and more with Grafbase.
// Integrate Auth
// https://grafbase.com/docs/auth
//
// const authProvider = auth.OpenIDConnect({
//   issuer: process.env.ISSUER_URL ?? ''
// })
//
// Define Data Models
// https://grafbase.com/docs/database

const jwt = auth.JWT({
    issuer: "grafbase",
    secret: g.env("NEXTAUTH_SECRET"),
  }),
  User: any = g
    .model("User", {
      name: g.string().length({ min: 2, max: 100 }),
      email: g.string().unique(),
      avatarUrl: g.url(),
      description: g.string().length({ min: 2, max: 1000 }).optional(),
      githubUrl: g.url().optional(),
      linkedInUrl: g.url().optional(),
      projects: g
        .relation(() => Project)
        .list()
        .optional(),
    })
    .auth((rules) => {
      rules.public().read();
    }),
    
  Project: any = g
    .model("Project", {
      title: g.string().length({ min: 3 }),
      description: g.string(),
      image: g.url(),
      liveSiteUrl: g.url(),
      githubUrl: g.url(),
      category: g.string().search(),
      createdBy: g.relation(() => User),
    })
    .auth((rules) => {
      rules.public().read();
      rules.private().create().delete().update();
    });

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});
