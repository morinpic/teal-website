import ScrollAnimation from "@/components/ScrollAnimation";
import Button from "@/components/Button";

const RESERVE_URL = "https://beauty.hotpepper.jp/slnH000784195/";

export default function AboutSection() {
  return (
    <section id="about" className="bg-white px-6 py-24 lg:py-36">
      <div className="mx-auto max-w-2xl text-center">
        <ScrollAnimation className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm tracking-[0.3em] text-teal-primary uppercase">
              Hair Salon / Yokohama Motomachi
            </p>
            <div className="mt-2 h-px w-12 bg-teal-primary" />
          </div>

          <p className="font-accent text-5xl lg:text-7xl font-light leading-none tracking-tight text-dark-text">
            Your Story.
          </p>

          <div className="mt-4 flex flex-col gap-5">
            <p className="text-lg font-light leading-relaxed tracking-wide text-dark-text lg:text-xl">
              teal.は、横浜元町に佇む静かな美容院です。
            </p>
            <p className="text-base leading-loose text-dark-text/70 lg:text-lg">
              お客様一人ひとりの個性と向き合い、
              <br className="hidden lg:block" />
              その方だけのスタイルを丁寧に創り上げます。
            </p>
            <p className="text-base leading-loose text-dark-text/70 lg:text-lg">
              非日常の時間を、ゆっくりとお楽しみください。
            </p>
          </div>

          <div className="mt-4">
            <Button
              variant="primary"
              href={RESERVE_URL}
              external
              aria-label="ホットペッパービューティーで予約する"
            >
              RESERVE
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
