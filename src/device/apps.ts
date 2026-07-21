import type { AppDef } from "./runtime";
import { openMessages } from "../apps/messages";
import { openPhotos } from "../apps/photos";
import { openNotes } from "../apps/notes";
import { openPhone } from "../apps/phone";
import { openCalendar } from "../apps/calendar";
import { openMaps } from "../apps/maps";
import { openBrowser } from "../apps/browser";
import { openFiles } from "../apps/files";
import { openSettings } from "../apps/settings";
import { openHidden } from "../apps/hidden";
import { openReport } from "../apps/report";
import {
  openMusic,
  openWeather,
  openHealth,
  openPodcasts,
  openMail,
  openSocial,
  openReminders,
  openWallet,
  openAppStore,
  openNews,
  openShopping,
  openDating,
  openGlimpse,
  openChatter,
} from "../apps/flavor";

export function buildAppRegistry(): AppDef[] {
  return [
    {
      id: "messages",
      label: "Messages",
      icon: "messages",
      open: (rt, t) => openMessages(rt, t),
      badge: (rt) => rt.caseFile.messages.filter((th) => !rt.hasViewed(th.id)).length,
    },
    { id: "photos", label: "Photos", icon: "photos", open: (rt, t) => openPhotos(rt, t) },
    { id: "notes", label: "Notes", icon: "notes", open: (rt, t) => openNotes(rt, t) },
    {
      id: "phone",
      label: "Phone",
      icon: "phone",
      open: (rt, t) => (t ? openPhone(rt, t) : openPhone(rt)),
      badge: (rt) => rt.caseFile.voicemails.filter((vm) => !rt.hasViewed(vm.id)).length,
    },
    { id: "calendar", label: "Calendar", icon: "calendar", open: (rt, t) => openCalendar(rt, t) },
    { id: "maps", label: "Maps", icon: "maps", open: (rt, t) => openMaps(rt, t) },
    { id: "browser", label: "Browser", icon: "browser", open: (rt, t) => openBrowser(rt, t) },
    { id: "files", label: "Files", icon: "files", open: (rt) => openFiles(rt) },
    { id: "settings", label: "Settings", icon: "settings", open: (rt) => openSettings(rt) },
    { id: "hidden", label: "Hidden", icon: "flashlight", open: (rt) => openHidden(rt) },
    { id: "report", label: "Case Report", icon: "report", open: (rt) => openReport(rt) },
    // Flavor apps — believable surface to search; none required to solve.
    { id: "music", label: "Music", icon: "music", open: (rt) => openMusic(rt) },
    { id: "weather", label: "Weather", icon: "weather", open: (rt) => openWeather(rt) },
    { id: "health", label: "Health", icon: "health", open: (rt) => openHealth(rt) },
    { id: "podcasts", label: "Podcasts", icon: "podcasts", open: (rt) => openPodcasts(rt) },
    { id: "mail", label: "Mail", icon: "mail", open: (rt) => openMail(rt) },
    { id: "social", label: "Feed", icon: "social", open: (rt) => openSocial(rt) },
    { id: "reminders", label: "Reminders", icon: "reminders", open: (rt) => openReminders(rt) },
    { id: "wallet", label: "Wallet", icon: "wallet", open: (rt) => openWallet(rt) },
    { id: "appstore", label: "App Store", icon: "appstore", open: (rt) => openAppStore(rt) },
    { id: "news", label: "News", icon: "news", open: (rt) => openNews(rt) },
    { id: "shop", label: "Shopping", icon: "shop", open: (rt) => openShopping(rt) },
    { id: "dating", label: "Matches", icon: "dating", open: (rt) => openDating(rt) },
    { id: "glimpse", label: "Glimpse", icon: "glimpse", open: (rt) => openGlimpse(rt) },
    { id: "chatter", label: "Chatter", icon: "chatter", open: (rt) => openChatter(rt) },
  ];
}
