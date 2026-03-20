export default function GridBackground() {
  return (
    <>
      {/* Grid lines */}
      <div
        className="fixed inset-0 pointer-events-none z-0 grid-bg"
        aria-hidden
      />
      {/* Teal radial glow */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(0,208,132,0.07) 0%, transparent 70%)",
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        aria-hidden
      />
    </>
  );
}
