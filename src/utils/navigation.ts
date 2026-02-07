// An array of links for navigation bar
const navBarLinks = [
  { name: "Products", url: "/products" },
  { name: "Applications", url: "/applications" },
  { name: "Quality", url: "/quality" },
  { name: "About", url: "/about" },
  { name: "Contact", url: "/contact-us" },
  { name: "Cart", url: "/cart" },
];
// An array of links for footer
const footerLinks = [
  {
    section: "Solutions",
    links: [
      { name: "All Products", url: "/products" },
      { name: "By Industry", url: "/applications" },
      { name: "Quality Standards", url: "/quality" },
    ],
  },
  {
    section: "Company",
    links: [
      { name: "About Us", url: "/about" },
      { name: "Contact", url: "/contact-us" },
      { name: "Request Quote", url: "/cart" },
    ],
  },
];
// An object of links for social icons
const socialLinks = {
  facebook: "https://www.facebook.com/",
  x: "https://twitter.com/",
  github: "https://github.com/mearashadowfax/ScrewFast",
  google: "https://www.google.com/",
  slack: "https://slack.com/",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};