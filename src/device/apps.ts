import type { AppDef } from "./runtime";
import { openMessages } from "../apps/messages";
import { openPhotos } from "../apps/photos";
import { openNotes } from "../apps/notes";
import { openPhone } from "../apps/phone";
import { openVoicemail } from "../apps/voicemail";
import { openCalendar } from "../apps/calendar";
import { openMaps } from "../apps/maps";
import { openBrowser } from "../apps/browser";
import { openFiles } from "../apps/files";
import { openSettings } from "../apps/settings";
import { openHidden } from "../apps/hidden";
import { openReport } from "../apps/report";

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
    { id: "voicemail-direct", label: "Voicemail", icon: "phone", open: (rt, t) => openVoicemail(rt, t) },
    { id: "calendar", label: "Calendar", icon: "calendar", open: (rt, t) => openCalendar(rt, t) },
    { id: "maps", label: "Maps", icon: "maps", open: (rt, t) => openMaps(rt, t) },
    { id: "browser", label: "Browser", icon: "browser", open: (rt, t) => openBrowser(rt, t) },
    { id: "files", label: "Files", icon: "files", open: (rt) => openFiles(rt) },
    { id: "settings", label: "Settings", icon: "settings", open: (rt) => openSettings(rt) },
    { id: "hidden", label: "Hidden", icon: "flashlight", open: (rt) => openHidden(rt) },
    { id: "report", label: "Report", icon: "report", open: (rt) => openReport(rt) },
  ];
}
