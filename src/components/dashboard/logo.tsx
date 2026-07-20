import { Circle, Hexagon } from "lucide-react";

type LogoProps = {
  size?: number;
  className?: string;
};

export function Logo({ size = 36, className }: LogoProps) {
  const circleSize = Math.round(size * 0.38);
  const circleOffset = Math.round((size - circleSize) / 2);

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ height: size, position: "relative", width: size }}
    >
      <Hexagon
        size={size}
        strokeWidth={2.2}
        className="absolute inset-0"
      />
      <Circle
        size={circleSize}
        strokeWidth={5.2}
        className="absolute"
        style={{ left: circleOffset, top: circleOffset }}
      />
    </div>
  );
}
