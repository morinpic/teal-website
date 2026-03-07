import AnimatedLine from "@/components/AnimatedLine";
import ScrollAnimation from "@/components/ScrollAnimation";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  light?: boolean;
  size?: "lg" | "md";
};

export default function SectionHeading({ title, subtitle, light = false, size = "md" }: SectionHeadingProps) {
  return (
    <ScrollAnimation className="mb-16 flex flex-col items-center gap-3">
      <h2
        className={`font-urbanist font-normal tracking-[0.2em] ${
          size === "lg" ? "text-4xl lg:text-5xl" : "text-3xl lg:text-4xl"
        } ${light ? "text-white" : "text-dark-text"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`font-accent text-sm tracking-widest ${
            light ? "text-white/70" : "text-dark-text/50"
          }`}
        >
          {subtitle}
        </p>
      )}
      <AnimatedLine />
    </ScrollAnimation>
  );
}
