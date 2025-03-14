const createError = require("../errorClass")

const appointmentSpecializations = [
    // Medical & Healthcare
    "General Physician",
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Orthopedic Surgeon",
    "Dentist",
    "Gynecologist",
    "Physiotherapist",
    "Ophthalmologist",
    "ENT Specialist",
    "Psychiatrist",
    "Nutritionist",
  
    // Business & Professional Services
    "Financial Advisor",
    "Legal Consultant",
    "Career Counselor",
    "Business Coach",
    "Marketing Consultant",
    "Real Estate Agent",
  
    // Beauty & Wellness
    "Hair Stylist",
    "Makeup Artist",
    "Spa & Massage Therapist",
    "Personal Trainer",
    "Yoga Instructor",
  
    // Home & Maintenance Services
    "Plumber",
    "Electrician",
    "Interior Designer",
    "Cleaning Services",
    "Pest Control Specialist"
  ];

function sanitizeTimings({timing, slots, name}){
    
    if (!timing || !slots || slots.length == 0){
        createError("invalid credentials", 400)
        return
    }

    if (!validateDates(timing)){
        createError("invalid date", 400)
        return
    }

    slots = slots.map(slot => {
        if (!validateDates(slot.starts)){
            createError("invalid slot date", 400)
            return
        }

        if (!checkForSamedate(timing, slot.starts)){
            createError("timing and slots are not in same date", 400)
            return
        }

        return {...slot, starts: new Date(slot.starts)}
    })

    return {timing: new Date(timing), slots, name}
}

function validateDates(date){
     date = new Date(date).getTime()

    if (Object.is(date, NaN)){
        
        return false
    }

    if (date < Date.now()){
        
        return false
    }

    return true
}

const checkForSamedate = (timing, slot) => {
    timing = new Date(timing)
    slot = new Date(slot)

    if ((timing.getUTCFullYear() != slot.getUTCFullYear()) || (timing.getUTCMonth() != slot.getUTCMonth()) || (timing.getUTCDate() != slot.getUTCDate())){
        return false
    }

    return true
}

function sanitizeSlotUsers({slots}){
    slots.forEach((slot) => {
        const {users, maxUsers} = slot
        if (users && maxUsers <= users){
            createError("slot user and maxUsers data invalid", 400)
            return
        }
        if (!maxUsers){
            createError("slot maxUsers data invalid", 400)
            return
        }
    })
}

function sanitizeNames({name}){
    if (!appointmentSpecializations.includes(name)){
        createError("appoinment name is not allowed", 400)
        return
    }
}

module.exports = {sanitizeTimings, sanitizeSlotUsers, sanitizeNames}