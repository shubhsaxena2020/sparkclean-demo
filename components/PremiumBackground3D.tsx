export default function PremiumBackground3D() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#f9f9f8]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(6,61,46,0.13),transparent_34%),radial-gradient(circle_at_84%_76%,rgba(212,175,55,0.13),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.72),rgba(237,250,246,0.56))]" />
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
