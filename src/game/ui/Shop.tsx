import { useState } from "react";
import { ArrowRight, Check, Rotate3D, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import magnet from "@/assets/shop/magnet.png";
import airbag from "@/assets/shop/airbag.png";
import noads from "@/assets/shop/noads.png";
import { PREMIUMS, premiumById, priceText, type PremiumId } from "../shop";
import { endTestDrive, exitMenu, startTrial } from "../physics";
import { useGame } from "../store";
import { audio } from "../audio";
import { ProductModel } from "./ProductModel";

const pictures = { magnet, airbag, noads };
export function Shop() {
  const [selected, setSelected] = useState<PremiumId>("magnet");
  const item = premiumById(selected);
  const tryItem = () => {
    audio.play("ui");
    if (selected === "noads") startTrial("noads");
    else startTrial(selected);
  };
  return <div className="shop-overlay absolute inset-0 z-20 flex items-center justify-center p-3 sm:p-6" onPointerDown={e => e.stopPropagation()}>
    <section className="shop-window flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-panel-border bg-panel text-panel-foreground" role="dialog" aria-modal="true" aria-label="Premium shop">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-panel-border px-5 py-4">
        <div><p className="flex items-center gap-2 text-xs font-medium text-cool"><ShoppingCart className="h-4 w-4" /> DOWNHILL DASH</p><h2 className="mt-1 font-display text-2xl sm:text-3xl">PREMIUM SHOP</h2></div>
        <Button variant="ghost" size="icon" aria-label="Close shop" onClick={exitMenu} className="shrink-0 text-panel-foreground"><X /></Button>
      </header>
      <div className="min-h-0 overflow-y-auto">
        <div className="grid grid-cols-3 gap-2 border-b border-panel-border p-3 sm:gap-3 sm:p-5">
          {PREMIUMS.map(p => <Button key={p.id} variant="ghost" aria-pressed={selected === p.id} onClick={() => { audio.play("ui"); setSelected(p.id); }} className={`h-auto min-w-0 flex-col gap-1 whitespace-normal rounded-lg border p-2 text-center sm:p-3 ${selected === p.id ? "border-gold bg-gold/10" : "border-panel-border bg-panel-foreground/5"}`}>
            <img src={pictures[p.id]} alt={p.name} className="h-16 w-full object-contain sm:h-24" />
            <span className="text-xs font-bold sm:text-sm">{p.id === "magnet" ? "COIN MAGNET" : p.name}</span>
            <span className={`font-display text-sm sm:text-lg ${p.id === "noads" ? "shop-price-pulse text-bad" : "text-gold"}`}>{priceText(p)}</span>
          </Button>)}
        </div>
        <div className="grid sm:grid-cols-2">
          <div className="relative h-52 sm:h-72" key={selected}><ProductModel id={selected} /><Rotate3D className="absolute bottom-3 left-4 h-5 w-5 text-panel-foreground/50" aria-hidden="true" /></div>
          <div className="px-5 pb-5 sm:py-6 sm:pr-8">
            <p className="mb-2 text-xs font-semibold uppercase text-cool">{item.tagline}</p>
            <h3 className="font-display text-xl sm:text-2xl">{item.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-panel-foreground/80">{item.desc}</p>
            <p className="mt-4 flex items-center gap-2 text-xs text-gold"><Check className="h-4 w-4" /> {item.kind === "once" ? "One purchase · every car" : "Active subscription · every car"}</p>
            {selected === "noads" && <p className="mt-3 text-xs text-panel-foreground/60">There are no advertisements in Downhill Dash yet.</p>}
          </div>
        </div>
      </div>
      <footer className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-panel-border px-5 py-4">
        <div><span className={`inline-block font-display text-2xl ${selected === "noads" ? "shop-price-pulse text-bad" : "text-gold"}`}>{priceText(item)}</span><p className="mt-1 text-xs text-panel-foreground/60">Purchases unavailable — payments not connected</p></div>
        <Button size="lg" className="bg-gold font-bold text-gold-foreground hover:bg-gold/90" onClick={tryItem}>Try it! <ArrowRight /></Button>
      </footer>
    </section>
  </div>;
}

export function TrialBar() {
  const trial = useGame(s => s.trial);
  if (!trial) return null;
  return <div className="pointer-events-auto absolute inset-x-3 bottom-4 z-10 mx-auto flex max-w-lg items-center justify-between gap-3 rounded-lg border border-panel-border bg-panel px-4 py-3 text-panel-foreground">
    <div><p className="font-display text-sm">{trial === "noads" ? "AD-FREE PREVIEW" : `${trial.toUpperCase()} TRIAL`}</p><p className="text-xs text-panel-foreground/70">{trial === "noads" ? "No ads exist yet · no purchase or ownership granted" : "Practice only · no coins or XP earned"}</p></div>
    <Button variant="ghost" className="shrink-0 text-cool" onClick={endTestDrive}>Back to shop <ArrowRight /></Button>
  </div>;
}