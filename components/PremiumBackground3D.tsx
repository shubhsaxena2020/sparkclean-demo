export default function PremiumBackground3D() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#FBF8F0]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(244,180,0,0.12),transparent_34%),radial-gradient(circle_at_84%_76%,rgba(217,155,0,0.12),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,246,224,0.55))]" />
      <div className="sparkclean-depth-field absolute inset-0">
        <span className="sparkclean-plane sparkclean-plane-a" />
        <span className="sparkclean-plane sparkclean-plane-b" />
        <span className="sparkclean-plane sparkclean-plane-c" />
        <span className="sparkclean-glint sparkclean-glint-a" />
        <span className="sparkclean-glint sparkclean-glint-b" />
      </div>
    </div>
  );
}
