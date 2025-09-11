'use client';

type InterestItem = {
  id: string;
  label: string;
  child: React.ReactNode;
};



type InterestsProps = {
  allInterests: InterestItem[];
  activeInterests: string[];
  setActiveInterests: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Interests({
  allInterests,
  activeInterests,
  setActiveInterests,
}: InterestsProps) {
  const toggleInterest = (id: string) => {
    setActiveInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <h2 className="text-md mt-3 font-bold mb-2">اهتمامات العميل</h2>

      <div className="flex flex-wrap gap-3">
        {allInterests.map((interest) => (
          <button
            key={interest.id}
            type="button"
            onClick={() => toggleInterest(interest.id)}
            className={`px-3 py-2 rounded border ${
              activeInterests.includes(interest.id)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {interest.label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {allInterests.map(
          (interest) =>
            activeInterests.includes(interest.id) && (
              <div
                key={interest.id}
                className="p-2 border rounded bg-gray-50 shadow-sm"
              >
                {interest.child}
              </div>
            )
        )}
      </div>
    </div>
  );
}
