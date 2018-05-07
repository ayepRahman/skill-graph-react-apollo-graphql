export default {
  root: "/",
  faq: "/faq",
  thankYou: "/thank-you",
  termsOfUse: "/terms-of-use",
  privacyPolicy: "/privacy-policy",
  company: "/company",
  auth: {
    signUp: "/sign-up",
    verificationEmailSent: "/verification-email-sent",
    resendVerificationEmail: "/resend-verification-email",
    verifyEmail: "/verify-email",
    login: "/login",
    changePassword: "/password/change",
    setPassword: "/password/set",
    linkedAccounts: "/linked-accounts",
    forgotPassword: "/password/forgot",
    resetPassword: "/password/reset",
    approvalRequired: "/approval-required"
  },
  users: {
    root: "/users",
    myProfile: "/profile",
    profile: "/users/:id",
    vanityProfile: "/:username"
  },
  admin: {
    root: "/admin",
    users: {
      index: "/admin/users"
    },
    companies: {
      root: "/admin/companies",
      new: "/admin/companies/new",
      edit: "/admin/companies/:prettyId/edit/:section?"
    },
    skills: {
      root: "/admin/skills",
      new: "/admin/skills/new"
    },
    badges: {
      root: "/admin/badges",
      new: "/admin/badges/new",
      edit: "/admin/badges/:prettyId/edit",
      assign: "/admin/badges/assign"
    }
  }
};
