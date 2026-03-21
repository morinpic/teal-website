import { getStaffList } from "@/lib/microcms";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import StaffCardAnimated from "@/components/StaffCardAnimated";

export default async function StaffSection() {
  const { contents: staffList } = await getStaffList();

  return (
    <section id="staff" className="bg-teal-primary px-6 py-24 lg:py-36">
      <div className="mx-auto max-w-screen-xl">
        <SectionHeading title="STAFF" subtitle="スタッフ紹介" light={true} />

        {staffList.length > 0 ? (
          <>
            <div className="flex flex-wrap justify-center gap-10">
              {staffList.map((staff, index) => (
                <StaffCardAnimated key={staff.id} staff={staff} index={index} />
              ))}
            </div>
            <div className="mt-16 flex justify-center">
              <Button variant="ghost-white" href="/staff">
                READ MORE
              </Button>
            </div>
          </>
        ) : (
          <p className="py-12 text-center text-sm text-white/40">
            スタッフ情報は準備中です
          </p>
        )}
      </div>
    </section>
  );
}
