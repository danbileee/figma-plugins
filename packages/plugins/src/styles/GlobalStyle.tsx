import { Global, css } from "@emotion/react";

import localFont from "next/font/local";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.subset.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.subset.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        html {
          scroll-behavior: smooth;
          text-size-adjust: 100%;
        }

        body {
          padding: 0;
          margin: 0;
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
          font-family: ${pretendard.style.fontFamily};
        }

        hr {
          box-sizing: content-box;
          height: 0;
          overflow: visible;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        a {
          text-decoration: none;
          margin: 0;
          color: var(--gray-900);
        }

        button {
          cursor: pointer;
          background: none;
          padding: 0;
          border: none;
          outline: none;
          color: var(--gray-900);
        }

        ol,
        ul,
        li {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        button,
        input,
        optgroup,
        select,
        textarea {
          font-family: inherit;
          font-size: 100%;
          margin: 0;
        }

        label {
          font-size: 14px;
        }

        select {
          outline: none;
        }

        input:focus {
          outline: none;
        }

        textarea {
          box-shadow: none;
          resize: none;
        }

        textarea:focus {
          outline: none;
        }

        sub,
        sup {
          font-size: 75%;
          line-height: 0;
          position: relative;
          vertical-align: baseline;
        }

        img {
          border-style: none;
        }

        code,
        kbd,
        samp,
        pre {
          font-family: "Lucida Console", "Monaco", monospace;
        }
      `}
    />
  );
}
