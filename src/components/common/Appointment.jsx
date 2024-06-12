import React, { useEffect, useState } from "react";
import phone from "../../assets/images/phone.png";
import AppointmentButton from "../buttons/AppointmentButton";
import SubmitButton from "../buttons/SubmitButton";
import { getDepartments, getDoctors } from "../api/doctor";
import { useQuery } from "@tanstack/react-query";

const Appointment = () => {
  const [formData, setFormData] = useState({
    
  });
  

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://best-care-hospital-backend.vercel.app/createappointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Your appointment is on the way!');
        
      } else {
        alert('Failed to book the appointment.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to book the appointment.');
    }
  };

  const {
    data: doctorsData,
    isLoading: doctorsLoading,
    isError: doctorsError,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(),
  });

  const {
    data: departmentsData,
    isLoading: departmentsLoading,
    isError: departmentsError,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: () => getDepartments(),
  });

 

  // const uniqueDepartments = [...new Set(doctors.map(doctor => doctor.department))];
  // console.log(uniqueDepartments)
  // setDepartments(uniqueDepartments);

 
    // const filtered = doctors.filter(doctor => doctor.department === formData.department);
    // setFilteredDoctors(filtered);
  
    if (doctorsLoading || departmentsLoading) return <div>Loading...</div>;
    if (doctorsError || departmentsError) return <div>Error fetching data</div>;
    const doctors = doctorsData || [];
    const departments = departmentsData || [];
    const filteredDoctors = doctors.filter(
      (doctor) => doctor.department === formData.department
    );
   
  console.log(doctors,departments);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 px-4 lg:px-28 md:px-12 bg-headerGreen gap-6">
      <div className="pt-12 pb-24 lg:pb-1">
        <p className="text-headerText text-2xl lg:text-4xl font-sans font-medium leading-10 text-start">
          Make an appointment
          <br></br>
          with an Specialist
        </p>

        <p className="text-md font-normal font-sans text-black pt-24">
          Have Questions?
        </p>
        <div className="flex items-center mb-8">
          <img src={phone} className="mr-2 w-4 h-5" alt="" />
          <p className="text-md font-normal font-sans text-black">12345678</p>
        </div>
        <AppointmentButton />
      </div>

      <div className="rounded-lg" style={{ position: 'relative', bottom: '50px' }}>
        <div className="bg-buttoncolor text-center p-6 text-white text-sans text-3xl rounded-t-lg">Ask Us Anything</div>
        <form className="px-14 bg-white py-4 rounded-b-lg" onSubmit={handleSubmit}>
          <div className="mb-6" id="form">
            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-black">* Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="e.g. Sam Smith"
              className="border-[2px] border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">* Email</label>
            <input
              type="email"
              id="email"
              placeholder="e.g. sam_Smith@gmail.com"
              className="border-[2px] border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-black">* Mobile Number</label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="e.g. +880-1234567"
              className="border-[2px] border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-6">
          <label htmlFor="department" className="block mb-2 text-sm font-medium text-black">Select Department</label>
            <select
              id="department"
              className="border-[2px] border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5"
              value={formData.department}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select a department</option>
              {departments[0].departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
         
           <label htmlFor="doctor" className="block mb-2 text-sm font-medium text-black">* Select Doctor</label>
           <select
           
              type="text"
              id="doctor"
              className="border-[2px] border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5"
              value={formData.doctor}
              onChange={handleInputChange}
              required
              >
             
              <option value="" disabled>Select a doctor</option>
              {filteredDoctors.map((doctor) => (
                <option key={doctor.doctor_id} value={doctor.name}>
                  {doctor.name}
                </option>
              ))}
            </select>
          
          </div> 

          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-black">* Message</label>
            <input
              type="text"
              id="message"
              placeholder="Your message"
              className="border-[2px] border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>

          <SubmitButton onClick={handleSubmit} />

          <p className="text-black text-sm font-medium font-sans py-4">
            By clicking the button you agree to the Privacy Policy and Terms of Services
          </p>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
