import type { BusinessKind } from "../components/BusinessIcon";

export type Vertical = {
  kind: BusinessKind;
  label: string;
  name: string;
  accent: string;
  accentRgb: string;
  ask: string;
  reply: string;
  done: string;
};

// Generic illustrative businesses, not real clients.
export const VERTICALS: Vertical[] = [
  {
    kind: "clinic",
    label: "عيادة",
    name: "عيادة الابتسامة",
    accent: "#4FA3FF",
    accentRgb: "79,163,255",
    ask: "أبي موعد بكرة",
    reply: "متاح بكرة ٤ م، أثبته لك؟",
    done: "تم الحجز",
  },
  {
    kind: "realestate",
    label: "عقار",
    name: "مكتب الأفق العقاري",
    accent: "#A78BFA",
    accentRgb: "167,139,250",
    ask: "الشقة لسه متاحة؟",
    reply: "متاحة، أرتب لك معاينة الخميس؟",
    done: "تم ترتيب المعاينة",
  },
  {
    kind: "store",
    label: "متجر",
    name: "متجر لمسة",
    accent: "#FFC178",
    accentRgb: "255,193,120",
    ask: "وين وصل طلبي؟",
    reply: "طلبك مع المندوب، يوصلك اليوم",
    done: "تم إرسال رابط التتبع",
  },
  {
    kind: "salon",
    label: "صالون",
    name: "صالون رواق",
    accent: "#F472B6",
    accentRgb: "244,114,182",
    ask: "عندكم موعد اليوم المسا؟",
    reply: "عندنا ٧ م، أثبته لك؟",
    done: "تم الحجز",
  },
];
