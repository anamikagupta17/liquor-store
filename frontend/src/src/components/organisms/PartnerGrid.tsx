import { Partner } from '../../types';
import { PartnerCard, PartnerCardSkeleton } from '../cards/PartnerCard';

export interface PartnerGridProps {
  partners: Partner[];
  loading?: boolean;
  onPartnerClick?: (id: string) => void;
  columns?: 1 | 2 | 3 | 4;
}

export function PartnerGrid({
  partners,
  loading = false,
  onPartnerClick,
  columns = 2,
}: PartnerGridProps) {
  
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  // Show Skeleton during loading
  if (loading) {
    return (
      <div className={`grid ${gridClasses[columns]} gap-[24px] w-full`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <PartnerCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // No partners
  if (!partners || partners.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-[#636363] text-[17px] mb-2">No partners found</div>
        <p className="text-[#7d7d7d] text-[14px]">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridClasses[columns]} gap-[24px] w-full`}>
      {partners.map((partner) => (
        <PartnerCard
          key={partner.id}
          partner={partner}
          onClick={() => onPartnerClick?.(partner.id)}
          size="md"
          density="comfortable"
        />
      ))}
    </div>
  );
}
