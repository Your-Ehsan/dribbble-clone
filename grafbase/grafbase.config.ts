import { g, auth, config} from "@grafbase/sdk";

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

const User = g.model("User", {
    name: g.string().length({ max: 20, min: 3 }),
    email: g.string().unique(),
    avatarUrl: g.url(),
    description: g.string().optional(),
    githubUrl: g.url().unique(),
    linkedInUrl: g.url().optional(),
    projects: g
      .relation(() => Project)
      .list()
      .optional(),
  }),
  Project = g.model("Project", {
    title: g.string().length({ min: 3 }),
    description: g.string().optional(),
    image: g.url(),
    liveUrl: g.url().optional(),
    githubUrl: g.url().optional(),
    category: g.string().search(),
    createdBy: g.relation(() => User),
  });

export default config({
  schema: g,
  // Integrate Auth
  // https://grafbase.com/docs/auth
  // auth: {
  //   providers: [authProvider],
  //   rules: (rules) => {
  //     rules.private()
  //   }
  // }
});
