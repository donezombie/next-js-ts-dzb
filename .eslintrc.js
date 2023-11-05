module.exports = {
  env: {
    node: true,
  },
  "extends": "next/core-web-vitals",
  rules: {
    "import/no-anonymous-default-export": "off",
    "react/react-in-jsx-scope": "off",
    "func-style": "off",
    "no-console": "off",
  },
};
