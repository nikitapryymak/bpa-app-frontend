import { ADMIN_KEY } from "../constants/envVariables";

export const getBPA = (stats) => {
  const { TB, SB, BB, CI, FC, ROE, HBP, HEADSUP, PA, SAC, SF, SO } = stats;
  const result =
    ((TB + SB + BB + CI + FC + ROE + HBP + HEADSUP) / (PA - SAC - SF) -
      SO / PA +
      stats["2OUTRBI"] * 0.015) *
      4 || 0;
  return result === 0 ? 0 : result.toFixed(3);
};

export const findPlayerIdByName = (row) => (p) =>
  p.firstName?.trim().toLowerCase() + p.lastName?.trim().toLowerCase() ===
  row.First?.trim().toLowerCase() + row.Last?.trim().toLowerCase();

export const getGameDate = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const isAuthed = () => {
  const key = localStorage.getItem("adminKey");

  return key && key === ADMIN_KEY;
};

export const getAdminKey = () => localStorage.getItem("adminKey");

export const getColorByBPA = (bpa) =>
  bpa <= 1.1
    ? "red.600"
    : bpa > 1.1 && bpa < 1.3
    ? "red.300"
    : bpa >= 1.3 && bpa < 1.6
    ? "orange.200"
    : bpa >= 1.6 && bpa < 2
    ? "orange.300"
    : bpa >= 2 && bpa < 2.3
    ? "green.400"
    : bpa >= 2.3
    ? "#11ff6c"
    : "";
