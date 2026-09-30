import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import HomePage from "../src/app/page";

test("la portada se renderiza en español", () => {
  const html = renderToStaticMarkup(<HomePage />);
  assert.match(html, /Tienda en preparación/);
  assert.match(html, /repuestos impresos en 3D y filamentos/);
});
