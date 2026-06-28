import Image from "next/image";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold bg-deep text-sm font-black tracking-tight text-white shadow-lg">
        <span>BG</span><span className="text-gold">FS</span>
      </div>
      {!compact && (
        <div>
          <p className="text-base font-black tracking-tight text-white">BGFS Digital</p>
          <p className="text-xs text-gold">Soluções digitais premium</p>
        </div>
      )}
    </div>
  );
}

export function LogoImage() {
  return <Image src="/logo-bgfs.svg" alt="BGFS Digital" width={340} height={90} priority />;
}
