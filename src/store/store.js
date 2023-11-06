import { proxy } from "valtio";

const colorSamples = ["#ccc", "#EFBD4E", "#80C670", "#726DE8", "#EF674E", "#353934"];

const state = proxy({
  intro: true,
//   colors: colorSamples[Math.floor(Math.random() * colorSamples.length)],
colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  decals: ["react", "three2", "pmndrs"],
  color: "#EFBD4E",
  defaultColor: "#F3B600",
  defaultBgColor: "#3C3D3E",
  decal: "three2",

  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './GH.png',
  fullDecal: './GH.png',
});

export default state;