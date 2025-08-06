import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfitCalculator from './ProfitCalculator';

// styles prop'u için sahte (mock) bir nesne
const mockStyles = {
  card: {},
  cardTitle: {},
  label: {},
  input: {},
  resultContainer: {},
  resultLabel: {},
  resultValue: {},
  highlightedResult: {},
  highlightedResultLabel: {},
  highlightedResultValue: {},
};

describe('ProfitCalculator', () => {
  test('renders correctly and performs a calculation', async () => {
    const user = userEvent.setup();
    render(<ProfitCalculator styles={mockStyles} />);

    // 1. Bileşenin doğru şekilde render edildiğini kontrol et
    expect(screen.getByText('Kâr/Zarar Hesaplama')).toBeInTheDocument();

    // 2. Girdi alanlarını bul ve doldur
    const alisFiyatiInput = screen.getByPlaceholderText('Örn: 100');
    const satisFiyatiInput = screen.getByPlaceholderText('Örn: 150');
    const kdvOraniInput = screen.getByPlaceholderText('Örn: 20');
    const adetInput = screen.getByPlaceholderText('Örn: 1');

    await user.type(alisFiyatiInput, '100');
    await user.type(satisFiyatiInput, '150');
    await user.type(kdvOraniInput, '20');
    await user.type(adetInput, '2');

    // 3. Hesaplama sonuçlarının doğru görüntülenip görüntülenmediğini kontrol et
    // Hesaplama:
    // Satis (KDV Hariç) = 150 / 1.20 = 125
    // Birim Kar = 125 - 100 = 25
    // Birim Kar Oranı = (25 / 100) * 100 = 25%
    // Toplam Kar = 25 * 2 = 50

    // Not: .replace('.', ',') kullanıldığı için virgül ile kontrol ediyoruz.
    const birimKar = await screen.findByText('25,00 ₺');
    const birimKarOrani = await screen.findByText('25,00 %');
    const toplamKar = await screen.findByText('50,00 ₺');

    expect(birimKar).toBeInTheDocument();
    expect(birimKarOrani).toBeInTheDocument();
    expect(toplamKar).toBeInTheDocument();
  });
});
