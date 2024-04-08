declare global {
  var require: any
  var PIXI: any
}

if (typeof window !== "undefined" && window.PIXI) {
  let prevRequire = window.require
  window.require = (x: string) => {
    if (prevRequire) return prevRequire(x)
    else if (x.startsWith("@pixi/")) return window.PIXI
  }
}

export {}
