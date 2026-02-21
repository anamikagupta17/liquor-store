import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PartnerCard } from './PartnerCard';
import { Partner } from '../../types';

describe('PartnerCard', () => {
  const mockPartner: Partner = {
    id: 'test-001',
    name: 'Test Partner Inc',
    hurdle: '125%',
    split: '75%-50%',
    advanceRate: '7%',
    createdAt: '2024-01-15T10:30:00Z',
    status: 'active',
  };

  it('renders partner information correctly', () => {
    render(<PartnerCard partner={mockPartner} />);

    expect(screen.getByText('Test Partner Inc')).toBeInTheDocument();
    expect(screen.getByText('125%')).toBeInTheDocument();
    expect(screen.getByText('75%-50%')).toBeInTheDocument();
    expect(screen.getByText('7%')).toBeInTheDocument();
  });

  it('displays all three metric labels', () => {
    render(<PartnerCard partner={mockPartner} />);

    expect(screen.getByText('Hurdle')).toBeInTheDocument();
    expect(screen.getByText('Split')).toBeInTheDocument();
    expect(screen.getByText('Advance Rate')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<PartnerCard partner={mockPartner} onClick={handleClick} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(handleClick).toHaveBeenCalledWith('test-001');
  });

  it('handles keyboard navigation (Enter key)', () => {
    const handleClick = vi.fn();
    render(<PartnerCard partner={mockPartner} onClick={handleClick} />);

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });

    expect(handleClick).toHaveBeenCalledWith('test-001');
  });

  it('handles keyboard navigation (Space key)', () => {
    const handleClick = vi.fn();
    render(<PartnerCard partner={mockPartner} onClick={handleClick} />);

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: ' ' });

    expect(handleClick).toHaveBeenCalledWith('test-001');
  });

  it('applies disabled state correctly', () => {
    render(<PartnerCard partner={mockPartner} state="disabled" />);

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabindex', '-1');
    expect(card).toHaveClass('pointer-events-none');
  });

  it('applies selected state correctly', () => {
    render(<PartnerCard partner={mockPartner} state="selected" />);

    const card = screen.getByRole('button');
    expect(card).toHaveClass('ring-2', 'ring-[#6e55fb]');
  });

  it('applies compact density correctly', () => {
    const { container } = render(<PartnerCard partner={mockPartner} density="compact" />);

    const contentDiv = container.querySelector('[class*="p-[16px]"]');
    expect(contentDiv).toBeInTheDocument();
  });

  it('has accessible label', () => {
    render(<PartnerCard partner={mockPartner} />);

    expect(screen.getByLabelText('Partner card for Test Partner Inc')).toBeInTheDocument();
  });
});
