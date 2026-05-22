import { getBackgroundByGate } from "@/data/backgrounds";

import { FloatingDecorations } from "./FloatingDecorations";

type SceneBackgroundProps = {
  gateId: number;
  variant?: "intro" | "journey" | "middle" | "finale";
};

function GardenScene() {
  return (
    <>
      <div className="absolute inset-x-[-8%] bottom-[12%] h-[34%] rounded-[50%] bg-[linear-gradient(180deg,#dcf8b5,#7cbc6f)]" />
      <div className="absolute inset-x-[8%] bottom-[-4%] h-[28%] rounded-[45%] bg-[linear-gradient(180deg,#9fd679,#70ab68)]" />
      <div className="absolute left-[8%] top-[26%] h-28 w-28 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute right-[10%] top-[18%] h-32 w-32 rounded-full bg-amber-100/28 blur-3xl" />
      <div className="absolute left-[7%] bottom-[20%] h-24 w-14 rounded-t-full bg-[#86c96b]" />
      <div className="absolute left-[10%] bottom-[18%] h-10 w-10 rounded-full bg-[#ffd1e1]" />
      <div className="absolute right-[12%] bottom-[20%] h-24 w-16 rounded-t-full bg-[#77bc67]" />
      <div className="absolute right-[14%] bottom-[18%] h-12 w-12 rounded-full bg-[#fff0a6]" />
    </>
  );
}

function LakeScene() {
  return (
    <>
      <div className="absolute right-[12%] top-[10%] h-24 w-24 rounded-full bg-[#f8f3da] shadow-[0_0_55px_rgba(255,255,225,0.35)]" />
      <div className="absolute inset-x-[14%] bottom-[16%] h-[25%] rounded-[50%] bg-[linear-gradient(180deg,rgba(201,223,255,0.85),rgba(74,110,188,0.8))]" />
      <div className="absolute left-[18%] bottom-[24%] h-7 w-16 rounded-full bg-[#91b3eb]/75" />
      <div className="absolute right-[18%] bottom-[26%] h-7 w-16 rounded-full bg-[#91b3eb]/75" />
      <div className="absolute left-[17%] bottom-[32%] h-2.5 w-10 rounded-full bg-white/40" />
      <div className="absolute right-[17%] bottom-[34%] h-2.5 w-10 rounded-full bg-white/40" />
      <div className="absolute left-[24%] bottom-[22%] h-8 w-12 rounded-[50%_50%_20%_20%] border border-white/40 bg-white/20" />
      <div className="absolute right-[26%] bottom-[21%] h-8 w-12 rounded-[50%_50%_20%_20%] border border-white/40 bg-white/20" />
    </>
  );
}

function ForestScene() {
  return (
    <>
      <div className="absolute inset-x-[-4%] bottom-[10%] h-[36%] rounded-[50%] bg-[linear-gradient(180deg,#8dcf7d,#4a7141)]" />
      <div className="absolute left-[8%] bottom-[18%] h-[34%] w-10 rounded-full bg-[#6d4b30]" />
      <div className="absolute left-[2%] bottom-[36%] h-24 w-24 rounded-full bg-[#86b96b]" />
      <div className="absolute right-[14%] bottom-[20%] h-[40%] w-10 rounded-full bg-[#6d4b30]" />
      <div className="absolute right-[7%] bottom-[40%] h-28 w-28 rounded-full bg-[#7eb168]" />
      <div className="absolute left-[23%] bottom-[15%] h-10 w-10 rounded-full bg-[#f4e9cc]" />
      <div className="absolute left-[21%] bottom-[18%] h-12 w-4 rounded-full bg-[#e2cfa6]" />
      <div className="absolute right-[24%] bottom-[16%] h-8 w-12 rounded-full bg-[#f2e6da]" />
      <div className="absolute right-[26%] bottom-[17%] h-11 w-2 rounded-full bg-[#fff3ef]" />
    </>
  );
}

function FieldScene() {
  return (
    <>
      <div className="absolute inset-x-[-2%] bottom-[11%] h-[32%] rounded-[45%] bg-[linear-gradient(180deg,#daf4b0,#9fd16b)]" />
      <div className="absolute left-[10%] bottom-[40%] h-[2px] w-28 rotate-6 bg-white/35" />
      <div className="absolute left-[20%] bottom-[44%] h-[2px] w-36 -rotate-6 bg-white/25" />
      <div className="absolute right-[16%] bottom-[43%] h-[2px] w-28 rotate-[8deg] bg-white/30" />
      <div className="absolute left-[12%] bottom-[13%] h-14 w-14 rounded-full bg-white/70" />
      <div className="absolute left-[16%] bottom-[15%] h-4 w-4 rounded-full bg-amber-200" />
      <div className="absolute right-[15%] bottom-[14%] h-12 w-12 rounded-full bg-white/72" />
      <div className="absolute right-[19%] bottom-[16%] h-4 w-4 rounded-full bg-pink-200" />
    </>
  );
}

function PicnicScene() {
  return (
    <>
      <div className="absolute inset-x-[-4%] bottom-[8%] h-[38%] rounded-[45%] bg-[linear-gradient(180deg,#f7d99a,#c48b54)]" />
      <div className="absolute left-1/2 bottom-[20%] h-16 w-32 -translate-x-1/2 rounded-2xl bg-[#ef8aa0]" />
      <div className="absolute left-1/2 bottom-[20%] h-16 w-32 -translate-x-1/2 rounded-2xl bg-[linear-gradient(90deg,transparent_0%,transparent_12%,rgba(255,255,255,0.55)_12%,rgba(255,255,255,0.55)_20%,transparent_20%,transparent_32%,rgba(255,255,255,0.55)_32%,rgba(255,255,255,0.55)_40%,transparent_40%)] opacity-70" />
      <div className="absolute left-[26%] bottom-[22%] h-12 w-12 rounded-2xl bg-[#d18f58]" />
      <div className="absolute left-[29%] bottom-[31%] h-4 w-6 rounded-full bg-[#ffe5a8]" />
      <div className="absolute left-[50%] bottom-[29%] h-8 w-8 -translate-x-1/2 rounded-full bg-[#ffe7ed]" />
      <div className="absolute left-[50%] bottom-[31%] h-4 w-10 -translate-x-1/2 rounded-full bg-[#ffe9a1]" />
      <div className="absolute inset-x-[16%] top-[14%] h-1 bg-[linear-gradient(90deg,transparent,rgba(255,214,155,0.8),transparent)]" />
      <div className="absolute left-[20%] top-[14%] h-8 w-8 rounded-full bg-amber-100/85 shadow-[0_0_18px_rgba(255,216,143,0.62)]" />
      <div className="absolute left-[50%] top-[14%] h-8 w-8 -translate-x-1/2 rounded-full bg-amber-100/85 shadow-[0_0_18px_rgba(255,216,143,0.62)]" />
      <div className="absolute right-[20%] top-[14%] h-8 w-8 rounded-full bg-amber-100/85 shadow-[0_0_18px_rgba(255,216,143,0.62)]" />
    </>
  );
}

function SeasideScene() {
  return (
    <>
      <div className="absolute right-[16%] top-[11%] h-20 w-20 rounded-full bg-[#fff8d3] shadow-[0_0_42px_rgba(255,244,191,0.34)]" />
      <div className="absolute inset-x-0 bottom-[10%] h-[34%] bg-[linear-gradient(180deg,#2e7fc0,#0f3156)]" />
      <div className="absolute inset-x-0 bottom-[8%] h-[16%] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.48),transparent_56%)]" />
      <div className="absolute inset-x-[8%] bottom-[8%] h-[12%] rounded-[50%] bg-[#e0caaa]" />
      <div className="absolute left-[18%] bottom-[12%] h-6 w-8 rounded-[50%_50%_0_0] bg-[#fff2ea]/80" />
      <div className="absolute right-[19%] bottom-[13%] h-6 w-8 rounded-[50%_50%_0_0] bg-[#ffd7d6]/75" />
      <div className="absolute left-[50%] bottom-[13%] h-3 w-14 -translate-x-1/2 rounded-full bg-white/40" />
    </>
  );
}

function LanternScene() {
  return (
    <>
      <div className="absolute inset-x-[-4%] bottom-[10%] h-[34%] rounded-[45%] bg-[linear-gradient(180deg,#7b568d,#411f48)]" />
      <div className="absolute inset-x-[12%] top-[16%] h-1 bg-[linear-gradient(90deg,transparent,rgba(255,203,138,0.8),transparent)]" />
      <div className="absolute left-[24%] bottom-[16%] h-12 w-9 rounded-full bg-[#2b1734]" />
      <div className="absolute left-[26%] bottom-[25%] h-16 w-16 rounded-full bg-[#55356e]" />
      <div className="absolute right-[20%] bottom-[16%] h-8 w-16 rounded-[50%] bg-[#2b1734]" />
      <div className="absolute right-[18%] bottom-[20%] h-4 w-4 rounded-full bg-[#ffd58e]" />
      <div className="absolute right-[14%] bottom-[18%] h-3 w-3 rounded-full bg-[#ffd58e]" />
    </>
  );
}

function CloudScene() {
  return (
    <>
      <div className="absolute left-[12%] top-[24%] h-24 w-44 rounded-full bg-white/85" />
      <div className="absolute left-[20%] top-[18%] h-20 w-28 rounded-full bg-white/95" />
      <div className="absolute right-[16%] top-[28%] h-20 w-36 rounded-full bg-white/82" />
      <div className="absolute right-[24%] top-[20%] h-16 w-24 rounded-full bg-white/95" />
      <div className="absolute left-[14%] bottom-[18%] h-14 w-[72%] rounded-full bg-white/74 shadow-[0_18px_40px_rgba(154,183,255,0.28)]" />
      <div className="absolute left-[20%] top-[36%] h-20 w-[60%] rounded-full bg-[linear-gradient(90deg,rgba(255,165,200,0.25),rgba(255,221,156,0.15),rgba(167,212,255,0.24))]" />
    </>
  );
}

function StarPathScene() {
  return (
    <>
      <div className="absolute left-1/2 bottom-[10%] h-[44%] w-[24%] -translate-x-1/2 rounded-[50%_50%_10%_10%] bg-[linear-gradient(180deg,rgba(255,214,132,0.76),rgba(255,214,132,0.05))] blur-[2px]" />
      <div className="absolute left-1/2 bottom-[12%] h-[36%] w-[12%] -translate-x-1/2 rounded-[50%_50%_10%_10%] bg-[linear-gradient(180deg,#ffe9aa,rgba(255,232,170,0.08))]" />
      <div className="absolute inset-x-0 bottom-[10%] h-[22%] bg-[linear-gradient(180deg,rgba(31,26,76,0.2),rgba(9,10,36,0.82))]" />
      <div className="absolute left-[12%] top-[22%] h-20 w-20 rounded-full bg-[#7457af]/20 blur-3xl" />
      <div className="absolute right-[8%] top-[14%] h-24 w-24 rounded-full bg-[#ffd073]/18 blur-3xl" />
    </>
  );
}

function StageScene() {
  return (
    <>
      <div className="absolute inset-x-0 top-0 h-[18%] bg-[linear-gradient(180deg,rgba(255,255,255,0.24),transparent)]" />
      <div className="absolute inset-x-[8%] bottom-[10%] h-[30%] rounded-[48%_48%_10%_10%] bg-[linear-gradient(180deg,#ffd9a7,#b96579)]" />
      <div className="absolute left-[14%] top-[18%] h-40 w-14 rounded-b-[40px] bg-[#ffb9c5]/30" />
      <div className="absolute right-[14%] top-[18%] h-40 w-14 rounded-b-[40px] bg-[#ffb9c5]/30" />
      <div className="absolute left-[18%] top-[18%] h-1 w-[64%] bg-[linear-gradient(90deg,transparent,rgba(255,245,204,0.82),transparent)]" />
      <div className="absolute left-[22%] top-[18%] h-7 w-7 rounded-full bg-amber-100/90 shadow-[0_0_18px_rgba(255,232,179,0.78)]" />
      <div className="absolute left-[50%] top-[18%] h-7 w-7 -translate-x-1/2 rounded-full bg-amber-100/90 shadow-[0_0_18px_rgba(255,232,179,0.78)]" />
      <div className="absolute right-[22%] top-[18%] h-7 w-7 rounded-full bg-amber-100/90 shadow-[0_0_18px_rgba(255,232,179,0.78)]" />
    </>
  );
}

function IntroOverlay() {
  return (
    <>
      <div className="absolute left-[6%] top-[18%] h-28 w-28 rounded-full bg-[#ffe0b7]/35 blur-3xl" />
      <div className="absolute right-[6%] top-[12%] h-36 w-36 rounded-full bg-[#ffe4f5]/30 blur-3xl" />
      <div className="absolute inset-x-[-10%] bottom-[10%] h-[34%] rounded-[50%] bg-[linear-gradient(180deg,#bce4b7,#7db58f)]" />
      <div className="absolute left-[16%] bottom-[14%] h-20 w-14 rounded-t-full bg-[#6aa06f]" />
      <div className="absolute left-[20%] bottom-[12%] h-10 w-10 rounded-full bg-[#ffd3d8]" />
      <div className="absolute right-[20%] bottom-[16%] h-16 w-16 rounded-full bg-[#fde8a8]/70" />
    </>
  );
}

export function SceneBackground({
  gateId,
  variant = "journey",
}: SceneBackgroundProps) {
  const theme = getBackgroundByGate(gateId);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${theme.palette.skyTop} 0%, ${theme.palette.skyBottom} 48%, ${theme.palette.horizon} 64%, ${theme.palette.groundBottom} 100%)`,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.42),transparent_48%)]" />
      <div
        className="absolute inset-x-[-10%] bottom-0 h-[44%] rounded-t-[40%]"
        style={{
          background: `linear-gradient(180deg, ${theme.palette.groundTop}, ${theme.palette.groundBottom})`,
        }}
      />

      {variant === "intro" ? <IntroOverlay /> : null}
      {theme.scene === "garden" ? <GardenScene /> : null}
      {theme.scene === "lake" ? <LakeScene /> : null}
      {theme.scene === "forest" ? <ForestScene /> : null}
      {theme.scene === "field" ? <FieldScene /> : null}
      {theme.scene === "picnic" ? <PicnicScene /> : null}
      {theme.scene === "seaside" ? <SeasideScene /> : null}
      {theme.scene === "lantern" ? <LanternScene /> : null}
      {theme.scene === "cloud" ? <CloudScene /> : null}
      {theme.scene === "starpath" ? <StarPathScene /> : null}
      {theme.scene === "stage" ? <StageScene /> : null}

      {variant === "middle" ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,243,214,0.22),transparent_55%)]" />
      ) : null}
      {variant === "finale" ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,238,177,0.18),transparent_62%)]" />
      ) : null}

      <FloatingDecorations decorations={theme.decorations} />
      <div className="absolute inset-x-0 bottom-0 h-[24%] bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.12))]" />
    </div>
  );
}
