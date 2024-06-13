import React from "react";
import HeaderText from "../text/HeaderText";
import { getDepartments } from "../api/doctor";
import { useQuery } from "@tanstack/react-query";

const ClinicOffer = () => {
  const {
    data: departmentsData,
    isLoading: departmentsLoading,
    isError: departmentsError,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: () => getDepartments(),
  });
  if ( departmentsLoading) return <div>Loading...</div>;
  if ( departmentsError) return <div>Error fetching data</div>;

  const departments = departmentsData || [];
  console.log(departments)

  return (
    <div className="px-4 py-10 lg:px-96">
      <HeaderText
        text="We offer a whole range of treatments
for you, your family and friends"
      />
      <p className="text-black text-sm font-sans leading-8 text-justify py-8">
        Best Care offers a wide range of services, including emergency care,
        scheduled surgeries, labor and delivery services, diagnostic testing,
        lab work, and patient education. Depending on their health situation,
        patients may receive inpatient or outpatient care from a us.
      </p>
      <div className="grid grid-cols-2">
        {
          departments[0].departments.map((department)=>{
            <p className="text-headerText text-sm lg:text-xl font-semibold text-start pt-2">✓ {department}</p>
          })
        }
        {/* <div>
            <p className="text-headerText text-sm lg:text-xl font-semibold text-start pt-2">✓ Cardiology</p>
            <p className="text-headerText text-sm lg:text-xl font-semibold text-start pt-2">✓ Pediatric</p>
            <p className="text-headerText text-sm lg:text-xl font-semibold text-start pt-2">✓ Dental</p>
        </div>
        <div>
        <p className="text-headerText text-sm lg:text-xl font-semibold text-start pt-2">✓ Gynecology</p>
        <p className="text-headerText text-sm lg:text-xl font-semibold text-start pt-2">✓ Neorology</p>
        
        <p className="text-headerText text-sm lg:text-xl font-semibold text-start pt-2">✓ Otorhinolaryngology</p>
        </div> */}
      </div>
    </div>
  );
};

export default ClinicOffer;
