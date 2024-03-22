// ==UserScript==
// @name         Old-school GitHub Linguist Colors
// @namespace    https://gplane.win/
// @version      0.1.0
// @description  Change some GitHub linguist colors to old-school style.
// @author       Pig Fang
// @license      MIT
// @match        https://github.com/*
// @grant        none
// ==/UserScript==
;(function() {
  'use strict'

  // key is current color and value is old color
  const colorsMap: Record<string, string> = {
    '#3178c6': '#2b7489', // TypeScript
    '#ef7a08': '#3be133', // OCaml
    '#a97bff': '#f18e33', // Kotlin
    '#41b883': '#2c3e50', // Vue
    '#00add8': '#375eab', // Go
  }
  const rgbMap = Object.fromEntries(
    Object.keys(colorsMap).map((color) => {
      const r = Number.parseInt(color.slice(1, 3), 16),
        g = Number.parseInt(color.slice(3, 5), 16),
        b = Number.parseInt(color.slice(5, 7), 16)
      return [color, `rgb(${r}, ${g}, ${b})`]
    })
  )

  const observer = new MutationObserver(() => {
    Object.entries(colorsMap).forEach(([from, to]) => {
      document.querySelectorAll<HTMLElement>(`[style*="${from}" i]`).forEach((element) => {
        element.style.cssText = element.style.cssText.replaceAll(rgbMap[from]!, to)
      })
    })
  })
  observer.observe(document.body, { subtree: true, childList: true })
})()
