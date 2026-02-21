import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { EligibilityPurchase } from './EligibilityPurchase';
import * as usePartnersModule from '../hooks/usePartners';

// Mock the hooks
vi.mock('../hooks/usePartners');
vi.mock('../hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}));

describe('EligibilityPurchase', () => {
  const mockPartners = [
    {
      id: 'partner-001',
      name: 'Cordoba Law Group',
      hurdle: '125%',
      split: '75%-50%',
      advanceRate: '7%',
      createdAt: '2024-01-15T10:30:00Z',
      status: 'active' as const,
    },
    {
      id: 'partner-002',
      name: 'Veridian Credit',
      hurdle: '110%',
      split: '60%-40%',
      advanceRate: '5%',
      createdAt: '2024-02-03T14:22:00Z',
      status: 'active' as const,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    vi.mocked(usePartnersModule.usePartners).mockReturnValue({
      partners: [],
      loading: true,
      error: null,
      refetch: vi.fn(),
      createPartner: vi.fn(),
      updatePartner: vi.fn(),
      deletePartner: vi.fn(),
    });

    render(<EligibilityPurchase />);

    // Skeleton loaders should be present
    expect(screen.queryByText('Cordoba Law Group')).not.toBeInTheDocument();
  });

  it('renders partners list when loaded', async () => {
    vi.mocked(usePartnersModule.usePartners).mockReturnValue({
      partners: mockPartners,
      loading: false,
      error: null,
      refetch: vi.fn(),
      createPartner: vi.fn(),
      updatePartner: vi.fn(),
      deletePartner: vi.fn(),
    });

    render(<EligibilityPurchase />);

    await waitFor(() => {
      expect(screen.getByText('Cordoba Law Group')).toBeInTheDocument();
      expect(screen.getByText('Veridian Credit')).toBeInTheDocument();
    });
  });

  it('displays correct partner count', async () => {
    vi.mocked(usePartnersModule.usePartners).mockReturnValue({
      partners: mockPartners,
      loading: false,
      error: null,
      refetch: vi.fn(),
      createPartner: vi.fn(),
      updatePartner: vi.fn(),
      deletePartner: vi.fn(),
    });

    render(<EligibilityPurchase />);

    await waitFor(() => {
      expect(screen.getByText('2 Partners')).toBeInTheDocument();
    });
  });

  it('renders error state', () => {
    vi.mocked(usePartnersModule.usePartners).mockReturnValue({
      partners: [],
      loading: false,
      error: 'Failed to fetch partners',
      refetch: vi.fn(),
      createPartner: vi.fn(),
      updatePartner: vi.fn(),
      deletePartner: vi.fn(),
    });

    render(<EligibilityPurchase />);

    expect(screen.getByText('Error loading partners')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch partners')).toBeInTheDocument();
  });

  it('filters partners based on search value', async () => {
    vi.mocked(usePartnersModule.usePartners).mockReturnValue({
      partners: mockPartners,
      loading: false,
      error: null,
      refetch: vi.fn(),
      createPartner: vi.fn(),
      updatePartner: vi.fn(),
      deletePartner: vi.fn(),
    });

    render(<EligibilityPurchase searchValue="Cordoba" />);

    await waitFor(() => {
      expect(screen.getByText('Cordoba Law Group')).toBeInTheDocument();
      expect(screen.queryByText('Veridian Credit')).not.toBeInTheDocument();
      expect(screen.getByText('1 Partners')).toBeInTheDocument();
    });
  });

  it('shows "New Partner" button', async () => {
    vi.mocked(usePartnersModule.usePartners).mockReturnValue({
      partners: mockPartners,
      loading: false,
      error: null,
      refetch: vi.fn(),
      createPartner: vi.fn(),
      updatePartner: vi.fn(),
      deletePartner: vi.fn(),
    });

    render(<EligibilityPurchase />);

    await waitFor(() => {
      expect(screen.getByText('New Partner')).toBeInTheDocument();
    });
  });

  it('renders breadcrumb with correct label', async () => {
    vi.mocked(usePartnersModule.usePartners).mockReturnValue({
      partners: mockPartners,
      loading: false,
      error: null,
      refetch: vi.fn(),
      createPartner: vi.fn(),
      updatePartner: vi.fn(),
      deletePartner: vi.fn(),
    });

    render(<EligibilityPurchase />);

    await waitFor(() => {
      expect(screen.getByText('Eligibility Purchase')).toBeInTheDocument();
    });
  });

  it('shows empty state when no partners match search', async () => {
    vi.mocked(usePartnersModule.usePartners).mockReturnValue({
      partners: mockPartners,
      loading: false,
      error: null,
      refetch: vi.fn(),
      createPartner: vi.fn(),
      updatePartner: vi.fn(),
      deletePartner: vi.fn(),
    });

    render(<EligibilityPurchase searchValue="NonexistentPartner" />);

    await waitFor(() => {
      expect(screen.getByText('No partners found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your search or filters')).toBeInTheDocument();
    });
  });
});
