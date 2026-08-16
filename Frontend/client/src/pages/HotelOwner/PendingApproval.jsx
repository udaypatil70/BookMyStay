import { useAppContext } from "../../context/AppContext";

const PendingApproval = () => {
  const { hotelStatus, setShowHotelReg } = useAppContext();

  const isRejected = hotelStatus === "rejected";
  const isPending = hotelStatus === "pending";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {isPending ? (
          <>
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 mb-2">
              Registration Under Review
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Your hotel registration has been submitted and is currently being reviewed by our admin team.
              We will notify you once a decision has been made. This usually takes 24-48 hours.
            </p>
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Pending Approval
            </div>
          </>
        ) : isRejected ? (
          <>
            <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 mb-2">
              Registration Not Approved
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Unfortunately, your hotel registration was not approved at this time.
              Please review the feedback below and re-submit with the necessary changes.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-left">
              <p className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">Reason</p>
              <p className="text-sm text-red-600">{hotelStatus === "rejected" ? "Please see the rejection reason in your email." : "Your submission did not meet our requirements."}</p>
            </div>
            <button
              onClick={() => setShowHotelReg(true)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all"
            >
              Re-register Hotel
            </button>
          </>
        ) : (
          <>
            <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 mb-2">
              Register Your Hotel
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Start your journey as a hotel partner on BookMyStay. Register your property and get access to our booking platform.
            </p>
            <button
              onClick={() => setShowHotelReg(true)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all"
            >
              Register Hotel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PendingApproval;
