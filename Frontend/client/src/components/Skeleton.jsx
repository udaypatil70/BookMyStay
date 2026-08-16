export const HotelCardSkeleton = () => (
  <div className="max-w-70 w-full rounded-xl overflow-hidden bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.05)]">
    <div className="skeleton h-48 w-full" />
    <div className="p-4 pt-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="skeleton h-5 w-32" />
        <div className="skeleton h-4 w-10" />
      </div>
      <div className="skeleton h-4 w-48" />
      <div className="flex items-center justify-between mt-4">
        <div className="skeleton h-5 w-20" />
        <div className="skeleton h-8 w-24 rounded" />
      </div>
    </div>
  </div>
);

export const RoomListSkeleton = () => (
  <div className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300">
    <div className="skeleton h-65 md:w-1/2 rounded-xl" />
    <div className="md:w-1/2 flex flex-col gap-3">
      <div className="skeleton h-4 w-24" />
      <div className="skeleton h-8 w-48" />
      <div className="skeleton h-4 w-32" />
      <div className="skeleton h-4 w-64" />
      <div className="flex gap-3 mt-3">
        <div className="skeleton h-8 w-24 rounded-lg" />
        <div className="skeleton h-8 w-24 rounded-lg" />
        <div className="skeleton h-8 w-24 rounded-lg" />
      </div>
      <div className="skeleton h-6 w-28 mt-4" />
    </div>
  </div>
);

export const BookingCardSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr_1fr] w-full border-b border-gray-300 py-6 first:border-t">
    <div className="flex flex-col md:flex-row">
      <div className="skeleton min-md:w-44 h-32 rounded" />
      <div className="flex flex-col gap-2 max-md:mt-3 min-md:ml-4">
        <div className="skeleton h-6 w-40" />
        <div className="skeleton h-4 w-32" />
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-4 w-20" />
      </div>
    </div>
    <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
      <div>
        <div className="skeleton h-4 w-16 mb-1" />
        <div className="skeleton h-3 w-28" />
      </div>
      <div>
        <div className="skeleton h-4 w-16 mb-1" />
        <div className="skeleton h-3 w-28" />
      </div>
    </div>
    <div className="flex flex-col items-start justify-center pt-3">
      <div className="skeleton h-6 w-20 rounded-full" />
    </div>
    <div className="flex flex-col items-start justify-center pt-3 gap-2">
      <div className="skeleton h-7 w-20 rounded-full" />
    </div>
  </div>
);

export const RoomDetailSkeleton = () => (
  <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
    <div className="flex items-center gap-2">
      <div className="skeleton h-10 w-64" />
      <div className="skeleton h-6 w-16 rounded-full" />
    </div>
    <div className="skeleton h-4 w-32 mt-2" />
    <div className="skeleton h-4 w-48 mt-2" />
    <div className="flex flex-col lg:flex-row mt-6 gap-6">
      <div className="lg:w-1/2 w-full">
        <div className="skeleton h-96 w-full rounded-xl" />
      </div>
      <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton h-44 rounded-xl" />
        ))}
      </div>
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton h-32 rounded-2xl" />
      ))}
    </div>
    <div className="skeleton h-64 rounded-2xl" />
  </div>
);
