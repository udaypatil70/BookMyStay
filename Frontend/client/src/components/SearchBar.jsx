import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { cities } from "../assets/assets";

const LOCATIONS = [
  {
    country: "India",
    countryIcon: "🇮🇳",
    states: [
      {
        state: "Maharashtra",
        districts: ["Mumbai", "Pune", "Nagpur", "Thane", "Navi Mumbai", "Nashik", "Aurangabad", "Kolhapur", "Lonavala", "Alibaug"],
      },
      {
        state: "Delhi",
        districts: ["New Delhi", "Connaught Place", "Dwarka", "Karol Bagh", "Chanakyapuri", "Rohini", "Saket", "Lajpat Nagar"],
      },
      {
        state: "Karnataka",
        districts: ["Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Coorg", "Hampi", "Gokarna", "Udupi"],
      },
      {
        state: "Tamil Nadu",
        districts: ["Chennai", "Coimbatore", "Madurai", "Ooty", "Kodaikanal", "Tiruchirappalli", "Hosur", "Mahabalipuram"],
      },
      {
        state: "Rajasthan",
        districts: ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer", "Pushkar", "Ajmer", "Bikaner", "Mount Abu"],
      },
      {
        state: "Uttar Pradesh",
        districts: ["Lucknow", "Agra", "Varanasi", "Noida", "Greater Noida", "Allahabad", "Mathura", "Ghaziabad"],
      },
      {
        state: "West Bengal",
        districts: ["Kolkata", "Darjeeling", "Siliguri", "Digha", "Santiniketan", "Asansol", "Shantiniketan"],
      },
      {
        state: "Kerala",
        districts: ["Kochi", "Trivandrum", "Alleppey", "Munnar", "Kovalam", "Wayanad", "Kozhikode", "Thekkady"],
      },
      {
        state: "Goa",
        districts: ["North Goa", "South Goa", "Panaji", "Calangute", "Anjuna", "Colva", "Arambol", "Morjim"],
      },
      {
        state: "Gujarat",
        districts: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Jamnagar", "Kutch", "Dwarka"],
      },
      {
        state: "Madhya Pradesh",
        districts: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Khajuraho", "Orchha", "Sanchi"],
      },
      {
        state: "Punjab",
        districts: ["Amritsar", "Chandigarh", "Ludhiana", "Patiala", "Jalandhar", "Kapurthala", "Hoshiarpur"],
      },
      {
        state: "Haryana",
        districts: ["Gurugram", "Faridabad", "Panipat", "Karnal", "Hisar", "Sonipat", "Kurukshetra"],
      },
      {
        state: "Odisha",
        districts: ["Bhubaneswar", "Puri", "Konark", "Cuttack", "Rourkela", "Sambalpur", "Chilika"],
      },
      {
        state: "Assam",
        districts: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Tezpur", "Kaziranga"],
      },
      {
        state: "Jammu & Kashmir",
        districts: ["Srinagar", "Gulmarg", "Pahalgam", "Sonmarg", "Leh", "Jammu", "Patnitop", "Vaishno Devi"],
      },
      {
        state: "Uttarakhand",
        districts: ["Dehradun", "Mussoorie", "Nainital", "Rishikesh", "Haridwar", "Jim Corbett", "Auli", "Lansdowne"],
      },
      {
        state: "Himachal Pradesh",
        districts: ["Shimla", "Manali", "Dharamshala", "Kasol", "Dalhousie", "Kullu", "Spiti", "Bir Billing"],
      },
      {
        state: "Sikkim",
        districts: ["Gangtok", "Pelling", "Lachung", "Namchi", "Ravangla", "Zuluk"],
      },
      {
        state: "Andhra Pradesh",
        districts: ["Visakhapatnam", "Vijayawada", "Tirupati", "Amaravati", "Araku Valley", "Lepakshi"],
      },
      {
        state: "Telangana",
        districts: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramoji Film City", "Hussain Sagar"],
      },
      {
        state: "Bihar",
        districts: ["Patna", "Gaya", "Bodh Gaya", "Nalanda", "Rajgir", "Vaishali"],
      },
      {
        state: "Chhattisgarh",
        districts: ["Raipur", "Bilaspur", "Jagdalpur", "Chitrakote Falls", "Sirpur"],
      },
      {
        state: "Jharkhand",
        districts: ["Ranchi", "Jamshedpur", "Dhanbad", "Netarhat", "Hundru Falls"],
      },
      {
        state: "Chandigarh",
        districts: ["Chandigarh", "Mohali", "Panchkula"],
      },
      {
        state: "Puducherry",
        districts: ["Pondicherry", "Karaikal", "Mahe", "Yanam"],
      },
      {
        state: "Ladakh",
        districts: ["Leh", "Nubra Valley", "Pangong Lake", "Zanskar", "Kargil"],
      },
      {
        state: "Meghalaya",
        districts: ["Shillong", "Cherrapunji", "Mawlynnong", "Dawki", "Tura"],
      },
      {
        state: "Manipur",
        districts: ["Imphal", "Loktak Lake", "Ukhrul", "Churachandpur"],
      },
      {
        state: "Mizoram",
        districts: ["Aizawl", "Champhai", "Reiek", "Thenzawl"],
      },
      {
        state: "Nagaland",
        districts: ["Kohima", "Dimapur", "Mokokchung", "Mon"],
      },
      {
        state: "Tripura",
        districts: ["Agartala", "Udaipur", "Dharmanagar", "Ambassa"],
      },
      {
        state: "Arunachal Pradesh",
        districts: ["Itanagar", "Tawang", "Ziro", "Bomdila", "Pasighat"],
      },
    ],
  },
  {
    country: "United Arab Emirates",
    countryIcon: "🇦🇪",
    states: [
      {
        state: "Dubai",
        districts: ["Dubai Marina", "Downtown Dubai", "Palm Jumeirah", "Jumeirah Beach", "Deira", "Bur Dubai", "Business Bay", "JBR"],
      },
      {
        state: "Abu Dhabi",
        districts: ["Corniche", "Saadiyat Island", "Yas Island", "Al Maryah Island"],
      },
    ],
  },
  {
    country: "Singapore",
    countryIcon: "🇸🇬",
    states: [
      {
        state: "Central Region",
        districts: ["Marina Bay", "Orchard", "Sentosa", "Clarke Quay", "Chinatown", "Bugis"],
      },
      {
        state: "East Region",
        districts: ["Changi", "Tampines", "Pasir Ris"],
      },
    ],
  },
  {
    country: "United States",
    countryIcon: "🇺🇸",
    states: [
      {
        state: "New York",
        districts: ["Manhattan", "Brooklyn", "Queens", "Times Square", "SoHo", "Midtown"],
      },
      {
        state: "California",
        districts: ["Los Angeles", "San Francisco", "San Diego", "Malibu"],
      },
    ],
  },
  {
    country: "United Kingdom",
    countryIcon: "🇬🇧",
    states: [
      {
        state: "England",
        districts: ["London - Westminster", "London - Camden", "London - Kensington", "London - Shoreditch", "Manchester", "Birmingham"],
      },
      {
        state: "Scotland",
        districts: ["Edinburgh", "Glasgow"],
      },
    ],
  },
];

const DESTINATIONS = [
  { name: "Nearby", subtitle: "Find what's around you", icon: "📍" },
  ...cities.map((city) => ({
    name: city,
    subtitle: `Explore hotels in ${city}`,
    icon: city === "Dubai" ? "🏙️" : city === "Singapore" ? "🇸🇬" : city === "New York" ? "🗽" : "🇬🇧",
  })),
];

const FLEXIBLE_OPTIONS = ["Exact dates", "± 1 day", "± 2 days", "± 3 days", "± 7 days", "± 14 days"];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
};

// ─── Calendar Grid ────────────────────────────────────────────────────────────
const CalendarMonth = ({ year, month, startDate, endDate, onDateClick, hoverDate }) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isDisabled = (day) => {
    if (!day) return true;
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };

  const isInRange = (day) => {
    if (!day || !startDate || !endDate) return false;
    const d = new Date(year, month, day).getTime();
    const s = new Date(startDate).getTime();
    const e = new Date(endDate).getTime();
    return d > s && d < e;
  };

  const isHoverRange = (day) => {
    if (!day || !startDate || endDate || !hoverDate) return false;
    const d = new Date(year, month, day).getTime();
    const s = new Date(startDate).getTime();
    const h = new Date(hoverDate).getTime();
    if (h > s) return d > s && d < h;
    return d < s && d > h;
  };

  const isStart = (day) => {
    if (!day || !startDate) return false;
    const d = new Date(year, month, day);
    const s = new Date(startDate);
    return d.getFullYear() === s.getFullYear() && d.getMonth() === s.getMonth() && d.getDate() === s.getDate();
  };

  const isEnd = (day) => {
    if (!day || !endDate) return false;
    const d = new Date(year, month, day);
    const e = new Date(endDate);
    return d.getFullYear() === e.getFullYear() && d.getMonth() === e.getMonth() && d.getDate() === e.getDate();
  };

  return (
    <div className="min-w-[280px]">
      <p className="text-center font-semibold text-gray-900 mb-3">{MONTHS[month]} {year}</p>
      <div className="grid grid-cols-7 gap-0">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-center text-xs font-medium text-gray-400 py-2">{w}</div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;
          const disabled = isDisabled(day);
          const start = isStart(day);
          const end = isEnd(day);
          const inRange = isInRange(day) || isHoverRange(day);
          return (
            <div key={i} className={`flex items-center justify-center ${inRange && !start && !end ? "bg-sky-50" : ""} ${start ? "rounded-l-full" : ""} ${end ? "rounded-r-full" : ""}`}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onDateClick(new Date(year, month, day))}
                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm transition-all duration-150 ${
                  disabled
                    ? "text-gray-300 cursor-not-allowed"
                    : start || end
                    ? "bg-gray-900 text-white font-semibold hover:bg-gray-800"
                    : inRange
                    ? "text-gray-900 hover:bg-gray-200"
                    : "text-gray-700 hover:bg-gray-100 font-medium"
                }`}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Where Dropdown ───────────────────────────────────────────────────────────
const WhereDropdown = ({ value, onSelect, onClose }) => {
  const [query, setQuery] = useState(value || "");
  const [step, setStep] = useState("countries"); // countries | states | districts
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  const filteredCountries = LOCATIONS.filter((c) =>
    c.country.toLowerCase().includes(query.toLowerCase())
  );

  const filteredStates = selectedCountry
    ? selectedCountry.states.filter((s) =>
        s.state.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredDistricts =
    selectedCountry && selectedState
      ? selectedState.districts.filter((d) =>
          d.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSelectedState(null);
    setQuery("");
    setStep("states");
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setQuery("");
    setStep("districts");
  };

  const handleDistrictSelect = (district) => {
    onSelect(`${district}, ${selectedState.state}`);
    onClose();
  };

  const handleBack = () => {
    if (step === "districts") {
      setSelectedState(null);
      setQuery("");
      setStep("states");
    } else if (step === "states") {
      setSelectedCountry(null);
      setQuery("");
      setStep("countries");
    }
  };

  const breadcrumbs = [];
  if (selectedCountry) breadcrumbs.push({ label: selectedCountry.country, icon: selectedCountry.countryIcon });
  if (selectedState) breadcrumbs.push({ label: selectedState.state });

  return (
    <div className="w-full min-w-[380px] max-w-[420px]">
      {/* Search Input */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              step === "countries"
                ? "Search countries..."
                : step === "states"
                ? "Search states..."
                : "Search districts..."
            }
            className="w-full text-sm outline-none pl-6 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="flex items-center gap-1.5 px-4 pt-3 pb-1 text-xs text-gray-500">
          <button
            onClick={() => { setSelectedCountry(null); setSelectedState(null); setQuery(""); setStep("countries"); }}
            className="hover:text-gray-900 transition-colors"
          >
            All
          </button>
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span>/</span>
              <button
                onClick={() => {
                  if (i === 0) { setSelectedState(null); setQuery(""); setStep("states"); }
                }}
                className={`flex items-center gap-1 ${i === breadcrumbs.length - 1 ? "text-gray-900 font-semibold" : "hover:text-gray-900 transition-colors"}`}
              >
                {b.icon && <span>{b.icon}</span>}
                {b.label}
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Back button */}
      {step !== "countries" && (
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      )}

      {/* List */}
      <div className="p-2 max-h-[320px] overflow-y-auto">
        {/* Countries */}
        {step === "countries" && (
          <>
            <p className="text-xs font-semibold text-gray-400 px-3 py-2 uppercase tracking-wider">Countries</p>
            {filteredCountries.map((country) => (
              <button
                key={country.country}
                onClick={() => handleCountrySelect(country)}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-150 text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-xl shrink-0">
                    {country.countryIcon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{country.country}</p>
                    <p className="text-xs text-gray-500">{country.states.length} region{country.states.length > 1 ? "s" : ""}</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
            {filteredCountries.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">No countries found</p>
            )}
          </>
        )}

        {/* States */}
        {step === "states" && selectedCountry && (
          <>
            <p className="text-xs font-semibold text-gray-400 px-3 py-2 uppercase tracking-wider">States & Regions</p>
            {filteredStates.map((state) => (
              <button
                key={state.state}
                onClick={() => handleStateSelect(state)}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-150 text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{state.state}</p>
                    <p className="text-xs text-gray-500">{state.districts.length} district{state.districts.length > 1 ? "s" : ""}</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
            {filteredStates.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">No regions found</p>
            )}
          </>
        )}

        {/* Districts */}
        {step === "districts" && selectedState && (
          <>
            <p className="text-xs font-semibold text-gray-400 px-3 py-2 uppercase tracking-wider">Districts & Cities</p>
            {filteredDistricts.map((district) => (
              <button
                key={district}
                onClick={() => handleDistrictSelect(district)}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-150 text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{district}</p>
                    <p className="text-xs text-gray-500">Hotels available</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            ))}
            {filteredDistricts.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">No districts found</p>
            )}
          </>
        )}
      </div>

      {/* Quick Select: Nearby */}
      {step === "countries" && !query && (
        <div className="border-t border-gray-200 p-2">
          <button
            onClick={() => { onSelect("Nearby"); onClose(); }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-150 text-left"
          >
            <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-xl shrink-0">
              📍
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Nearby</p>
              <p className="text-xs text-gray-500">Find what's around you</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

// ─── When Dropdown ────────────────────────────────────────────────────────────
const WhenDropdown = ({ checkIn, checkOut, flexible, onCheckInChange, onCheckOutChange, onFlexibleChange }) => {
  const [tab, setTab] = useState("Dates");
  const [month1, setMonth1] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [hoverDate, setHoverDate] = useState(null);

  const month2 = (() => {
    let m = month1.month + 1;
    let y = month1.year;
    if (m > 11) { m = 0; y++; }
    return { year: y, month: m };
  })();

  const handleDateClick = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    if (!checkIn || (checkIn && checkOut)) {
      onCheckInChange(dateStr);
      onCheckOutChange(null);
    } else {
      const start = new Date(checkIn);
      if (date < start) {
        onCheckInChange(dateStr);
        onCheckOutChange(null);
      } else {
        onCheckOutChange(dateStr);
      }
    }
  };

  const nextMonth = () => {
    setMonth1((prev) => {
      let m = prev.month + 1;
      let y = prev.year;
      if (m > 11) { m = 0; y++; }
      return { year: y, month: m };
    });
  };

  const prevMonth = () => {
    setMonth1((prev) => {
      let m = prev.month - 1;
      let y = prev.year;
      if (m < 0) { m = 11; y--; }
      return { year: y, month: m };
    });
  };

  const totalNights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="w-full min-w-[580px]">
      {/* Tabs */}
      <div className="flex justify-center pt-4 pb-2">
        <div className="flex bg-gray-100 rounded-full p-1">
          {["Dates", "Flexible"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                tab === t ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "Dates" ? (
        <div className="p-4">
          {/* Selected dates display */}
          {(checkIn || checkOut) && (
            <div className="flex items-center justify-center gap-2 mb-4 text-sm text-gray-600">
              {checkIn && <span className="font-medium text-gray-900">{formatDate(checkIn)}</span>}
              {checkIn && checkOut && <span>→</span>}
              {checkOut && <span className="font-medium text-gray-900">{formatDate(checkOut)}</span>}
              {totalNights > 0 && <span className="text-gray-400">· {totalNights} night{totalNights > 1 ? "s" : ""}</span>}
            </div>
          )}

          {/* Calendars */}
          <div className="flex gap-6 justify-center">
            <div onMouseLeave={() => setHoverDate(null)}>
              <CalendarMonth
                year={month1.year} month={month1.month}
                startDate={checkIn} endDate={checkOut} hoverDate={hoverDate}
                onDateClick={handleDateClick}
              />
            </div>
            <div onMouseLeave={() => setHoverDate(null)}>
              <CalendarMonth
                year={month2.year} month={month2.month}
                startDate={checkIn} endDate={checkOut} hoverDate={hoverDate}
                onDateClick={handleDateClick}
              />
            </div>
          </div>

          {/* Nav arrows */}
          <div className="flex justify-between px-2 mt-2">
            <button onClick={prevMonth} className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextMonth} className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* Flexible date range */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2 text-center">Flexible dates</p>
            <div className="flex flex-wrap justify-center gap-2">
              {FLEXIBLE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => onFlexibleChange(opt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                    flexible === opt
                      ? "bg-gray-900 text-white border-gray-900"
                      : "border-gray-300 text-gray-600 hover:border-gray-500"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Flexible Tab */
        <div className="p-6 text-center">
          <p className="text-sm text-gray-500 mb-4">Choose how flexible your dates are</p>
          <div className="flex flex-wrap justify-center gap-2">
            {FLEXIBLE_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => onFlexibleChange(opt)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  flexible === opt
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-300 text-gray-600 hover:border-gray-500"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Who Dropdown ─────────────────────────────────────────────────────────────
const GUEST_TYPES = [
  { key: "adults", label: "Adults", sub: "Ages 13 or above" },
  { key: "children", label: "Children", sub: "Ages 2–12" },
  { key: "infants", label: "Infants", sub: "Under 2" },
  { key: "pets", label: "Pets", sub: "Bringing a service animal?", isPet: true },
];

const WhoDropdown = ({ guests, onChange }) => {
  const update = (key, delta) => {
    const newVal = guests[key] + delta;
    if (newVal < 0) return;
    if (key === "adults" && newVal === 0 && (guests.children > 0 || guests.infants > 0)) return;
    if (newVal > 16) return;
    onChange({ ...guests, [key]: newVal });
  };

  return (
    <div className="w-full min-w-[320px] max-w-[400px] p-4">
      {GUEST_TYPES.map(({ key, label, sub, isPet }) => (
        <div key={key} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
          <div>
            <p className="text-sm font-semibold text-gray-900">{label}</p>
            <p className={`text-xs text-gray-500 ${isPet ? "underline cursor-pointer hover:text-gray-700" : ""}`}>
              {sub}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => update(key, -1)}
              disabled={guests[key] === 0 || (key === "adults" && guests[key] === 1 && (guests.children > 0 || guests.infants > 0))}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              –
            </button>
            <span className="w-6 text-center text-sm font-medium text-gray-900">{guests[key]}</span>
            <button
              type="button"
              onClick={() => update(key, 1)}
              disabled={guests[key] >= 16}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Main SearchBar ───────────────────────────────────────────────────────────
const SearchBar = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [flexible, setFlexible] = useState(null);
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileStep, setMobileStep] = useState(0);

  const barRef = useRef(null);
  const dropdownRef = useRef(null);

  const totalGuests = guests.adults + guests.children;

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const handleClickOutside = useCallback((e) => {
    if (
      barRef.current && !barRef.current.contains(e.target) &&
      dropdownRef.current && !dropdownRef.current.contains(e.target)
    ) {
      setActiveSection(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (totalGuests > 0) params.set("guests", totalGuests.toString());
    navigate(`/rooms?${params.toString()}`);
    setActiveSection(null);
    scrollTo(0, 0);
  };

  const handleMobileSearch = () => {
    handleSearch();
    setMobileOpen(false);
    setMobileStep(0);
  };

  const displayDestination = destination || "Search destinations";
  const displayDates = checkIn && checkOut
    ? `${formatDate(checkIn)} – ${formatDate(checkOut)}`
    : checkIn
    ? `${formatDate(checkIn)} – ?`
    : "Add dates";
  const displayGuests = totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}` : "Add guests";

  // ─── Mobile Sheet ─────────────────────────────────────────────────────────
  if (mobileOpen) {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex flex-col md:hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <button onClick={() => { setMobileOpen(false); setMobileStep(0); }} className="text-sm font-medium text-gray-600">Cancel</button>
          <p className="text-sm font-semibold text-gray-900">Search</p>
          <div className="w-12" />
        </div>
        <div className="flex gap-2 px-6 py-3">
          {[0, 1, 2].map((s) => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${s <= mobileStep ? "bg-gray-900" : "bg-gray-200"}`} />
          ))}
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {mobileStep === 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Where to?</h2>
              <WhereDropdown value={destination} onSelect={setDestination} onClose={() => {}} />
            </div>
          )}
          {mobileStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">When?</h2>
              <div className="overflow-x-auto">
                <WhenDropdown
                  checkIn={checkIn} checkOut={checkOut} flexible={flexible}
                  onCheckInChange={setCheckIn} onCheckOutChange={setCheckOut} onFlexibleChange={setFlexible}
                />
              </div>
            </div>
          )}
          {mobileStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Who's coming?</h2>
              <WhoDropdown guests={guests} onChange={setGuests} />
            </div>
          )}
        </div>
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <span className="font-medium text-gray-900">{destination || "Anywhere"}</span>
            {(checkIn || checkOut) && <span> · {displayDates}</span>}
            {totalGuests > 0 && <span> · {displayGuests}</span>}
          </div>
          <div className="flex gap-2">
            {mobileStep > 0 && (
              <button onClick={() => setMobileStep((s) => s - 1)} className="px-4 py-2 rounded-full text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100">Back</button>
            )}
            {mobileStep < 2 ? (
              <button onClick={() => setMobileStep((s) => s + 1)} className="px-5 py-2 rounded-full text-sm font-medium bg-gray-900 text-white hover:bg-gray-800">Next</button>
            ) : (
              <button onClick={handleMobileSearch} className="px-5 py-2 rounded-full text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: "#E31C5F" }}>Search</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── Desktop: Standalone row below navbar ─────────────────────────────────
  return (
    <>
      {/* Desktop pill bar */}
      <div className="hidden md:flex justify-center px-4 relative z-40">
        <div ref={barRef} className="flex items-center shadow-md border border-gray-200 rounded-full transition-all duration-300 hover:shadow-lg bg-[#EBEBEB]">
          {/* Where */}
          <button
            onClick={() => toggleSection("where")}
            className={`flex flex-col items-start px-5 py-2.5 rounded-full transition-all duration-200 min-w-[140px] ${
              activeSection === "where" ? "bg-white shadow-md" : "hover:bg-white/60"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-900">Where</span>
            <span className={`text-sm ${destination ? "text-gray-900 font-medium" : "text-gray-500"}`}>
              {displayDestination.length > 18 ? displayDestination.slice(0, 18) + "…" : displayDestination}
            </span>
          </button>

          <div className="w-px h-8 bg-gray-300" />

          {/* When */}
          <button
            onClick={() => toggleSection("when")}
            className={`flex flex-col items-start px-5 py-2.5 rounded-full transition-all duration-200 min-w-[120px] ${
              activeSection === "when" ? "bg-white shadow-md" : "hover:bg-white/60"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-900">When</span>
            <span className={`text-sm ${(checkIn || checkOut) ? "text-gray-900 font-medium" : "text-gray-500"}`}>
              {displayDates.length > 18 ? displayDates.slice(0, 18) + "…" : displayDates}
            </span>
          </button>

          <div className="w-px h-8 bg-gray-300" />

          {/* Who */}
          <button
            onClick={() => toggleSection("who")}
            className={`flex flex-col items-start px-5 py-2.5 rounded-full transition-all duration-200 min-w-[120px] ${
              activeSection === "who" ? "bg-white shadow-md" : "hover:bg-white/60"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-900">Who</span>
            <span className={`text-sm ${totalGuests > 0 ? "text-gray-900 font-medium" : "text-gray-500"}`}>
              {displayGuests}
            </span>
          </button>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 text-white px-5 py-3 rounded-full transition-all duration-200 hover:opacity-90 hover:shadow-lg mr-1 shrink-0"
            style={{ backgroundColor: "#E31C5F" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm font-semibold">Search</span>
          </button>
        </div>

        {/* Desktop Dropdown */}
        {activeSection && (
          <div
            ref={dropdownRef}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 bg-white rounded-3xl shadow-2xl border border-gray-200 z-50 animate-fade-in-up"
          >
            {activeSection === "where" && (
              <WhereDropdown value={destination} onSelect={setDestination} onClose={() => setActiveSection(null)} />
            )}
            {activeSection === "when" && (
              <WhenDropdown
                checkIn={checkIn} checkOut={checkOut} flexible={flexible}
                onCheckInChange={setCheckIn} onCheckOutChange={setCheckOut} onFlexibleChange={setFlexible}
              />
            )}
            {activeSection === "who" && (
              <WhoDropdown guests={guests} onChange={setGuests} />
            )}
          </div>
        )}
      </div>

      {/* Mobile: Trigger bar (opens step-by-step sheet) */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed bottom-6 left-4 right-4 z-50 flex items-center justify-between bg-white rounded-full shadow-2xl border border-gray-200 px-4 py-3"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="text-left min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{destination || "Anywhere"}</p>
            <p className="text-xs text-gray-500 truncate">
              {(checkIn || checkOut) ? displayDates : "Any week"} · {displayGuests}
            </p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full text-white flex items-center justify-center shrink-0 ml-2" style={{ backgroundColor: "#E31C5F" }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </button>
    </>
  );
};

export default SearchBar;
